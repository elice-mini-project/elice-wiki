import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
    // request 헤더로부터 authorization bearer 토큰을 받음.
    const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
    // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열임.
    // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
    if (userToken === "null") {
        console.log("서비스 사용 요청이 있지만 Authorization 토큰이 없습니다.");
        throw new Error("로그인한 유저만 사용할 수 있는 서비스입니다.");
    }

    // 해당 token 이 정상적인 token인지 확인 -> 토큰에 담긴 user_id 정보 추출
    try {
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        if (!secretKey) {
            throw new Error("env파일을 확인해 주세요.");
        }
        const jwtDecoded = jwt.verify(userToken, secretKey);
        console.log(jwtDecoded);
        req.currentUser = jwtDecoded;
        next();
    } catch (error) {
        throw new Error("정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.");
    }
}

export { loginRequired };
