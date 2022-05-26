import { goalModel } from "../db/models/goal/goal";
import { findError } from "../utils/errorMessages";

class goalService {
    static async insertData({ title, core_goal, goal1, goal2, goal3, week }) {
        // insert가 필요한가??
        // 데이터 입력
        const newGoal = {
            title,
            core_goal,
            goal1,
            goal2,
            goal3,
            week,
        };
        const insert = await goalModel.insert({ newGoal });
        return insert;
    }

    static async findAll() {
        // findall도 필요한가??
        const goals = await goalModel.findAllGoal();
        return goals;
    }

    static async findGoalByWeek({ week }) {
        const goal = await goalModel.findByWeek({ week });
        if (!goal) {
            throw new Error(findError("goal"));
        }
        return goal;
    }
}

export { goalService };
