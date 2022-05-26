import { userModel } from "../db/models/user/user";

async function adminRequired(req, res, next) {
    const { userId } = req.currentUser;
    const user = await userModel.findById({ userId });

    if (user.admin === 2) {
        console.log("admin2error");
        throw new Error("권한이 없는 유저입니다.");
    }
    next();
}

export { adminRequired };
