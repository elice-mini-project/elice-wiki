import { useTheme } from "@mui/material/styles";
import {
  Grid,
  TextareaAutosize,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
} from "@mui/material";
import styled from "styled-components";

const headers = ["공지", "학습", "잡담"];

const getStyles = (name, header, theme) => {
  return {
    fontWeight:
      header.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

function WriteForm({ title, setTitle, body, setBody, header, setHeader }) {
  const theme = useTheme();

  const handleChange = (e) => {
    setHeader(e.target.value);
  };

  return (
    <>
      <FormControl sx={{ width: "20%", mt: 3 }}>
        <Select
          displayEmpty
          value={header}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected?.length === 0) {
              return <em>머리말 선택</em>;
            }

            return selected;
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>머리말을 선택하세요</em>
          </MenuItem>
          {headers.map((header) => (
            <MenuItem key={header} value={header} style={getStyles(header, header, theme)}>
              {header}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Grid
        sx={{
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <TitleWrite
          value={title}
          required
          maxRows={1}
          placeholder="제목을 입력하세요"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid
        sx={{
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <Write
          value={body}
          required
          minRows={20}
          maxRows={20}
          placeholder="내용을 입력하세요"
          onChange={(e) => setBody(e.target.value)}
        />
      </Grid>
    </>
  );
}

const TitleWrite = styled(TextareaAutosize)`
    border-radius: 10px 10px 0 0;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: solid 1px #dcdcdc;
    font-size:20px;
    width: 99%;
    resize: none;
    padding: 3%;
    &: hover {
      background-color: #F7F7F7;
    }

    &: focus {
      border-bottom:solid 1px #D6CCC2;
        outline:none;
      },
`;

const Write = styled(TextareaAutosize)`
    font-size: 20px;
    border: solid 1px #dcdcdc;
    border-radius: 10px;
    width: 99%;
    resize: none;
    padding: 3%;

    &: hover {
      background-color: #F7F7F7;
    }

    &: focus {
      border:solid 1px #D6CCC2;
      outline:none;
    },
`;

export default WriteForm;
