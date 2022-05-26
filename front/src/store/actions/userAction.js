import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";

export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user: user,
    };
};

export const logoutUser = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    return {
        type: LOGOUT_USER,
        payload: null,
    };
};
