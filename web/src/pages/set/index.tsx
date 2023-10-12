import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSets } from '../../hooks/useSets';
import { StudySet } from '../../types/StudySet';

import classes from "./index.module.css";

export const ListSetsPage: React.FC = () => {
    const sets = useSets()
    const navigation = useNavigate()

    return (
        <Group>
            <Suspense fallback={<h1>loading...</h1>}>
                {sets && sets.map((set: StudySet) => (
                    <Card 
                        shadow="sm" 
                        p="lg" 
                        radius="md" 
                        withBorder
                        component='a'
                        href='#'
                        onClick={(event) => {
                            event.preventDefault()
                            navigation(`/set/${set.id}`)
                        }}
                    >
                        <Stack>
                            <Group>
                                <Badge color="pink" variant="light">
                                    HISTORY
                                </Badge>
                            </Group>
                            <Group>
                                <Text className={classes.titleText} size={"xl"}>{set.name}</Text>
                            </Group>
                            <Group>
                                <Text className={classes.countText}><b>{set.flashcards}</b> flashcards</Text>
                            </Group>

                        </Stack>

                    </Card>
                ))}
            </Suspense>
        </Group>
    )
}
export default ListSetsPage;