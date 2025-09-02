import supabase, {supabaseAdmin} from "./supabase";

export async function addGroup({ group }) {
    console.log("group data for data:", group);

    try {
        const { data, error } = await supabase
        .from("Groups")
        .insert([
            {
                name: group.name,
                description: group.description,
                location: group.location,
                rules: group.rules,
                numberOfMem: group.numberOfMem,
                // avatar: group.avatar,
                ambassadorId: group.ambassadorId,
                status: group.status
            },
        ])
        .select();

        console.log("Group created:", data[0].id);
        const fileExt = group.avatar.split(".").pop();
        const fileName = `${data[0].id}/groupAvatar.${fileExt}`;

        let formData = new FormData();
        formData.append("file", {
            uri: group.avatar,
            name: fileName,
            type: `image/${fileExt}`,
        });

        const { error: uploadError } = await supabase.storage
            .from("group-avatars")
            .upload(fileName, formData, {
                contentType: `image/${fileExt}`,
                upsert: true,
            });
        
        if (uploadError) {
            throw new Error(uploadError.message);
        }

        const { data: urlData } = supabase.storage
            .from('group-avatars')
            .getPublicUrl(fileName);

        console.log("Public URL for group avatar:", urlData.publicUrl);

        const { data: groupWithAvatar, error: updateError } = await supabase
            .from("Groups")
            .update({ avatar: urlData.publicUrl })
            .eq("id", data[0].id)
            .select();

        // console.log("THE ERROR: ", updateError);
        if (updateError) {
            throw new Error(updateError.message);
        }
        console.log("Group created with avatar:", groupWithAvatar);
        return groupWithAvatar[0];
    } catch (error) {   
        console.error("Error creating group:", error);
        throw new Error(error.message);
    }

}

export async function getGroups() {
    console.log("running");
    const { data: groups, error: fetchError } = await supabase
        .from("Groups")
        .select("*")
        .order("created_at", { ascending: false });

    if (fetchError) {
        throw new Error(fetchError.message);
    }
    // console.log("data: ", groups);
    return groups;
}


export async function updateStatus({ id, status }) {
    console.log("Updating status for request ID:", id, "to", status);
    
    const { data } = await supabase.functions.invoke("update-group", { body: { id, status: "approved" } });

    if (error) {
        throw new Error(error.message);
    }
    console.log("Status updated:", data);
    return data;
}

export async function updateMemberCount({ id, count}) {
    const numberOfMem = count++;
    const { data, error } = await supabase.functions.invoke("update-group", { body: { id, numberOfMem } });
    if (error) {
        throw new Error(error.message);
    }
    return data;
}