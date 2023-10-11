import { StudySet } from './StudySet.js';
import { Endpoints, LoginResponse, Studyset } from './types/index.js';
import reqHeaders, { MakeRequest, MakeAuthRequest } from "./data/HTTP.js";
import config from "../config.js";
import fetch from 'node-fetch';
import { StudySetRetval } from "./types/requests.js";

export class StudySmarter {
    private isAuth: boolean = false;

    private token: string = "";
    private id: number = 0;
    private language: string = "";

    private _studySets: StudySet[] = [];

    get sets(): StudySet[] {
        return this._studySets
    }

    constructor() {
        this.login().then(() => {
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

    public async login(): Promise<boolean> {
        console.log("password: ", config.auth.password)
        return await new Promise((resolve, rej) => {
            MakeAuthRequest("OPTIONS", Endpoints.AUTH)
            .then((res) => {
                if(res.status !== 200){
                    console.log("Unable to get auth options")
                    return resolve(false)
                }

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
            .catch((err) => {
                console.log("unable to retrive auth options")
                console.error(err)
                return resolve(false)
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
                    let sets: StudySet[] = []
                    for (let i = 0; i < body.results.length; i++){
                        sets.push(new StudySet(body.results[i]))
                    }
                    return resolve(sets)
                }
            })
            .catch((err) => {
                console.error(err)
            })
        })
    }
}
export default StudySmarter;