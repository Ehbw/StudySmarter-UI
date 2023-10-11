import * as superagent from "superagent";
import { StudySet } from './StudySet.js';
import { Endpoints, LoginResponse, Studyset } from './types/index.js';
import reqHeaders, { MakeRequest, MakeAuthRequest } from "./data/HTTP.js";
import config from "../config.js";
import fetch from 'node-fetch';
import { StudySetRetval } from "./types/requests.js";

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
                reqHeaders.append("authorization", `Token ${this.token}`)
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
        console.log("password: ", config.auth.password)
        return await new Promise((resolve, rej) => {
            MakeAuthRequest("OPTIONS", Endpoints.AUTH)
            .then((res) => {
                if(res.status === 200){
                    console.log("Auth options fetched")
                }
                console.log(res)
                //superagent.agent().post("https://localhost:3000/")//.post("https://prod.studysmarter.de/api-token-auth/")

                MakeAuthRequest("POST", Endpoints.AUTH, {
                    username: config.auth.username,
                    password: config.auth.password,
                    platform: "webapp",
                    amplitude_device_id: "ZF5RzsoRxXE6vM_emHQVeS"
                }).then(async(data) => {
                    let resp = await data.json() as LoginResponse  
                    this.token = resp.token
                    this.language = resp.language
                    this.id = resp.id
                    this.isAuth = true
                    return resolve(true)
                })
                .catch((err) => {
                    console.log("unable to login")
                    console.error(err)
                    console.log(err.response.body)
                    return resolve(false)
                })
            })
        })
    }

    private async fetchSets(): Promise<StudySet[]> {
        return await new Promise((resolve, reject) => {
            if(!this.isAuth)
                return reject("Not authenticated")

            MakeRequest("GET", Endpoints.STUDYSETS)
            .then(async(res) => {
                let body = await res.json() as StudySetRetval
                if(res.status === 200){

                }

            })
            .catch((err) => {
                console.error(err)
            })


            this.http.get(Endpoints.STUDYSETS)
            .set("authorization", `Token ${this.token}`)
            .then((res: superagent.Response) => {
                if(res.statusCode === 200){
                    let sets: StudySet[] = []
                    let body: Studyset[] = res.body.results as Studyset[]
                    for (let i = 0; i < body.length; i++){
                        sets.push(new StudySet(body[i]))
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