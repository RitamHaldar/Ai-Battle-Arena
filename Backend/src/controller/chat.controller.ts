import graph from "../service/graph.js";
import { setModels } from "../service/graph.js";
export async function chatResponse(req: any, res: any) {
    const user = req.user.username;
    const { problem, modelnos, model1, model2, model3 } = req.body;
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (modelnos == 2) {
        setModels(modelnos, model1, model2, "")
    }
    else if (modelnos == 3) {
        setModels(modelnos, model1, model2, model3)
    }
    else {
        return res.status(400).json({ error: "Invalid model numbers" });
    }
    const result = await graph(problem);
    res.status(200).json({
        success: true,
        data: result
    })
}