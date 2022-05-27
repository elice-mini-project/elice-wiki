import React from "react";
import MyInfo from "./MyInfo";
import MyPostList from "./MyPostList";
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as Api from "../../api";
import { useNavigate } from "react-router-dom";
import Header from "../view/Header";

const MyPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => (state ? state.userReducer.user : undefined));
    const deleteAccount = async () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            await Api.delete("user/current");
            alert("탈퇴가 완료되었습니다.");
            navigate("/");
        }
    };
    return (
        <Wrapper>
            <Header />
            <Logo>MyPage</Logo>
            <MyInfo user={user} />
            <MyPostList user={user} />
            <Delete onClick={deleteAccount}>삭제</Delete>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Delete = styled.p`
    color: red;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: pointer;
    margin-bottom: 100px;
    &:hover {
        opacity: 0.5;
    }
`;
const Logo = styled.div`
    color: #7353ea;
    font-weight: bold;
    font-size: 2rem;
    align-self: flex-start;
    margin-top: 70px;
    margin-left: 120px;
    user-select: none;
`;

export default MyPage;
