
import { useUser } from './hooks/auth/useUser';
import { useMessageBroadcast } from './hooks/conversations/useMessageBroadcast';
import { useItemSubscription } from './hooks/items/useItemSubscription';

export function SubscriptionProvider({ children }) {
    const { user } = useUser();
    const groupId = user?.user?.user_metadata?.group;
    const userId = user?.user?.id;
    console.log("SubscriptionProvider: Group ID: ", user?.user?.app_metadata);
    useItemSubscription(groupId);
    useMessageBroadcast(userId);

    console.log("SubscriptionProvider: Group ID: ", groupId);
    console.log("SubscriptionProvider: User ID: ", userId);

    return children;
}