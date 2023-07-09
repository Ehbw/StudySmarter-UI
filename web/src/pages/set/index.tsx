import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSets } from '../../hooks/useSets';
import { StudySet } from '../../types/StudySet';

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
                            <Group position='apart'>
                                <Badge color="pink" variant="light">
                                    HISTORY
                                </Badge>
                            </Group>
                            <Group position="apart">
                                <Text weight={600} size={20}>{set.name}</Text>
                            </Group>
                            <Group position="apart">
                                <Text size={12}><b>{set.flashcards}</b> flashcards</Text>
                            </Group>

                        </Stack>

                    </Card>
                ))}
            </Suspense>
        </Group>
    )
}
export default ListSetsPage;