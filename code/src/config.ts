type Config = {
    endpoint: string,
    allowedStudysets: number[],
    auth: {
        endpoint: string;
        username: string;
        password: string;
    }
}

declare var process : {
    env: {
      SS_DOMAIN: string;
      SS_AUTH_DOMAIN: string;
      SS_EMAIL: string;
      SS_PASSWORD: string;
      SS_ALLOWEDSETS: string;
    }
}

console.log(process.env.SS_AUTH_DOMAIN)

export default {
    endpoint: process.env.SS_DOMAIN,
    allowedStudysets: (process.env.SS_ALLOWEDSETS || "").split(",").map((val) => Number.parseInt(val)),
    auth: {
        endpoint: process.env.SS_AUTH_DOMAIN,
        username: process.env.SS_EMAIL,
        password: process.env.SS_PASSWORD
    }
} as Config