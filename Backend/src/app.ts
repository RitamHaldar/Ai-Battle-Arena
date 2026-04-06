import express from "express"
import graph from "./service/graph.js"
const app = express()

app.use(express.json())

app.post("/", async (req, res) => {
    const { problem } = req.body;
    const result = await graph(problem);
    res.json(result);
})

export default app