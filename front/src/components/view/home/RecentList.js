import React from "react";
import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";
// import * as Api from "../../../api";

// const posts = Api.get("posts").then((res) => res.data.payload ?? null);
const posts = [
  {
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    tag: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    lastmod_user: "KIM HYUNSEO",
    week: "1",
  },
  {
    title: "엘리스 수업 출석 인정 잘 받는 Tip!",
    tag: "안녕하세요, 모두 수업은 잘 듣고 계시나요? ??????????????????/",
    lastmod_user: "KIM HYUNSEO",
    week: "1",
  },
];

const Title = styled(Typography)({
  fontSize: 16,
  margin: "-6px 0 0 0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

const Tag = styled(Typography)({
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
    <>
      {posts ? (
        posts.map((post) => (
          <Card sx={{ width: 240, mb: 1.2 }} key={Math.random()}>
            <CardContent>
              <Title>{post.title}</Title>
              <Tag color="text.secondary">{post.tag}</Tag>
              <Author color="text.secondary">{post.lastmod_user}</Author>
              <CreatedAt color="text.secondary">
                {`${post.week}${
                  post.week.slice(-1) === "1"
                    ? "st"
                    : post.week.slice(-1) === "2"
                    ? "nd"
                    : post.week.slice(-1) === "3"
                    ? "rd"
                    : "th"
                } week`}
              </CreatedAt>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>최근 게시물이 없습니다.</Typography>
      )}
    </>
  );
}

export default RecentList;
