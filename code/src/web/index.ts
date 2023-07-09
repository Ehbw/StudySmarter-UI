import express from 'express'
import bodyParser from 'body-parser'
import StudySmarter from '../studysmarter/StudySmarter.js'
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import setRouter from './api/studysets.js';
import timelineRouter from './api/timeline.js';
const __dirname = dirname(fileURLToPath(import.meta.url))

export const study: StudySmarter = new StudySmarter(process.env.SS_EMAIL, process.env.SS_PASSWORD)

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/sets", setRouter)
app.use("/api/timeline", timelineRouter)

app.use(express.static(path.join(__dirname, "../../../web/dist")))
app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../../../web/dist/index.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})