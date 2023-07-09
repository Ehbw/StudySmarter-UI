import { Endpoints, Flashcard, Studyset, Tag } from "./types/index.js";
import * as superagent from 'superagent';

export class StudySet {
    private _http: superagent.SuperAgentStatic & superagent.Request;
    private _token: string;
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
    
    constructor(http: superagent.SuperAgentStatic & superagent.Request, token: string, data: Studyset) {
        this._http = http
        this._token = token
        this._data = data
        this.GetTags().then((data:Tag[]) => this._tags = data) 
        this.GetSubset().then((data: Studyset[]) => this._subsets = data)
        setInterval(this.GetFlashCards.bind(this), 300000)
    }

    private async GetSubset(): Promise<Studyset[]> {
        return await new Promise((resolve, reject) => {
            this._http
            .get(`https://prod.studysmarter.de/studysets/${this._data.id}/subtopics/`)
            .set("authorization", `Token ${this._token}`)
            .then((res: superagent.Response) => {
                if(res.status === 200){
                    resolve(res.body as Studyset[])
                }
            })
            .catch((err: superagent.ResponseError) => {
                console.error(err)
            })
        })
    }

    private async GetTags(): Promise<Tag[]> {
        return await new Promise((resolve, reject) => {
            this._http.get(Endpoints.TAGS.replace("SETID", this._data.id.toString()))
            .set("authorization", `Token ${this._token}`)
            .then((res: superagent.Response) => {
                if(res.statusCode === 200 || res.body.all_parent_tags || res.body.studyset_tags){
                    return resolve(res.body.all_parent_tags as Tag[])
                }
                reject("Unable to fetch tags")
            })
            .catch((err: superagent.ResponseError) => {
                reject("Unable to fetch tags: " + (err.cause ?? err.message))
            })
        })
    }

    public async GetFlashCards(): Promise<Flashcard[]> {
        return await new Promise((resolve, reject) => {
            this._http.get(Endpoints.FLASHCARD_SEARCH.replace("SETID", this._data.id.toString()))
            .set("authorization", `Token ${this._token}`)
            .then((res: superagent.Response) => {
                if(res.statusCode === 200 || res.body.results){
                    return resolve(res.body.results as Flashcard[])
                }
                reject("Unable to retrive flashcards")
            })
            .catch((err: superagent.ResponseError) => {
                reject("Unable to retrive flashcards: " + (err.cause ?? err.message))
            })
        })
    }

    public async CreateFlashCard(question: string, answer: string, tags: number[], subsetID?: number): Promise<boolean> {
        return await new Promise((resolve, reject) => {
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

            this._http
            .post(`https://prod.studysmarter.de/studysets/${setID}/flashcards/`)
            .set("authorization", `Token ${this._token}`)
            .set("origin", "https://app.studysmarter.de")
            .set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36")
            .set("accept", "application/json, text/plain, */*")
            .set("accept-encoding", "gzip, deflate, br")
            .set("accept-language", "en-GB,en;q=0.8")
            .send({
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
            .then((res: superagent.Response) => {
                if(res.status === 200 || (res.body && res.body.id)){
                    return resolve(true)
                }
                resolve(false)
            })
            .catch((err: superagent.ResponseError) => {
                console.log(err)
                resolve(false)
            })
        })
    }

    public async DeleteFlashCard(id: number): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            this._http
            .delete(`https://prod.studysmarter.de/studysets/${this.data.id}/flashcards/${id}/`)
            .set("authorization", `Token ${this._token}`)
            .set("origin", "https://app.studysmarter.de")
            .set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36")
            .set("accept", "application/json, text/plain, */*")
            .set("accept-encoding", "gzip, deflate, br")
            .set("accept-language", "en-GB,en;q=0.8")
            .send({
                id: id
            })
            .then((res: superagent.Response) => {
                console.log(res.body)
                resolve(true)
            })
            .catch((err: superagent.ResponseError) => {
                console.log(err)
                resolve(false)
            })
        })
    }

    public async EditFlashCard(id: number, question: string, answer: string, tags: number[]): Promise<boolean> {
        return await new Promise((resolve, reject) => {
            this._http
            .patch(`https://prod.studysmarter.de/studysets/${this.data.id}/flashcards/${id}/`)
            .set("authorization", `Token ${this._token}`)
            .set("origin", "https://app.studysmarter.de")
            .set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36")
            .set("accept", "application/json, text/plain, */*")
            .set("accept-encoding", "gzip, deflate, br")
            .set("accept-language", "en-GB,en;q=0.8")
            .send({
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
            .then((res: superagent.Response) => {
                if(res.statusCode === 200){
                    return resolve(true)
                }
                resolve(false)
            })
        })
    }
}