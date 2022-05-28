import { useState } from "react";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";
import * as Api from "../../../api";

function SingleComment({ commentData }) {
    const [comment, setComment] = useState("");
    const [showReplyInput, setshowReplyInput] = useState(false);

    const onReplyClick = () => {
        setshowReplyInput(!showReplyInput);
    };

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await Api.post(`comments/recomment`, {
                target: commentData,
                content: comment,
            });
            // navigate(`/board/${boardId}`);
            setshowReplyInput(false);
            setComment("");
        } catch (error) {
            alert("댓글 생성에 실패하였습니다.");
            console.log(error);
        }
    };

    return (
        <>
            <CommentCard
                commentData={commentData}
                onReplyClick={onReplyClick}
                setshowReplyInput={setshowReplyInput}
            />

            {/* reply 버튼을 누르면 Input이 열림. */}
            {showReplyInput && (
                <form onSubmit={handlePost}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <CommentInput comment={comment} setComment={setComment} />
                    </div>
                </form>
            )}
        </>
    );
}

export default SingleComment;
