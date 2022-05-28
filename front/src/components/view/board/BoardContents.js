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
import * as Api from "../../../api";

function BoardContents({ setIsEditing, isEditable, boardData }) {
  const navigate = useNavigate();
  const { title, body, createdAt, userName, header, boardId } = boardData;

  const handleDelete = async () => {
    try {
      if (window.confirm("게시글을 삭제하실 건가요?")) {
        await Api.delete("boards", boardId);
        navigate("/board");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card sx={{ minWidth: 275 }} variant="outlined">
        <CardHeader
          action={
            <Button size="small" onClick={() => navigate("/board")}>
              목록
            </Button>
          }
          title={`[${header}]${title}`}
          subheader={`${userName} | ${createdAt.slice(0, 10)}`}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {body}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          {isEditable && (
            <>
              <IconButton onClick={() => setIsEditing(true)} sx={{ marginLeft: "auto" }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete()}>
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
