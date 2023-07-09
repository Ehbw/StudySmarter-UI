import { Badge, Card, Group, Stack, Text, Menu, UnstyledButton, ScrollArea, createStyles, Center, Modal, MultiSelect, Button, Box, Select } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tag } from '../pages/set/View';
import { MarkdownText } from './MarkdownText';
import { useEffect, useState } from 'react';
import RichTextEditor from '@mantine/rte';
import axios, { AxiosResponse } from 'axios';

type FlashcardProps = {
    tagData: Tag[];
    tags: number[];
    setID: number;
    id: number;
    question: string;
    answer: string;
    setEditCard: React.Dispatch<React.SetStateAction<{
        id: number;
        question: string;
        answer: string;
        tags: number[];
    } | undefined>>
    setDeleteModal: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const TagColors = {
    0: {background: "rgba(250, 50, 115, .1)", subject: "#fa3273"},
    1: {background: "rgba(20, 120, 200, .1)", subject: "#1478c8"},
    2: {background: "rgba(0, 187, 153, .1)", subject: "#00bb99"},
    3: {background: "rgba(232, 73, 184, .1)", subject: "#e849b8"},
    4: {background: "rgba(0, 165, 170, .1)", subject: "#00a5aa"},
    5: {background: "rgba(228, 123, 1, .1)", subject: "#e47b01"}
}

const useStyle = createStyles((theme) => ({
    card: {
        height: "200px",
        width: "250px",
        shadow:"sm",
        p: "lg",
        radius:"md",

        [`@media (max-width: ${theme.breakpoints.xs }px)`]: {
            width: "95%"
        },
    }
}))

type CreateProps = {
    setID: number;
    sets: {
        id: number;
        colorid: number;
        name: string
    }[],
    tags: Tag[];
    refreshSet: () => void;
}

export const CreateFlashcard: React.FC<CreateProps> = (props) => {
    const {classes} = useStyle()
    const [select, setSelect] = useState<{label: string, value: string}[]>([])
    const [multiSelect, setMultiSelect] = useState<{label: string, value: string}[]>([])
    const [question, setQuestion] = useState<string>("")
    const [answer, setAnswer] = useState<string>("")
    const [tags, setTags] = useState<string[]>([])
    const [subset, setSubset] = useState<string | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        for(let i = 0; i < props.tags.length; i++){
            let tag = props.tags[i]
            setMultiSelect((tags) => [...tags, {label: tag.name, value: tag.id.toString()}])
        }
    }, [props.tags])

    useEffect(() => {
        for(let i = 0; i < props.sets.length; i++){
            let set = props.sets[i]
            setSelect((sets) => [...sets, {label: set.name, value: set.id.toString()}])
        }
    }, [props.sets])

    return (
        <>
            <Modal
                opened={isOpen}
                onClose={() => setIsOpen(false)}
                centered
                closeOnClickOutside
                closeOnEscape
                styles={{ title: { textAlign: 'center', width: '100%', fontSize: 18 } }}
                title="Create Flashcard"
                transition="fade"
                exitTransitionDuration={150}
            >
                <Stack>
                    <Box>
                        <Text sx={{ fontSize: 14, fontWeight: 500}}>Question</Text>
                        <RichTextEditor
                            title='Question'
                            id="question"
                            value={question}
                            onChange={setQuestion}
                            controls={[
                                ['bold', 'italic', 'underline'],
                                ['unorderedList'],
                                ['sup', 'sub'],
                                ['alignLeft', 'alignCenter', 'alignRight'],
                            ]}
                        />
                    </Box>

                    <Box>
                        <Text sx={{ fontSize: 14, fontWeight: 500}}>Answer</Text>
                        <RichTextEditor
                            title='Answer'
                            id="answer"
                            value={answer}
                            onChange={setAnswer}
                            controls={[
                                ['bold', 'italic', 'underline'],
                                ['unorderedList'],
                                ['sup', 'sub'],
                                ['alignLeft', 'alignCenter', 'alignRight'],
                            ]}
                        />
                    </Box>

                    <MultiSelect 
                        label="Tags"
                        value={tags}
                        onChange={setTags}
                        data={multiSelect}
                    />

                   <Select
                        label="Subset"
                        value={subset}
                        onChange={setSubset}
                        data={select}
                    />
                    <Group position="right" spacing={10}>
                        <Button 
                            uppercase
                            variant='default'
                            type="button"
                            onClick={() => {
                                setIsOpen(false)
                            }}
                            mr={3}
                        >
                            Cancel 
                        </Button> 
                        <Button uppercase variant="light" type="submit" onClick={() => {
                            axios.post(`/api/sets/${props.setID}/cards`, {
                                tags: tags.map(Number),
                                question: question,
                                answer: answer,
                                subsetID: subset ? Number.parseInt(subset) : null
                            }).then((val: AxiosResponse<any, any>) => {
                                if(val.status === 200){
                                    props.refreshSet()
                                    setIsOpen(false)
                                }
                            })
                        }}>
                            Confirm
                        </Button>
                    </Group>
                </Stack>

            </Modal>
            <Card 
                className={classes.card}
                withBorder
            >
                <UnstyledButton
                    component='a'
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "inline-grid"
                    }}
                    onClick={() => {
                        setIsOpen(true)
                    }}
                >
                    <Center>
                        <FontAwesomeIcon icon="plus" height="40px" width="40px" />
                    </Center>
                </UnstyledButton>
            </Card>
        </>

    )
}

export const Flashcard: React.FC<FlashcardProps> = (props) => {
    const {classes} = useStyle()
    return (
        <Card 
            className={classes.card}
            withBorder
        >
            <Stack>
                <Group position="apart">
                    <ScrollArea style={{width: "89%", height: "22px"}} scrollbarSize={2}>
                        <div style={{gap: 1, width: "max-content", overflowY: "hidden", height: "22px"}}>
                            <FlashcardBadges
                                tags={props.tagData}
                                flashTags={props.tags}
                            />
                        </div>
                    </ScrollArea>
                    <Menu>
                        <Menu.Target>
                            <UnstyledButton
                                component='a'
                                style={{
                                    width: "5px"
                                }}
                            >
                                <FontAwesomeIcon icon="ellipsis-vertical" width="8px" fixedWidth />
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Card</Menu.Label>
                            <Menu.Item icon={<FontAwesomeIcon icon={"cog"} fixedWidth />}
                                onClick={() => {
                                    props.setEditCard({
                                        id: props.id,
                                        question: props.question,
                                        answer: props.answer,
                                        tags: props.tags
                                    })
                                }}
                            >Edit</Menu.Item>
                            <Menu.Item icon={<FontAwesomeIcon icon={"graduation-cap"} />}
                                component="a"
                                href={`https://app.studysmarter.de/studysets/${props.setID}/flashcards/trainer/${props.id}`}
                            >Open in Studysmarter</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item color="red" icon={<FontAwesomeIcon icon="trash" fixedWidth />}
                                onClick={() => {
                                    props.setDeleteModal(props.id)
                                }}
                            >Delete</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Group position="apart">
                    <Text weight={600} size={15}><MarkdownText text={props.question}/></Text>
                </Group>
            </Stack>
        </Card>
    )
}


type BadgesProp =  {
    tags: Tag[]
    flashTags: number[]
}

export const FlashcardBadges: React.FC<BadgesProp> = ({tags, flashTags}) => {
    let displayTags: Tag[] = []
    for(let i = 0; i < tags.length; i++){
        let tag = tags[i]
        if(flashTags.includes(tag.id)){
            displayTags.push(tag)
        }
    }

    return (
        <>
            {displayTags && displayTags.map((tag) => (
                <Badge style={{
                    background: TagColors[tag.colour].background,
                    color: TagColors[tag.colour].subject
                }}
                >
                    {tag.name}
                </Badge>
            ))}
        </>
    )
}
