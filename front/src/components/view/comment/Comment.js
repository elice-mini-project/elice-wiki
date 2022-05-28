import { Card, CardHeader } from "@mui/material";
import SingleComment from "./SingleComment";
import CommentAddForm from "./CommentAddForm";
import ReplyComment from "./ReplyComment";

function Comments({ boardId, commentList }) {
    return (
        <>
            <Card sx={{ width: "100%" }}>
                <CardHeader title="댓글" />
                <CommentAddForm boardId={boardId} />
                {commentList?.map(
                    (commentData) =>
                        !commentData.parentId && (
                            <>
                                <SingleComment
                                    key={commentData.commentId}
                                    commentData={commentData}
                                />
                                <ReplyComment commentData={commentData} commentList={commentList} />
                            </>
                        ),
                )}
            </Card>
        </>
    );
}

export default Comments;
