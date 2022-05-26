import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    IconButton,
    Button,
} from "@mui/material/";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// import Confirm from "../Confirm";

function BoardContents({ setIsEditing, isEditable, handleDelete, boardData }) {
    const navigate = useNavigate();
    const { title, content, createdAt, author } = boardData;
    const [open, setOpen] = useState(false);
    const confirmTitle = "게시글을 삭제하실 건가요?";
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardHeader
                    action={
                        <Button size="small" onClick={() => navigate("/board")}>
                            목록
                        </Button>
                    }
                    title={title}
                    subheader={`${author} | ${createdAt.slice(0, 10)}`}
                />
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        {content}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    {isEditable && (
                        <>
                            <IconButton
                                onClick={() => setIsEditing(true)}
                                sx={{ marginLeft: "auto" }}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleClickOpen()}>
                                <DeleteIcon />
                            </IconButton>
                            {/* <Confirm
                                open={open}
                                handleClose={handleClose}
                                handleDelete={handleDelete}
                                title={confirmTitle}
                            /> */}
                        </>
                    )}
                </CardActions>
            </Card>
        </>
    );
}

export default BoardContents;
