import { Group, Modal, Stack, Text, Button } from '@mantine/core';
import React from 'react';


type ConfirmationProps = {
    isOpen: boolean;
    data: any;
    onClose: () => void;
    onConfirm: (data: any) => void;
}


export const ConfirmationModal: React.FC<ConfirmationProps> = (props) => {
    return (
        <Modal
            opened={props.isOpen}
            onClose={props.onClose}
            centered
            closeOnClickOutside
            closeOnEscape
            styles={{ title: { textAlign: 'center', width: '100%', fontSize: 18 } }}
            title="Delete Confirmation"
            transition="fade"
            exitTransitionDuration={150}
        >
            <Stack>
                <Text>Are you sure you want to delete this flashcard?</Text>
                <Group position='right' spacing={10}>
                    <Button
                        uppercase
                        variant="light"
                        type="button"
                        onClick={() => {
                            props.onClose()
                        }}
                        mr={3}
                    >
                        Cancel
                    </Button>
                    <Button
                        uppercase
                        color="red"
                        variant="filled"
                        type="button"
                        onClick={() => {
                            props.onConfirm(props.data)
                            props.onClose()
                        }}
                    >  
                        Confirm
                    </Button>
                </Group>
            </Stack>

        </Modal>
    )
}