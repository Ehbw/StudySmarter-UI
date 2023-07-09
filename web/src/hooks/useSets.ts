import { useState, useEffect } from "react";
import { fetcher } from "../main";
import { Set } from "../pages/set/View";
import { StudySet } from "../types/StudySet"

type Flashcard = {
    answer_html: {
        text: string,
        is_correct: boolean
    }[],
    creator_id: number,
    id: number,
    question_html: {
        text: string,
        is_correct: boolean
    }[],
    solution_html: string,
    studysets: number[],
    tags: number[]
}

export const useSets = (): StudySet[] | undefined => {
    const [setData, setSetData] = useState<StudySet[] | undefined>(undefined)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        if(!loaded){
            fetcher(`/api/sets`).then((data: StudySet[]) => {
                let newSetData: StudySet[] = []
                for(let i = 0; i < data.length; i++){
                    if(data[i]){
                        newSetData.push(data[i])
                    }
                }
                setSetData(newSetData)
                if(!loaded)
                    setLoaded(true)
            })
        }
    }, [])

    return setData
}

export const useSet = (id: string): {data: Set | undefined, refreshSet: () => void} => {
    const [setData, setSetData] = useState<Set | undefined>(undefined)

    const [refresh, setRefresh] = useState<boolean>(false)
    const [loaded, setLoaded] = useState<boolean>(false)

    const refreshSet = () => {
        setRefresh(true)
    }

    useEffect(() => {
        if(!loaded || refresh){
            fetcher(`/api/sets/${id}`).then((data: Set) => {
                setSetData(data)
                if(!loaded)
                    setLoaded(true)
                if(refresh)
                    setRefresh(false)
            })
        }
    }, [refresh])

    return {data: setData, refreshSet: refreshSet}
}