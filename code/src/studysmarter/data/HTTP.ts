import { Request, SuperAgentRequest } from "superagent";
import { Endpoints } from "../types/index.js";
import config from "../../config.js";
import fetch, {Headers} from 'node-fetch';

type HTTPRequests = "GET" | "HEAD" | "POST" | "OPTIONS" | "PUT" | "PATCH" | "DELETE" | "CONNECT" | "TRACE";

const http = require('http');
const https = require('https');

const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });
const agent = (_parsedURL: URL) => _parsedURL.protocol == 'http:' ? httpAgent : httpsAgent;

const headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en;q=0.5",
    "content-type": "application/json",
    "sec-ch-ua": "\"Brave\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "Referer": `${config.auth.endpoint}/`,
    "Origin": config.endpoint,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome"
}

const reqHeaders = new Headers(headers)


export async function MakeRequest(type: HTTPRequests, endpoint: Endpoints | string, data?: any) {
    console.log(`Making ${type} request to ${config.endpoint}${endpoint}`)

    return fetch(`${config.endpoint}${endpoint}`, {
        headers: reqHeaders,
        body: JSON.stringify(data),
        method: type,
        agent
    })
    
    /*return http[(type.toLowerCase() as keyof http)](`${config.endpoint}${endpoint}`)
    .set("origin", config.endpoint)
    .set("referer", config.endpoint)
    .set("accept", "application/json, text/plain, * /*")
    .set("accept-encoding", "gzip, deflate, br")
    .set("accept-language", "en-GB,en;q=0.8")
    .set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36")*/
}

//Requires origin and refer to be auth endpoint
export function MakeAuthRequest(type: HTTPRequests, endpoint: Endpoints | string, data?: any) {
    console.log(`Making auth ${type} request to ${config.endpoint}${endpoint}`)
    const copyHeaders = new Headers(reqHeaders)
    copyHeaders.set("origin", config.auth.endpoint)
    copyHeaders.set("referer", `${config.auth.endpoint}/`)
    return fetch(`${config.endpoint}${endpoint}`, {
        headers: reqHeaders,
        body: JSON.stringify(data),
        method: type,
        agent
    })
}


export default reqHeaders;