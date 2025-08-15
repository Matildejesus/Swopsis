import supabase, { supabaseAdmin } from "./supabase";

export async function findUserByEmail(email) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    const user = data.users.find((u) => u.email === email);

    return user;
}

export async function findUserById(id) {
    try {
        const { data, error } = await supabaseAdmin.auth.admin.getUserById(
            id.id,
        );
        console.log("Fetching user with ID:", id);
        console.log("Response Data:", data);
        console.log("Error:", error);

        if (error) {
            throw new Error(error.message);
        }

        return data?.user || null;
    } catch (err) {
        console.error("findUserById Error:", err);
        return null;
    }
}

export async function findUserByIdforInbox( id ) {
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(
        id.id,
    );

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getAllUsers() {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
        console.error("Error fetching user:", error);
    }
    const filteredUsers = data.users.filter(user => !user.user_metadata?.is_super_admin);

    // console.log("FILTERED USERS: ", filteredUsers);
    return filteredUsers;
}

export async function getGroupMembers({ groupId}) {
    console.log("yes");
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    console.log(data.users[0].user_metadata.group);
    const membersList = data.users.filter(
        (u) => u.user_metadata.group === groupId,
    );
    console.log(membersList);
    return membersList;
}

export async function getFilteredGroupMember({ groupId }) {

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
        console.error("Error retrieving members", error);
        throw error;
    }

    const membersList = data.users
        .map((u) => ({
            userId: u.id,
            userName: u.user_metadata?.userName ?? null, 
            avatar: u.user_metadata?.avatar ?? null,
            email: u.email ?? null,
            groupId: u.user_metadata?.group ?? null
        }))
        .filter((u) => u.groupId === groupId); 

    // console.log("Filtered Members:", membersList);
    return membersList;
}

export async function updateUserMetadata({ id, groupId, ambassador }) {
    console.log(id, groupId, ambassador);
    const user_metadata = ambassador
        ? { group: groupId, ambassador }
        : { group: groupId };

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
        user_metadata,
    });

    console.log("Data: ", data);
    if (error) {
        console.error("Error updating user metadata:", error);
        throw error; // Propagate the error
    }

    return data;
}

export async function updateUserCoin({ id, coins }) {
    try {
        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
            id,
            { 
                user_metadata: { coins: Number(coins) } 
            }
        );

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateUserImpactData({
    id, newCoins, totalLitres, totalCarbon, totalWeight, itemsSwapped }) {
    let user_metadata = {};
    user_metadata = {
        coins: newCoins,
        totalWeight,
        totalLitres,
        totalCarbon,
        itemsSwapped,
    };

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
        user_metadata,
    });
    if (error) throw new Error(error.message);

    return data;
}

export async function getAllItems(members, itemConversions) { 
    try {
        const { data, error } = await supabaseAdmin
            .from("Items")
            .select(`
                id, created_at, userId, category, image, title, description, method, available, tradeCount, unavailableDates,
                Shoes!itemId (*),
                Clothing!itemId (*),
                Accessories!itemId (*)`)
            .order("created_at", { ascending: false });

        if (error) throw new Error(error.message);

        const transformedData = data.map(item => {
            const itemOwner = members.find(member => member.id === item.userId);
            
            const extraInfo =
                item.category === 'Shoes' ? item.Shoes[0] :
                item.category === 'Clothing' ? item.Clothing[0] :
                item.category === 'Accessories' ? item.Accessories[0] :
                null;

            const conversion = itemConversions?.find(c => c.name === extraInfo?.subcategory);
            // const weight = parseFloat(extraInfo?.weight || 0);
            const litres = conversion?.litres;
            let carbon;

            if (conversion?.scalable) {
                carbon = conversion?.carbon * extraInfo?.weight;
            } else {
                carbon = conversion?.carbon;
            }
            // const carbon = conversion?.scalable ? conversion.carbon * weight : conversion?.carbon || 0;

            return {
                ...item,
                userName: itemOwner?.user_metadata?.userName || '',
                avatar: itemOwner?.user_metadata?.avatar || '',
                email: itemOwner?.user_metadata?.email || '',
                extraInfo,
                users: undefined,
                carbon,
                litres
            };
        });

        return transformedData;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
}


export async function getGroupRequests() {
    
}