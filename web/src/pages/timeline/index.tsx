import { Box, Card, Group, Stack, Text } from "@mantine/core";
import React from "react";
import useFetch from 'react-fetch-hook'
import { useNavigate } from "react-router-dom";

import classes from './index.module.css';

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
            <Text className={classes.title}>Existing Timelines</Text>
            <Group className={classes.group}>
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
                            <Text className={classes.timelineName}>{val.name}</Text>
                            <Text className={classes.timelinePeriod}>{val.startDate}-{val.endDate}</Text>
                        </Stack>
                    </Card>
                ))}
            </Group>
        </Box>
    )
}