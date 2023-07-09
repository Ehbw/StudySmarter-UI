import { Router } from "express";

export type TimelineData = {
    id: number,
    name: string,
    startDate: number,
    endDate: number,
    data: {
        name: string,
        description: string,
        time: string,
    }[]
}

const mockData: TimelineData[] = [{
    id: 1340,
    name: "Test timeline",
    startDate: 1625,
    endDate: 1649,
    data: [
        {
            name: "Charles I becomes King",
            description: "description",
            time: "1625-3-24"
        },
        {
            name: "Charles I First parliament",
            description: "Known as the 'useless parliament'",
            time: "1625-6-18"
        },
        {
            name: "Charles I dissolved the 'useless parliament'",
            description: "",
            time: "1625-8-12"
        },
        {
            name: "U9F84RG3489YUGU39GU943U9G43U934GU934G9U9G34U9G43U934GU934GU9U9G34U9G43U9G439UG4U934GU934GU934GU9U93G4U9G34U9G34'",
            description: "",
            time: "1625-8-12"
        }
    ]
}]

const timelineRouter = Router()
timelineRouter.get("/", async(req, res) => {
    res.json(mockData)
})

timelineRouter.get("/:timelineID", async(req, res) => {
    const timelineID = Number.parseInt(req.params.timelineID)
    if(timelineID){
        let data = mockData.filter((timeline) => timeline.id == timelineID)
        if(data && data[0]){
            let timeline = data[0]
            return res.status(200).json(timeline)
        }
    }
})

export default timelineRouter;