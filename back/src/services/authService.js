import { authModel } from "../db/models/auth/auth";
import * as errorMessage from "../utils/errorMessages";

class authService {
    static async createQuestion(data) {
        const result = await authModel.create(data);
        if (!result) {
            throw new Error(errorMessage.addError("인증질문"));
        }
        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }

    static async getQuestion({ id }) {
        const result = await authModel.getQuestion({ id });
        if (!result) {
            throw new Error(errorMessage.findError("인증질문"));
        }
        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }

    static async updateQuestion(data) {
        const { id, fieldToUpdate } = data;
        const result = await authModel.findAndUpdate({ id, fieldToUpdate });
        if (!result) {
            throw new Error(errorMessage.addError("인증질문"));
        }
        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }

    static async deleteQuestion({ id }) {
        const result = await authModel.delete({ id });
        if (!result) {
            throw new Error(errorMessage.deleteError("인증질문"));
        }
        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }

    static async findAll({ page, perPage }) {
        const questions = await authModel.findAll({ page, perPage });
        if (questions.error) {
            throw new Error(result.error);
        }
        return questions;
    }
}

export { authService };

//createQuestion, getCurrentQuestion, updateQuestion, deleteQuestion, findAll
