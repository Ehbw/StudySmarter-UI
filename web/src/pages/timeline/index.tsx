import { Box, Card, Group, Stack, Text } from "@mantine/core";
import React from "react";
import useFetch from 'react-fetch-hook'
import { useNavigate } from "react-router-dom";

export type TimelineEntry = {
    name: string;
    description: string;
    time: string;
}

export type TimelineData = {
    id: number,
    name: string,
    startDate: number,
    endDate: number,
    data: TimelineEntry[]
}


export function useTimelineID(id: number): {isLoading: boolean, error: useFetch.UseFetchError | undefined, data?: TimelineData}{
    const {isLoading, error, data} = useFetch(id ? `/api/timeline/${id}` : "/api/timeline")
    let newData = data ? data as TimelineData : undefined
    return {isLoading, error, data: newData}
}

export function useTimeline(): {isLoading: boolean, error: useFetch.UseFetchError | undefined, data?: TimelineData[]} {
    const {isLoading, error, data} = useFetch("/api/timeline")
    let newData = data ? data as TimelineData[] : undefined
    return {isLoading, error, data: newData}
}
export const TimelinePage: React.FC = () => {
    const { isLoading, error, data } = useTimeline()
    const navigation = useNavigate()
    
    return (
        <Box>
            <Text sx={{ fontSize: 14, fontWeight: 500}}>Existing Timelines</Text>
            <Group spacing={8}>
                {data && data.map((val) => (
                    <Card
                        shadow="sm" 
                        p="lg" 
                        radius="md" 
                        withBorder
                        component='a'
                        href={`/timeline/${val.id}`}
                        onClick={(event) => {
                            event.preventDefault()
                            navigation(`/timeline/${val.id}`)
                        }}
                    >
                        <Stack>
                            <Text size={18} mb={0} sx={{fontWeight: 600}}>{val.name}</Text>
                            <Text size={12}>{val.startDate}-{val.endDate}</Text>
                        </Stack>
                    </Card>
                ))}
            </Group>
        </Box>
    )
}