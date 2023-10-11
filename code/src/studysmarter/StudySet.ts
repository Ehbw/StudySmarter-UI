import { Endpoints, Flashcard, Studyset, Tag } from "./types/index.js";
import { MakeRequest } from "./data/HTTP.js";
import { CreateFlashCardRetval, FlashcardRetval, SubsetRetval, TagRetval } from "./types/requests.js";

export class StudySet {
    private _data: Studyset;
    private _tags: Tag[] = [];
    private _subsets: Studyset[] = [];

    get data(): Studyset {
        return this._data
    }

    get tags(): Tag[] {
        return this._tags
    }

    get subsets(): Studyset[] {
        return this._subsets
    }
    
    constructor( data: Studyset) {
        this._data = data
        this.GetTags().then((data:Tag[]) => this._tags = data)//.catch((err) => console.log(err))
        this.GetSubset().then((data: Studyset[]) => this._subsets = data).catch((err) => console.log(err))
        setInterval(this.GetFlashCards.bind(this), 300000)
    }

    private async GetSubset(): Promise<Studyset[]> {
        return await new Promise((resolve, reject) => {
            MakeRequest("GET", Endpoints.SUBSETS.replace("SETID", this._data.id.toString()))
            .then(async (res) => {
                let body = await res.json() as SubsetRetval
                if(res.status == 200)
                    resolve(body)
            })
            .catch((err) => reject(`Unable to login: ${err.message}`))
        })
    }

    private async GetTags(): Promise<Tag[]> {
        return await new Promise((resolve, reject) => {
            MakeRequest("GET", Endpoints.TAGS.replace("SETID", this._data.id.toString()))
            .then(async(res) => {
                let body = await res.json() as TagRetval
                if(res.status === 200 || body.all_parent_tags || body.studyset_tags)
                    return resolve(body.all_parent_tags)
                reject("Unable to fetch tags")
            })
            .catch((err) => reject(`Unable to fetch tags: ${err.message}`))
        })
    }

    public async GetFlashCards(): Promise<Flashcard[]> {
        return await new Promise((resolve, reject) => {
            MakeRequest("GET", Endpoints.FLASHCARD_SEARCH.replace("SETID", this._data.id.toString()))
            .then(async(res) => {
                console.log(res)
                let body = await res.json() as FlashcardRetval
                if(res.status === 200 || body.results)
                    return resolve(body.results)
                reject("Unable to retrive flashcards")
            })
            .catch((err) => reject(`Unable to retrive flashcards: ${err.message}`))
        })
    }

    public async CreateFlashCard(question: string, answer: string, tags: number[], subsetID?: number): Promise<boolean> {
        return await new Promise((resolve) => {
            let setID = this._data.id
            if(subsetID){
                let subsets = this._subsets.filter((subset) => subset.id == subsetID)
                console.log(subsets)
                if(subsets && subsets[0]){
                    setID = subsets[0].id
                }else{
                    console.log("Invalid SET")
                    return resolve(false)
                }
            }

            MakeRequest("POST", `${Endpoints.FLASHCARDS.replace("SETID", setID.toString())}`, {
                answer_html: [{
                    is_correct: true,
                    text: answer
                }],
                question_html: [{
                    is_correct: true,
                    text: question
                }],
                hint_html: [],
                flashcard_image_ids: [],
                shared: 1,
                solution_html: "",
                tags: tags
            })
            .then(async (res) => {
                let body = await res.json() as CreateFlashCardRetval
                return resolve(body.id != undefined)
            })
            .catch((err) => {
                console.log(err)
                resolve(false)
            })
        })
    }

    public async DeleteFlashCard(id: number): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            MakeRequest("DELETE", `${Endpoints.FLASHCARD.replace("SETID", this._data.id.toString())}`, {
                id: id
            })
            .then((res) => {
                console.log(res.body)
                resolve(true)
            })
            .catch((err) => {
                console.log(err)
                resolve(false)
            })
        })
    }

    public async EditFlashCard(id: number, question: string, answer: string, tags: number[]): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            MakeRequest("PATCH", Endpoints.FLASHCARD
            .replace("SETID", this._data.id.toString())
            .replace("CARDID", id.toString()), {
                question_html: [{
                    text: question,
                    is_correct: true
                }],
                answer_html: [{
                    text: answer,
                    is_correct: true
                }],
                tags: tags,
                hint_html: [],
                flashcard_image_ids: [],
                shared: 2,
                solution_html: ""
            })
            .then((res) => {
                return resolve(res.status === 200)
            })
            .catch((err) => {
                console.log(err)
                return resolve(false)   
            })
        })
    }
}