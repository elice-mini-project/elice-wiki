import { goalService } from "../services/goalService";

class goalController {
    static async insert(req, res, next) {
        const { title, core_goal, goal1, goal2, goal3, week } = req.body;
        const insert = await goalService.insertData({
            title,
            core_goal,
            goal1,
            goal2,
            goal3,
            week,
        });
        if (insert.message) {
            res.status(400).json(insert.message);
        } else {
            res.status(200).json(insert.payload);
        }
    }

    static async findAllGoal(req, res, next) {
        const goals = await goalService.findAll();
        if (goals.message) {
            res.status(400).json(goals.message);
        } else {
            res.status(200).json(goals);
        }
    }

    static async findGoalByWeek(req, res, next) {
        try {
            const week = Number(req.params.week);
            const goal = await goalService.findGoalByWeek({ week });
            res.status(200).json({ status: "success", payload: goal });
        } catch (error) {
            next(error);
        }
    }
}

export { goalController };
