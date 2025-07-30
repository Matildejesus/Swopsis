import { useItemSubscription } from './hooks/subscriptions/useItemSubscription';
import { useUser } from './hooks/auth/useUser';

export function SubscriptionProvider({ children }) {
    const { user } = useUser();
    const groupId = user?.user?.user_metadata?.group;
    
    useItemSubscription(groupId);

    return children;
}