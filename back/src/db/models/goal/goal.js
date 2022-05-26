import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

class goalModel {
    static async insert({ newGoal }) {
        // 주차별 목표를 입력
        const insert = await models.Goal.create(newGoal);
        return insert;
    }

    static async findAllGoal() {
        // 전체 주차별 목표를 반환합니다.
        const goals = await models.Goal.findAll({});
        return goals;
    }

    static async findByWeek({ week }) {
        const goal = await models.Goal.findOne({ where: { week } });
        let goalList = [];
        goalList.push(goal.goal1);
        goalList.push(goal.goal2);
        goalList.push(goal.goal3);

        const outGoal = {
            id: goal.id,
            week: goal.week,
            goalList,
            title: goal.title,
            core_goal: goal.core_goal,
        };
        return outGoal;
    }
}

export { goalModel };
