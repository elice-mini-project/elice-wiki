import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Admin = () => {
    const navigate = useNavigate();
    const clickHandler = (e) => {
        navigate(e.target.name);
    };
    const userState = useSelector((state) => (state ? state.userReducer.user : undefined));
    const user = userState?.payload;
    React.useEffect(() => {
        console.log(userState);
    }, [userState]);
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
            <Container>
                <NavBar>
                    <NavBtn onClick={clickHandler} name="users">
                        유저관리
                    </NavBtn>
                    <NavBtn onClick={clickHandler} name="posts">
                        게시물관리
                    </NavBtn>
                    {user?.admin === 0 && (
                        <NavBtn onClick={clickHandler} name="questions">
                            인증질답관리
                        </NavBtn>
                    )}
                </NavBar>
                <Container>
                    <Outlet />
                </Container>
            </Container>
        </div>
    );
};

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
`;
const NavBtn = styled.button``;
const Container = styled.div`
    width: 80vw;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`;

export default Admin;
