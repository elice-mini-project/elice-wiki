import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/userAction";
import Spinner from "../Spinner";

const GoogleLoading = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = parsedHash.get("access_token");

    const googleLogin = async () => {
        try {
            const { data } = await Api.post("user/sign", { accessToken });
            const user = data.payload;
            const jwtToken = user.token;
            sessionStorage.setItem("userToken", jwtToken);
            dispatch(loginUser(user));
            navigate("/auth", { replace: true });
        } catch (e) {
            console.log("OAuth 에러", e);
        }
    };
    googleLogin();

    return <Spinner />;
};

export default GoogleLoading;
