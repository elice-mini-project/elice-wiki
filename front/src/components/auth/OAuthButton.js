import GoogleIcon from "@mui/icons-material/Google";
import styles from "../view/Intro/Intro.module.css";

export const handleGoogleLogin = () => {
    const protocol = window.location.protocol;
    const hostName = window.location.hostname;
    const port = window.location.port;
    let url = protocol + "//" + hostName + (port ? ":" + port : "") + "/test";
    window.location.href =
        "https://accounts.google.com/o/oauth2/auth?client_id=590638047439-2icndg9hnuf95mf4aajgua6ghijbchrt.apps.googleusercontent.com&redirect_uri=" +
        url +
        "&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
};

function OAuthButton() {
    return (
        <>
            <div className={styles["primaryBtn"]} onClick={handleGoogleLogin}>
                <GoogleIcon sx={{ marginRight: "5px" }} /> 구글로 로그인하기
            </div>
        </>
    );
}

export default OAuthButton;
