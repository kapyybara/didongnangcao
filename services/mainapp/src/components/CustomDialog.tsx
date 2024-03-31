import { useState } from "react";
import { Button, Dialog, Text } from "react-native-paper"

export type CustomDialogType  = {
    title: string , 
    message : string
}

export const CustomDialog = (data: CustomDialogType) => {
    const [visible, setVisible] = useState(false)

    const hideDialog = () => setVisible(false);
    return <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>{data.title}</Dialog.Title>
        <Dialog.Content>
            <Text variant="bodyMedium">{data.message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
    </Dialog>
}