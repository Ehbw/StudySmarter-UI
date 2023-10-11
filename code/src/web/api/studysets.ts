import { Request, Response, Router } from "express";
import { StudySet } from "../../studysmarter/StudySet.js";
import { Studyset } from "../../studysmarter/types/index.js";
import { study } from "../index.js";
import { body, validationResult } from 'express-validator';

const setRouter = Router()
setRouter.get("/", async(req, res) => {
    let data: any[] = []
    for(let i = 0; i < study.sets.length; i++){
        let set: Studyset = study.sets[i].data
        data.push({
            name: set.name,
            id: set.id,
            subject: set.subject,
            flashcards: set.flashcard_count,
            documents: set.summary_count,
            subsets: set.subtopic_count
        })
    }
    res.json(data)
});

setRouter.get("/:setID", async(req, res) => {
    let sets = study.sets.filter((val) => val.data.id == Number.parseInt(req.params.setID))
    if(sets.length > 0){
        const set: StudySet = sets[0]

        let flashcards = await set.GetFlashCards()
        let strippedSubsets = [];

        set.subsets.forEach(set => {
            strippedSubsets.push({
                id: set.id,
                colorid: set.colorId,
                name: set.name
            })
        })

        let strippedFlashCards: any[] = [];
        flashcards.forEach(card => {
            strippedFlashCards.push({
                id: card.id,
                creator_id: card.creator,
                answer_html: card.answer_html,
                tags: card.tags,
                studysets: card.studysets,
                solution_html: card.solution_html,
                question_html: card.question_html
            })
        });

        return res.json({
            name: set.data.name,
            id: set.data.id,
            tags: set.tags,
            subsets: set.subsets,
            flashcards: strippedFlashCards
        })
    }

    return res.status(200).json({
        error: true,
        reason: "Set does not exist"
    })
})

setRouter.patch("/:setID/cards", 
body("question").exists(),
body("answer").exists(),
body("id").exists(),
body("hint").optional(),
body("explanation").optional(),
body("tags").exists(),
async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })

    let body = req.body as {
        question: string,
        answer: string,
        id: number,
        hint?: string,
        explanation?: string,
        tags: number[]
    }

    let sets = study.sets.filter((val) => val.data.id == Number.parseInt(req.params.setID))
    if (sets && sets[0]){
        let set = sets[0]
        if(await set.EditFlashCard(body.id, body.question, body.answer, body.tags)){
            return res.status(200).json({
                success: true,
                id: body.id,
                question: body.question,
                answer: body.answer,
                tags: body.tags
            })
        }
    }
    res.status(400).json({
        success: false
    })
})

setRouter.post('/:setID/cards',
body("tags").exists().isArray(),
body("question").exists(),
body("answer").exists(),
async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    let body = req.body as {
        tags: number[];
        question: string;
        answer: string;
        subsetID?: number
    }

    let sets = study.sets.filter((val) => val.data.id == Number.parseInt(req.params.setID))
    if(sets && sets[0]){
        let set = sets[0]
        if(await set.CreateFlashCard(body.question, body.answer, body.tags, body.subsetID)){
            return res.status(200).json({
                success: true,
            })
        }
    }
    return res.status(400).json({
        success: false,
    })
})

setRouter.delete('/:setID/cards',
body("id").exists(),
async(req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    
    let body = req.body as {
        id: number;
    }
    let sets = study.sets.filter((val) => val.data.id == Number.parseInt(req.params.setID))

    if(sets && sets[0]){
        let set = sets[0]
        if(await set.DeleteFlashCard(body.id)){
            return res.status(200).json({
                success: true,
            })
        }
    }
    return res.status(400).json({
        success: false,
    })
})


export default setRouter