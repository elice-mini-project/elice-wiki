import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class authModel {
    static async create(data) {
        try {
            const createdQuestion = await models.Auth.create(data);
            return createdQuestion;
        } catch (err) {
            return { error: err };
        }
    }

    static async delete({ id }) {
        try {
            const result = await models.Auth.destroy({ where: { id: id } });
            return result;
        } catch (err) {
            return { error: err };
        }
    }

    static async findAndUpdate({ id, fieldToUpdate }) {
        if (fieldToUpdate.current) {
            await models.Auth.update({ current: false }, { where: { current: true } });
        }
        try {
            await models.Auth.update(fieldToUpdate, { where: { id: id } });
            const result = await models.Auth.findOne({ where: { id: id } });
            return result;
        } catch (err) {
            return { error: err };
        }
    }

    static async getQuestion({ id }) {
        if (!id) {
            try {
                const result = await models.Auth.findOne({
                    where: { current: true },
                });
                return result;
            } catch (err) {
                return { error: err };
            }
        }
        try {
            const result = await models.Auth.findOne({
                where: { id: id },
            });
            return result;
        } catch (err) {
            return { error: err };
        }
    }

    static async findAll({ page, perPage }) {
        if (parseInt(page) >= 1 && parseInt(perPage) >= 1) {
            const pageNum = parseInt(page);
            const prPage = parseInt(perPage);
            const offset = prPage * (pageNum - 1);
            try {
                const result = await models.Auth.findAndCountAll({ limit: prPage, offset: offset });
                return result;
            } catch (err) {
                return { error: err };
            }
        } else {
            try {
                const result = await models.Auth.findAll();
                return result;
            } catch (err) {
                return { error: err };
            }
        }
    }
}

export { authModel };
