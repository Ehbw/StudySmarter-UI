import { Card, Center, Divider, Group, Text, Timeline } from "@mantine/core"
import { useParams } from "react-router-dom"
import { TimelineEntry, useTimelineID } from "."

function sortTimeline(a: TimelineEntry, b: TimelineEntry){
    const aDate = new Date(a.time)
    const bDate = new Date(b.time)

    if(Math.abs(aDate.getTime()) > Math.abs(bDate.getTime())){
        //return 1
        return -1
    }
    if(Math.abs(bDate.getTime()) > Math.abs(aDate.getTime())){
        return 1
        //return -1
    }
    return 0
}

export const TimelineViewPage: React.FC = () => {
    const params = useParams()    
    if(!params.timelineID){
        return (
            <h1>Invalid timeline ID</h1>
        )
    }
    const { isLoading, error, data } = useTimelineID(Number.parseInt(params.timelineID))

    return (
        <Center>
            <Timeline>
                {(!isLoading && (data && data.data)) && data.data.sort(sortTimeline).map((entry, index) => (
                    <Timeline.Item key={index}>
                        <Card>
                            <Group gap="apart">
                                <div style={{width: "90%"}}>
                                    <Text mb={0} truncate>{entry.name}</Text>
                                </div>
                                <Text mb={0}>{entry.time}</Text>
                            </Group>
                            {entry.description.length !== 0 && (<Divider />)}
                            <Text mb={0}>{entry.description}</Text>
                        </Card>
                    </Timeline.Item>
                ))}
            </Timeline>
        </Center>

    )
}