import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
    AppBar, //
    Box,
    Button,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/userAction";

const Search = styled("form")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = "primary-search-account-menu";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => (state ? state.userReducer.user : undefined));

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // dispatch 함수를 이용해 로그아웃함.
        dispatch(logoutUser());
        // 기본 페이지로 돌아감.
        navigate("/");
    };

    const handleClick = () => {
        navigate("/mypage");
    };

    const handleSearch = (event) => {
        event.preventDefault();
        return (window.location.href = `/posts?search=${event.target[0].value}`);
    };

    return (
        <Box sx={{ flexGrow: 1 }} style={{ width: "100%", height: "60px" }}>
            <AppBar position="static" style={{ backgroundColor: "#C4C4C4" }}>
                <Toolbar>
                    <img
                        alt="elice_logo"
                        src="../../../image/logo_large.png"
                        style={{ width: 150, imageRendering: "auto", cursor: "pointer" }}
                        onClick={() => navigate("/home")}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Search onSubmit={handleSearch}>
                        <SearchIconWrapper onClick={handleSearch}>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                    <Button color="inherit" onClick={() => navigate("/board")}>
                        Board
                    </Button>

                    <Box sx={{ display: "flex" }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <img
                                alt="User Profile"
                                src={userState?.profile_img}
                                style={{ width: "24px", height: "24px", borderRadius: "50%" }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Menu anchorEl={anchorEl} id={menuId} open={isMenuOpen} onClose={handleMenuClose}>
                <MenuItem onClick={handleClick}>My Page</MenuItem>
                {(userState?.admin === 0 || userState?.admin === 1) && (
                    <MenuItem color="inherit" onClick={() => navigate("/admin/users")}>
                        Admin
                    </MenuItem>
                )}
                <hr />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </Box>
    );
}

export default Header;
