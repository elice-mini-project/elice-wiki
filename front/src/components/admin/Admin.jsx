import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Admin = () => {
    const [selected, setSelected] = React.useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        setSelected(window.location.pathname.split("/")[2]);
    }, [window.location.pathname]);
    const clickHandler = (e) => {
        navigate(e.target.name);
    };
    const user = useSelector((state) => (state ? state.userReducer.user : undefined));

    return (
        <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <LogoHome
                src="/image/logo_small.png"
                alt="TOHOME"
                onClick={() => {
                    navigate("/");
                }}
                draggable="false"
            />
            <NavBar>
                <NavBtn onClick={clickHandler} name="users" color={selected === "users" ? "#c2c2c2" : "#e0e0e0"}>
                    유저관리
                </NavBtn>
                <NavBtn onClick={clickHandler} name="posts" color={selected === "posts" ? "#c2c2c2" : "#e0e0e0"}>
                    포스트관리
                </NavBtn>
                <NavBtn onClick={clickHandler} name="board" color={selected === "board" ? "#c2c2c2" : "#e0e0e0"}>
                    게시판관리
                </NavBtn>
                <NavBtn
                    onClick={clickHandler}
                    name="questions"
                    color={selected === "questions" ? "#c2c2c2" : "#e0e0e0"}
                    disabled={user?.admin === 0 ? false : true}
                >
                    인증질답관리
                </NavBtn>
            </NavBar>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
};

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
`;
const NavBtn = styled.button`
    border: none;
    border-radius: 10px 10px 0 0;
    width: 10rem;
    height: 3rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: ${(props) => (props.disabled === true ? "default" : "pointer")};
    background-color: ${(props) => props.color};
    &:hover {
        background-color: ${(props) => (props.disabled === true ? "none" : "#c2c2c2")};
    }
`;
const Container = styled.div`
    width: 80vw;
    height: 80vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`;
const LogoHome = styled.img`
    -webkit-user-select: none;
    cursor: pointer;
    width: 50px;
    position: absolute;
    top: 10px;
    &:hover {
        opacity: 0.6;
    }
`;

export default Admin;
