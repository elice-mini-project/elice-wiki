import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Box, Grid, Button } from "@mui/material";
import styled from "styled-components";
import WriteForm from "./WriteForm";
import * as Api from "../../../api";

function BoardAddForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.post("boards/board", {
                postId: "",
                title,
                body,
            });
            alert("게시글 등록을 성공하였습니다.");
            navigate(`/board`);
        } catch (error) {
            alert("게시글 등록에 실패하였습니다.", error);
        }
    };

    return (
        <Container maxWidth="md" style={{ marginTop: "80px" }}>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    marginTop: "70px",
                    textAlign: "center",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <WriteForm
                        title={title}
                        setTitle={setTitle}
                        body={body}
                        setBody={setBody}
                    />
                    <Grid>
                        <MyButton type="submit">등록</MyButton>
                        <MyButton2 onClick={() => navigate(`/board`)}>
                            취소
                        </MyButton2>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
}

const MyButton = styled(Button)`
    color: #82b3ed;
    font-weight: bold;
    size: 17px;
    border-radius: 5px;
    border: solid 1px #82b3ed;
    margin: 3px;

    &: hover {
        color: #ffffff;
        background-color: #0a82ff;
    }
`;

const MyButton2 = styled(Button)`
    color: #ff7878;
    font-weight: bold;
    size: 17px;
    border-radius: 5px;
    border: solid 1px #ff7878;
    margin: 3px;

    &: hover {
        color: #ffffff;
        background-color: #ff5a5a;
    }
`;

export default BoardAddForm;
