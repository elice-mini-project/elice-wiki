import { authService } from "../services/authService";

class authController {
    static async newQuestion(req, res, next) {
        try {
            const { question, answer, url, source } = req.body;
            const data = {
                question,
                answer,
                url,
                source,
                current: false,
            };
            const createdQuestion = await authService.createQuestion(data);
            res.status(200).json({ status: "success", payload: createdQuestion });
        } catch (error) {
            next(error);
        }
    }

    static async getQuestion(req, res, next) {
        const { id } = req.params;
        try {
            const payload = await authService.getQuestion({ id });
            const result = { status: "success", payload };
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async updateQuestion(req, res, next) {
        const { id } = req.params;
        try {
            const result = await authService.updateQuestion({ id, fieldToUpdate: req.body });
            const body = { status: "success", payload: result };
            res.status(200).json(body);
        } catch (error) {
            next(error);
        }
    }

    static async deleteQuestion(req, res, next) {
        const questionIdList = req.params.id.split(",");
        const deleteResult = { success: 0, failed: 0 };
        Promise.all(
            questionIdList.map(async (id) => {
                try {
                    const result = await authService.deleteQuestion({ id });
                    if (result === 0) {
                        deleteResult.failed += 1;
                    } else {
                        deleteResult.success += 1;
                    }
                } catch (error) {
                    next(error);
                }
            })
        ).then(() => {
            const body = {
                status: "success",
                payload: { ...deleteResult },
            };
            res.status(200).json(body);
        });
    }

    static async getQuestions(req, res, next) {
        const { page, perPage } = req.query;
        try {
            const questions = await authService.findAll({ page, perPage });
            res.status(200).json({ status: "success", payload: questions });
        } catch (error) {
            next(error);
        }
    }
}
export { authController };
