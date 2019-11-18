import express from "express"
import { httpSSRHandler } from "./handler"
import cookiesMiddleware from 'universal-cookie-express'

const port = 5000
console.log(`Starting SSR on port ${port}...`)
const app = express()
app.use(cookiesMiddleware()).get("/*", httpSSRHandler)

app.listen(port)

console.log("Successfully started")
