import React from "react";
import { Typography, Input, Button } from "@mui/material";
import * as Api from "../../api";
import { loginUser } from "../../store/actions/userAction";
import { useDispatch } from "react-redux";

const MyInfo = ({ user }) => {
  const dispatch = useDispatch();
  const [stashName, setStashName] = React.useState(null);
  const [name, setName] = React.useState(user.name);
  const [isWriting, setIsWriting] = React.useState(false);
  const onClickHandler = () => {
    setStashName(name);
    setIsWriting(!isWriting);
  };
  const save = React.useCallback(async () => {
    const { data } = await Api.put("user/current", { name });
    const user = data.payload;
    dispatch(loginUser(user));
    setIsWriting(!isWriting);
  });
  const onChangeHandler = (e) => {
    setName(e.target.value);
  };
  const keyUpHandler = (e) => {
    if (e.key === "Enter") {
      save();
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "Bold" }}>이름</Typography>
        {isWriting ? (
          <Input
            label="이름"
            onChange={onChangeHandler}
            value={name}
            onKeyUp={keyUpHandler}
            sx={{ height: "1.24rem", width: "8.5rem" }}
          />
        ) : (
          <Typography sx={{ width: "8.5rem" }}>{name}</Typography>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "Bold" }}>기수</Typography>
        <Typography sx={{ width: "8.5rem" }}>엘리스 AI 트랙 {user.track}기</Typography>
      </div>
      {!isWriting && (
        <Button variant="text" onClick={onClickHandler}>
          수정
        </Button>
      )}
      {isWriting && (
        <div>
          <Button
            variant="text"
            sx={{ color: "black" }}
            onClick={() => {
              setName(stashName);
              setIsWriting(false);
            }}
          >
            취소
          </Button>
          <Button
            variant="text"
            onClick={() => {
              save();
            }}
          >
            저장
          </Button>
        </div>
      )}
    </>
  );
};

export default MyInfo;
