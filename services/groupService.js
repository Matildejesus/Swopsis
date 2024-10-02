import supabase from './supabase';  // Ensure you have a supabase client setup already

export const createGroup = async (groupDetails, userId) => {
  const { data, error } = await supabase
    .from('Groups')
    .insert([{
      name: groupDetails.name,
      description: groupDetails.description,
      rules: groupDetails.rules,
      num_of_members: 1,
      location: groupDetails.location,
      owner: userId
    }]);
  return { data, error };
};