import { userModel } from "../db/models/user/user";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userService {
    static async findOrCreate({ data }) {
        const email = data.email;
        const name = data.name;

        let user = await userModel.findByEmail({ email });

        if (!user) {
            const __id = uuidv4();
            const admin = 2;
            const authorized = false;
            const track = null;

            const newUser = { __id, name, email, track, admin, authorized };
            const signedUser = await userModel.create({ newUser });

            user = signedUser;
        }

        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({ userId: user.__id }, secretKey);
        const { __id, admin, authorized, track } = user;

        const loginUser = {
            token,
            __id,
            email,
            name,
            track,
            admin,
            authorized,
        };

        return loginUser;
    }

    static async findAll() {
        const users = await userModel.findAll();
        return users;
    }

    static async findUser({ userId }) {
        const users = await userModel.findById({ userId });
        return users;
    }

    static async updateUser({ userId, fieldToUpdate }) {
        const user = await userModel.findAndUpdate({ userId, fieldToUpdate });

        return user;
    }

    static async deleteUser({ userId }) {
        const result = await userModel.delete({ userId });
        return result;
    }
}

export { userService };
