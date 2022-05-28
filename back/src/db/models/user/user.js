import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class userModel {
    static async findOrCreate({ email }) {
        try {
            const user = await models.Users.findOrCreate({
                where: { email: email },
                defaults: {
                    authorized: false,
                    admin: 2,
                    track: 4,
                },
            });
            return user;
        } catch (err) {
            return { error: err };
        }
    }

    static async findById({ userId }) {
        try {
            const user = await models.Users.findOne({ where: { __id: userId } });
            return user;
        } catch (err) {
            return { error: err };
        }
    }

    static async findAndUpdate({ email, userId, fieldToUpdate }) {
        console.log(userId, email, fieldToUpdate);
        if (userId) {
            try {
                await models.Users.update(fieldToUpdate, { where: { __id: userId } });
                const user = await models.Users.findOne({ where: { __id: userId } });
                return user;
            } catch (err) {
                return { error: err };
            }
        }
        try {
            await models.Users.update(fieldToUpdate, { where: { email: email } });
            const user = await models.Users.findOne({ where: { email: email } });
            return user;
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
                const user = await models.Users.findAndCountAll({
                    limit: prPage,
                    offset: offset,
                    where: {
                        admin: {
                            [Op.ne]: 0,
                        },
                    },
                });
                return user;
            } catch (err) {
                return { error: err };
            }
        } else {
            try {
                const user = await models.Users.findAll();
                return user;
            } catch (err) {
                return { error: err };
            }
        }
    }

    static async delete({ userId }) {
        try {
            const result = await models.Users.destroy({ where: { __id: userId } });
            return result;
        } catch (err) {
            return { error: err };
        }
    }
}

export { userModel };
