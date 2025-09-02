import supabase from "./supabase";

export async function findUserByEmail(email) {
    
    const { data, error } = await supabase.functions.invoke("list-users");
    if (error) throw error;

    const user = data.users.find((u) => u.email === email);

    return user;
}

export async function findUserById(id) {
    try {
        const { data, error } = await supabase.functions.invoke("get-user-by-id", {
        body: { id: id.id },
        });

        if (error) throw error;

        return data?.user || null;
    } catch (err) {
        console.error("findUserById Error:", err);
        return null;
    }
}


export async function getAllUsers() {
    
    const { data, error } = await supabase.functions.invoke("list-users");

    if (error) {
        console.error("Error fetching user:", error);
    }
    const filteredUsers = data.users.filter(user => !user.user_metadata?.is_super_admin);

    return filteredUsers;
}

export async function getGroupMembers({ groupId}) {
    console.log("yes");
    const { data, error } = await supabase.functions.invoke("list-users");
    console.log(data.users[0].user_metadata.group);
    const membersList = data.users.filter(
        (u) => u.user_metadata.group === groupId,
    );
    console.log(membersList);
    return membersList;
}

export async function getFilteredGroupMember({ groupId }) {

    const { data, error } = await supabase.functions.invoke("list-users");
    console.log("all members: ", data);
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

    const { data, error } = await supabase.functions.invoke("get-user-by-id", {
        body: { id, groupId, ambassador },
    });

    if (error) {
        console.error("Error updating user metadata:", error);
        throw error;
    }

    return data;
}

export async function updateUserCoin({ id, coins }) {
    try {

        const { data, error } = await supabase.functions.invoke("get-user-by-id", {
            body: { id, coins: Number(coins) },
        });

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

    const { data, error } = await supabase.functions.invoke("get-user-by-id", {
        body: { id, coins: newCoins, totalWeight, totalCarbon, totalLitres, itemsSwapped },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getAllItems(members, itemConversions) { 
    try {
        const { data, error } = await supabase.functions.invoke("get-all-items");

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
