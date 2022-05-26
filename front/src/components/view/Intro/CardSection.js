import styled from "styled-components";
import { Card1 } from "./Cards/Card1";
import { Card2 } from "./Cards/Card2";
import useScrollFadeIn from "../../../hooks/useScrollFadeIn";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  max-width: 100%;
  padding: 175px 0;
  background-color: #ffffff;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 960px;
  float: left;
  margin: auto auto;
  box-sizing: border-box;
`;

const Title = styled.span`
  margin: 0px 0px 16px;
  font-size: 46px;
  font-weight: bold;
  line-height: 56px;
  color: #000000;
`;

const Description = styled.span`
  margin: 0px 0px 32px;
  font-size: 18px;
  line-height: 29px;
  color: rgb(107, 118, 132);
  white-space: pre-line;
`;

const CardWrapper = styled.div`
  z-index: 1;
  display: flex;
  margin: 0 auto;
`;

const InnerWrapper = styled.div`
  width: 458px;
  height: 523px;
  margin: 14px 22px;
`;

const CardSection = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
    1: useScrollFadeIn("up", 0.9, 0.1),
    2: useScrollFadeIn("up", 0.9, 0.1),
  };
  return (
    <>
      <TopContainer>
        <TextWrapper {...animatedItem[0]}>
          <Title>누군가 멋진 제목을 지어주세요</Title>
          <Description>
            두 질문에 대한 답으로, 우리는 마음을 담아 #elice-wiki를
            준비했습니다.
          </Description>
        </TextWrapper>
        <CardWrapper {...animatedItem[1]}>
          <InnerWrapper>
            <Card1 />
          </InnerWrapper>
          <InnerWrapper {...animatedItem[2]}>
            <Card2 />
          </InnerWrapper>
        </CardWrapper>
      </TopContainer>
    </>
  );
};

export default CardSection;
