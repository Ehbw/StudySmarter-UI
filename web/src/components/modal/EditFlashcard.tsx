import { Button, Group, Modal, MultiSelect, Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';
//import { RichTextEditor } from '@mantine/rte';
import { Tag } from '../../pages/set/View';

type EditModalProps = {
    id: number;
    question: string;
    answer: string;
    currentTags: number[];
    tags: Tag[];
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (question: string, answer: string, tags: string[]) => void;
}

export const EditModal: React.FC<EditModalProps> = (props) => {
    const [selectData, setSelectData] = useState<{label: string, value: string}[]>([])
    const [newQuestion, setNewQuestion] = useState<string>(props.question)
    const [newAnswer, setNewAnswer] = useState<string>(props.answer)
    const [tags, setTags] = useState<string[]>([...props.currentTags.map(String)])

    useEffect(() => {
        for(let i = 0; i < props.tags.length; i++){
            let tag = props.tags[i]
            setSelectData((tags) => [...tags, {label: tag.name, value: tag.id.toString()}])
        }
    
    }, [props.tags])
    
    /*return (
        <Modal
            opened={props.isOpen}
            onClose={props.onClose}
            centered
            closeOnEscape
            closeOnClickOutside
            styles={{ title: { textAlign: 'center', width: '100%', fontSize: 18 } }}
            size="xl"
            title="Editing Flashcard"
            transition="fade"
            exitTransitionDuration={150}
        >
            <Stack>
                <RichTextEditor
                    title='Question'
                    id="question"
                    value={newQuestion}
                    onChange={setNewQuestion}
                    controls={[
                        ['bold', 'italic', 'underline'],
                        ['unorderedList'],
                        ['sup', 'sub'],
                        ['alignLeft', 'alignCenter', 'alignRight'],
                    ]}
                />

                <RichTextEditor
                    title='Answer'
                    id="answer"
                    value={newAnswer}
                    onChange={setNewAnswer}
                    controls={[
                        ['bold', 'italic', 'underline'],
                        ['unorderedList'],
                        ['sup', 'sub'],
                        ['alignLeft', 'alignCenter', 'alignRight'],
                    ]}
                />

                <MultiSelect 
                    label="Tags"
                    value={tags}
                    onChange={setTags}
                    data={selectData}
                />

                <Group position="right" spacing={10}>
                    <Button 
                        uppercase
                        variant='default'
                        type="button"
                        onClick={() => {props.onClose()}}
                        mr={3}
                    >
                        Cancel 
                    </Button> 
                    <Button uppercase variant="light" type="submit" onClick={() => {
                        props.onSubmit(newQuestion, newAnswer, tags)
                        props.onClose()
                    }}>
                        Confirm
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )*/
    return (
        <h1>test</h1>
    )
}