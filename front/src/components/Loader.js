import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const LoaderWrap = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`;

const Loader = () => {
    return (
        <LoaderWrap>
            <CircularProgress />
        </LoaderWrap>
    );
};

export default Loader;
