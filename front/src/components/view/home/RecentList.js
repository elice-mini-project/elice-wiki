import React from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";
// import Api from "../../../api";

// const posts = Api.get("");
const posts = [
  {
    _id: "1",
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    description: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    author: "KIM HYUNSEO",
    createdAt: "2051-03-25T00:00:00",
  },
  {
    _id: "2",
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    description: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    author: "KIM HYUNSEO",
    createdAt: "2051-03-25T00:00:00",
  },
];

const Title = styled(Typography)({
  fontSize: 16,
  margin: "-6px 0 0 0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const Description = styled(Typography)({
  fontSize: 12,
  fontWeight: 400,
  margin: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  marginBottom: 2,
});

const Author = styled(Typography)({
  fontSize: 10,
  fontWeight: 400,
  color: "gray",
  float: "left",
  margin: 0,
});

const CreatedAt = styled(Typography)({
  fontSize: 11,
  fontWeight: 400,
  color: "gray",
  float: "right",
  margin: 0,
});

function RecentList() {
  return (
    <div style={{ marginTop: "5%" }}>
      {posts.map((post) => (
        <Card sx={{ width: 240, m: 1.2 }} key={post._id}>
          <CardContent>
            <Title>{post.title}</Title>
            <Description color="text.secondary">{post.description}</Description>
            <Author color="text.secondary">{post.author}</Author>
            <CreatedAt color="text.secondary">{post.createdAt.split("T")[0]}</CreatedAt>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default RecentList;
