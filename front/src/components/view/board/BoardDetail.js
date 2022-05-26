import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Box, Container, CssBaseline, Divider } from "@mui/material/";
import BoardEditForm from "./BoardEditForm";
import BoardContents from "./BoardContents";
import Spinner from "../../Spinner";
// import Comments from "../comment/Comments";
import * as Api from "../../../api";

function BoardDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const boardId = params.id;
    const [boardData, setBoardData] = useState(undefined);
    const [isEditable, setIsEditable] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const userState = useSelector((state) =>
        state ? state.userReducer.user : undefined
    );

    const fetchDetailInfo = async () => {
        try {
            const { data } = await Api.get("boards", boardId);
            if (data.payload?.userId === userState?.__id) {
                setIsEditable(true);
            } else {
                setIsEditable(false);
            }
            setBoardData(data.payload);
            setIsFetchCompleted(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDetailInfo();
    }, [params]);

    if (!isFetchCompleted) {
        return <Spinner />;
    }

    const handleDelete = async () => {
        try {
            await Api.delete("boards", boardId);
            navigate("/board");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        marginTop: "60px",
                    }}
                >
                    <Divider />
                    {isEditing ? (
                        <BoardEditForm
                            setIsEditing={setIsEditing}
                            boardId={boardId}
                            boardData={boardData}
                            setBoardData={setBoardData}
                        />
                    ) : (
                        <>
                            <BoardContents
                                boardData={boardData}
                                setIsEditing={setIsEditing}
                                isEditable={isEditable}
                                handleDelete={handleDelete}
                            />
                            {/* <Comments
                            comments={contents.comment}
                            contentId={contentId}
                            /> */}
                        </>
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default BoardDetail;
