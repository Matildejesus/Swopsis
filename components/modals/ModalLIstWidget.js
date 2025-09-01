import { Modal, Portal, Text } from 'react-native-paper';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import Colors from '../../constants/colors';
import ModalOptions from './ModalOptions';
import ModalButton from './ModalButton';
import { useMemo, useState } from 'react';
import InputField from '../authentication/InputField';
import { useMembers } from '../../hooks/useMembers';
import MainButton from '../MainButton';
import { useUser } from '../../hooks/auth/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { unblockUser } from '../../services/apiBlocked';

function ModalListWidget({ visible, onRequestClose, blocked }) {
    const { members } = useMembers();
    const queryClient = useQueryClient();
    const { user } = useUser();
    const meId = user?.user?.id;


    const blockedMembers = useMemo(() => {
        if (!Array.isArray(blocked) || blocked.length === 0) return [];
        const set = new Set(blocked);
        return (members || []).filter(m => set.has(m.userId));
    }, [blocked, members]);

    const handleUnblock = async (blockedUserId) => {
        if (!meId) return;
        await unblockUser({ user1: meId, user2: blockedUserId }); 
        queryClient.setQueryData(['blockedState'], (prev) => {
            if (!prev) return prev;
            return {
                ...prev,
                blockedIds: (prev.blockedIds || []).filter(id => id !== blockedUserId),
            };
        });
    };

    return (
        <Portal>
            <Modal 
                visible={visible} 
                onDismiss={onRequestClose} 
                contentContainerStyle={styles.container}
            >
                <View style={styles.innerContainer}>
                    {blocked.length === 0 ? (
                        <View>
                            <Text>No Blocked Users</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={blockedMembers}
                            keyExtractor={(item) => item.userId}
                            renderItem={({item}) => (
                                <View style={styles.itemContainer}>
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: item.avatar }} style={styles.imageContainer}/>
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>{item.userName}</Text>
                                    </View>
                                    <MainButton 
                                        title="Unblock"
                                        onPress={() => handleUnblock(item.userId)} 
                                        variant="secondary"
                                    /> 

                                </View>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.sep} />}
                            contentContainerStyle={{ paddingVertical: 8 }}
                            style={{ alignSelf: 'stretch' }}
                        />
                    )}
                    <ModalButton title="CLOSE" onPress={onRequestClose} />
           
                </View>
            </Modal>
        </Portal>
    );
}
export default ModalListWidget;

const styles = StyleSheet.create({
    container: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    innerContainer: { 
        backgroundColor: 'white', 
        width: 350, 
        height: 400,
        borderRadius: 20, 
        padding: 20, 
        alignItems: 'center' 
    },
    title: { 
        color: Colors.primary2, 
        fontFamily: 'Raleway_700Bold', 
        fontSize: 18, 
        marginBottom: 10 
    },
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 10,
        borderColor: Colors.primary1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        shadowColor: "#000",
        // Android shadow
        elevation: 3,
    },
    name: {
        fontFamily: "Raleway_700Bold",
        fontSize: 15,
        color: Colors.primary1,
        // alignSelf: "center"
    },
    imageContainer: {
        backgroundColor: Colors.primary1,
        width: 60,
        height: 60, 
        borderRadius: 30,
        marginRight: 21,
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",   
        justifyContent: "center",
    }
});
