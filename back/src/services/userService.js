import { userModel } from "../db/models/user/user";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import * as errorMessage from "../utils/errorMessages";

class userService {
    static async findOrCreate({ data }) {
        const email = data.email;
        const name = data.name;
        const profile_img = data.picture;

        const result = await userModel.findOrCreate({ email });
        if (result.error) {
            throw new Error(result.error);
        }
        const [user, isNewUser] = result;
        let signedUser = {};

        if (isNewUser) {
            const __id = uuidv4();
            const fieldToUpdate = { __id, name, profile_img };
            signedUser = await userModel.findAndUpdate({ email, fieldToUpdate });
            if (signedUser.error) {
                throw new Error(signedUser.error);
            }
            signedUser = signedUser.dataValues;
        } else {
            signedUser = { ...user.dataValues };
        }

        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";

        if (secretKey) {
            const token = jwt.sign({ userId: signedUser.__id }, secretKey);
            const loginUser = {
                token,
                ...signedUser,
            };
            return loginUser;
        } else {
            throw new Error("CHECK .ENV!!");
        }
    }

    static async findAll({ page, perPage }) {
        const users = await userModel.findAll({ page, perPage });
        if (users.error) {
            throw new Error(users.error);
        }
        return users;
    }

    static async findUser({ userId }) {
        const user = await userModel.findById({ userId });
        if (!user) {
            throw new Error(errorMessage.findError("유저"));
        }
        if (user.error) {
            throw new Error(user.error);
        }
        return user;
    }

    static async updateUser({ userId, fieldToUpdate }) {
        const user = await userModel.findAndUpdate({ userId, fieldToUpdate });
        if (!user) {
            throw new Error(errorMessage.findError("유저"));
        }
        if (user.error) {
            throw new Error(user.error);
        }
        return user;
    }

    static async deleteUser({ userId }) {
        const result = await userModel.delete({ userId });
        if (result.error) {
            throw new Error(result.error);
        }
        return result;
    }
}

export { userService };
