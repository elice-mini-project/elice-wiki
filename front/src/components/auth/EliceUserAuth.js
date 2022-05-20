import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import styled from "styled-components";
import DOMPurify from "dompurify";
import * as Api from "../../api";

const EliceUserAuth = () => {
    const [answer, setAnswer] = useState(undefined);
    const [authData, setAuthData] = useState(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAuthData = async () => {
        try {
            const { data } = await Api.get("auth");
            setAuthData(data.payload);
        } catch (error) {
            console.log("데이터를 불러오는데 실패햐였습니다.", error);
        }
    };

    useEffect(() => {
        getAuthData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await Api.post("user/auth", {
                answer,
            });
            const result = data.status;
            if (result === "fail") {
                alert(data.payload);
            } else {
                dispatch(loginUser(data.payload));
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.log("인증에 실패햐였습니다.", error);
        }
    };

    return (
        <Container>
            <img src={authData?.url} alt="거북이" style={{ width: "40%" }} />
            <Title>
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(authData?.source),
                    }}
                />
            </Title>
            <SubTitle>
                * 띄어쓰기를 지켜서 작성해야 올바르게 적용됩니다.
            </SubTitle>

            <form
                onSubmit={handleSubmit}
                style={{ width: "30%", display: "flex", flexDirection: "row" }}
            >
                <TextField
                    variant="outlined"
                    size="small"
                    sx={{ width: "90%", minHeight: "50%" }}
                    placeholder="정답을 적어주세요."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <Button variant="contained" type="submit">
                    제출
                </Button>
            </form>
        </Container>
    );
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    text-align: center;
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 25px;
`;

const SubTitle = styled.div`
    margin-bottom: 10px;
    color: gray;
`;

export default EliceUserAuth;
