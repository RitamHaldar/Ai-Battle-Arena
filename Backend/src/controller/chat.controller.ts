import graph from "../service/graph.js";

export async function chatResponse(req: any, res: any) {
    const user = req.user.username;
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const { problem } = req.body;
    const result = await graph(problem);
    res.status(200).json({
        success: true,
        data: result
    })
}