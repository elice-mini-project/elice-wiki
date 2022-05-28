import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import WriteForm from "./WriteForm";
import * as Api from "../../../api";

function ContentEditForm({ boardData, setBoardData, setIsEditing, boardId }) {
  const [title, setTitle] = useState(boardData.title);
  const [body, setBody] = useState(boardData.body);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`boards/${boardId}`, {
        title,
        body,
      });
      alert("게시글을 수정하였습니다.");
      setBoardData((prevState) => {
        return { ...prevState, title, body };
      });
      setIsEditing(false);
    } catch (error) {
      alert("게시글 수정을 실패하였습니다.");
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <form onSubmit={handleEdit}>
        <WriteForm title={title} setTitle={setTitle} body={body} setBody={setBody} />
        <Grid
          sx={{
            textAlign: "center",
          }}
        >
          <Button type="submit">수정 완료</Button>
          <Button color="error" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Grid>
      </form>
    </Box>
  );
}

export default ContentEditForm;
