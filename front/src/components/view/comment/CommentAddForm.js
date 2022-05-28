import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommentInput from "./CommentInput";
import { Button } from "@mui/material";
import * as Api from "../../../api";

function CommentAddForm({ boardId }) {
    const navigate = useNavigate();
    const [comment, setComment] = useState("");

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await Api.post(`comments/comment`, {
                boardId,
                content: comment,
            });
            navigate(`/board/${boardId}`);
            setComment("");
        } catch (error) {
            alert("댓글 생성에 실패하였습니다.");
            console.log(error);
        }
    };
    return (
        <form onSubmit={handlePost}>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <CommentInput comment={comment} setComment={setComment} />
            </div>
        </form>
    );
}

export default CommentAddForm;
