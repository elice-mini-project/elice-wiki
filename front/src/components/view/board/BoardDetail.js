import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Container } from "@mui/material/";
import BoardEditForm from "./BoardEditForm";
import BoardContents from "./BoardContents";
import Spinner from "../../Spinner";
import Comment from "../comment/Comment";
import * as Api from "../../../api";

function BoardDetail() {
  const params = useParams();
  const boardId = params.id;
  const [boardData, setBoardData] = useState(null);
  const [commentList, setCommentList] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const userState = useSelector((state) => (state ? state.userReducer.user : null));

  const fetchCommentList = async () => {
    try {
      const { data } = await Api.get("commentlist/board", boardId);
      setCommentList(data.payload);
    } catch (e) {
      console.log("댓글을 불러오는데 실패했습니다.", e);
    }
  };

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
    fetchCommentList();
  }, [params]);

  if (!isFetchCompleted) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            marginTop: "3%",
          }}
        >
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
              />
              <Comment boardId={boardId} commentList={commentList} />
            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default BoardDetail;
