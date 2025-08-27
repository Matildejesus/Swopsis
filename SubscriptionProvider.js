
import { useUser } from './hooks/auth/useUser';
import { useConversations } from './hooks/conversations/useConversations';
import { useConversationSubscription } from './hooks/conversations/useConversationSubscription';
import { useMessageBroadcast } from './hooks/conversations/useMessageBroadcast';
import { useItemSubscription } from './hooks/items/useItemSubscription';

export function SubscriptionProvider({ children }) {
    const { user } = useUser();
    const groupId = user?.user?.user_metadata?.group;
    const userId = user?.user?.id;
    const { conversations } = useConversations();
    console.log("SubscriptionProvider: Group ID: ", user?.user?.app_metadata);
    useItemSubscription(groupId);
    useMessageBroadcast(userId);

    return (
        <>
        {conversations?.map((c) => (
            <ConversationSubscription key={c.id} id={c.id} />
        ))}
        {children}
        </>
    );

    console.log("SubscriptionProvider: Group ID: ", groupId);
    console.log("SubscriptionProvider: User ID: ", userId);

    return children;
}

// in your provider file (same file is fine)
function ConversationSubscription({ id }) {
    useConversationSubscription(id);
    return null; // nothing to render
}
