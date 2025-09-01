import supabase, { supabaseAdmin } from "./supabase";

function buildDeletionMailto(email) {
    const subject = "Delete my account";
    const body =
        `Please delete my Swopsis account.\n` +
        `Registered email: ${email}\n` +
        `Reason (optional): _____\n` +
        `Ambassador account? Yes\n` +
        `If Ambassador: proposed new ambassador email: _____`;
    return `mailto:swopsisters@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


/** Walk a bucket under a prefix (e.g. `${uid}/`) and collect all file paths */
async function listAllFilePaths(bucket, prefix) {
  const limit = 1000;
  const stack = [prefix];
  const files = [];

  while (stack.length) {
    const folder = stack.pop();
    let offset = 0;

    // page through the current folder
    // (Supabase treats "folders" virtually; metadata === null ⇒ folder)
    // See: data[].name, data[].metadata
    for (;;) {
      const { data, error } = await supabase
        .storage
        .from(bucket)
        .list(folder, { limit, offset, sortBy: { column: "name", order: "asc" } });

      if (error) {
        // missing prefix is fine — nothing to delete
        if ((error.message || "").toLowerCase().includes("not found")) break;
        console.warn(`[list] ${bucket}/${folder}: ${error.message}`);
        break;
      }

      if (!data || data.length === 0) break;

      for (const entry of data) {
        const path = folder ? `${folder}/${entry.name}` : entry.name;
        const isFolder = entry.metadata == null; // folders have null metadata
        if (isFolder) {
          stack.push(path);
        } else {
          files.push(path);
        }
      }

      if (data.length < limit) break; // no more pages
      offset += limit;
    }
  }

  return files;
}

/**
 * Deletes everything for the current user:
 * 1) Storage: remove all files under `${uid}/` in 'avatars' and 'item-images'
 * 2) Auth: delete user (triggers ON DELETE CASCADE in your tables)
 * 3) Local: sign out
 */
export async function deleteMyAccount() {
  // who’s logged in?
  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw new Error(`Auth check failed: ${userErr.message}`);
  const uid = userRes?.user?.id;
  if (!uid) throw new Error("No authenticated user.");

  // 1) storage cleanup (best-effort)
  const buckets = ["avatars", "item-images"];

  for (const bucket of buckets) {
    try {
      const paths = await listAllFilePaths(bucket, uid);
      if (paths.length) {
        // remove in chunks of 1000 to be safe
        const chunkSize = 1000;
        for (let i = 0; i < paths.length; i += chunkSize) {
          const slice = paths.slice(i, i + chunkSize);
          const { error: delErr } = await supabase.storage.from(bucket).remove(slice);
          if (delErr) console.warn(`[remove] ${bucket}: ${delErr.message}`);
        }
      }
    } catch (e) {
      console.warn(`[storage] ${bucket} cleanup warning: ${e?.message || e}`);
    }
  }

  // 2) delete the auth user ⇒ cascades DB rows
  const { error: adminErr } = await supabaseAdmin.auth.admin.deleteUser(uid);
  if (adminErr) throw new Error(`Delete user failed: ${adminErr.message}`);

  console.log("DELETED USER");
}
