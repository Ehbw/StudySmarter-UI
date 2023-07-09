import * as superagent from "superagent";
import { StudySet } from './StudySet.js';
import { Endpoints, LoginResponse, Studyset } from './types/index.js';

export class StudySmarter {
    private http: superagent.SuperAgentStatic & superagent.Request = superagent.agent()

    private isAuth: boolean = false;

    private token: string = "";
    private id: number = 0;
    private language: string = "";

    private _studySets: StudySet[] = [];

    get sets(): StudySet[] {
        return this._studySets
    }

    constructor(email: string, password: string) {
        this.login(email, password).then(() => {
            if(this.isAuth){
                this.Refresh().then(() => {
                    setInterval(this.Refresh.bind(this), 300000)
                })
            }
        })
    }

    private async Refresh(){
        this._studySets = await this.fetchSets(); 
    }

    public async login(email: string, password: string): Promise<boolean> {
        return await new Promise((resolve, rej) => {
            this.http.post(Endpoints.AUTH)
            .send({
                username: email,
                password: password,
                platform: "web" 
            })
            .then((res: superagent.Response) => {
                if(res.body.errors || res.body.error_codes){
                    console.error("Error while logging in:", res.body.errors)
                    return resolve(false)
                }
    
                let body = res.body as LoginResponse
                this.token = body.token
                this.language = body.language
                this.id = body.id
                this.isAuth = true

                return resolve(true)
            })
            .catch((err: superagent.ResponseError) => {
                console.error(err)
                return resolve(false)
            })
        })
    }

    private async fetchSets(): Promise<StudySet[]> {
        return await new Promise((resolve, reject) => {
            if(!this.isAuth)
                return reject("Not authenticated")
            this.http.get(Endpoints.STUDYSETS)
            .set("authorization", `Token ${this.token}`)
            .then((res: superagent.Response) => {
                if(res.statusCode === 200){
                    let sets: StudySet[] = []
                    let body: Studyset[] = res.body.results as Studyset[]
                    for (let i = 0; i < body.length; i++){
                        sets.push(new StudySet(this.http, this.token, body[i]))
                    }
                    return resolve(sets)
                }
            })
            .catch((err: superagent.ResponseError) => {
                console.error(err)
            })
        })
    }
}
export default StudySmarter;