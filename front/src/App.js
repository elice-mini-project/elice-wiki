import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Api from "./api";
import { useDispatch } from "react-redux";
import { loginUser } from "./store/actions/userAction";
import { useSelector } from "react-redux";
import Home from "./components/view/home/Home";
import EliceUserAuth from "./components/auth/EliceUserAuth";
import GoogleLoading from "./components/auth/GoogleLoading";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Admin from "./components/admin/Admin";
import ManagePosts from "./components/admin/ManagePosts";
import ManageUsers from "./components/admin/ManageUsers";
import ManageQuestions from "./components/admin/ManageQuestions";
import QuestionEditor from "./components/admin/QuestionEditor";

const theme = createTheme({
    palette: {
        primary: {
            main: "#7353EA",
            // darker: "#322468",
        },
    },
});


function App() {
    const dispatch = useDispatch();
    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );

    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            const { data } = await Api.get("user/current");
            const currentUser = data.payload;
            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch(loginUser(currentUser));

            console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
        } catch {
            console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
        }
        setIsFetchCompleted(true);
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return <div>로딩중...</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    {!userState?.authorized && (
                        <Route path="/auth" exact element={<EliceUserAuth />} />
                    )}
                    <Route path="/test" exact element={<GoogleLoading />} />
                    <Route path="*" element={<Home />} />
                    <Route path="/admin" element={<Admin />}>
                        <Route path="posts" element={<ManagePosts />} />
                        <Route path="users" element={<ManageUsers />} />
                        <Route path="questions" element={<ManageQuestions />} />
                    </Route>
                    <Route path="editquestion/:id" element={<QuestionEditor />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
