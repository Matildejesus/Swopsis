
import { useUser } from './hooks/auth/useUser';
import { useItemSubscription } from './hooks/items/useItemSubscription';

export function SubscriptionProvider({ children }) {
    const { user } = useUser();
    const groupId = user?.user?.user_metadata?.group;
    
    useItemSubscription(groupId);
    console.log("SubscriptionProvider: Group ID: ", groupId);

    return children;
}