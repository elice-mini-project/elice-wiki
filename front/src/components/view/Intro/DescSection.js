import styled from "styled-components";
import useScrollFadeIn from "../../../hooks/useScrollFadeIn";

const DescWrapper = styled.section`
  background: #f9fafb;
  padding: 100px 80px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  padding-left: 0;
`;

const Title = styled.span`
  color: #000;
  font-weight: 800;
  margin-top: 16px;
  margin-bottom: 23px;
  font-size: 37px;
`;

const Title1 = styled(Title)`
  background: linear-gradient(90deg, #5438d1, #8938d1 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title2 = styled(Title)`
  background-image: linear-gradient(
    83.2deg,
    rgba(150, 93, 233, 1) 10.8%,
    rgba(99, 88, 238, 1) 94.3%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title3 = styled(Title)`
  background: linear-gradient(90deg, #ae41c5, #df51ad 60%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Title4 = styled(Title)`
  background: linear-gradient(90deg, #df51ad, #eb587d 90%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.span`
  color: #333d4b;
  font-size: 17px;
  max-width: 374px;
  font-weight: 500;
  line-height: 1.6;
`;

export const DescSection = () => {
  const animatedItem = {
    0: useScrollFadeIn("up", 0.9, 0),
  };
  return (
    <DescWrapper>
      <InnerWrapper {...animatedItem[0]}>
        <ContentWrapper>
          <Title1>간단한 기능설명</Title1>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을 지향해요.
            제가 무슨 말을 하는지 이해하지 못하도록 설명을 최소화했어요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title2>간단한 기능설명</Title2>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을 지향해요.
            제가 무슨 말을 하는지 이해하지 못하도록 설명을 최소화했어요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title3>간단한 기능설명</Title3>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을 지향해요.
            제가 무슨 말을 하는지 이해하지 못하도록 설명을 최소화했어요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title4>간단한 기능설명</Title4>
          <Description>
            엘리스 위키는 기본 12시 54분을 기반으로 가장 단순한 내용을 지향해요.
            제가 무슨 말을 하는지 이해하지 못하도록 설명을 최소화했어요.
          </Description>
        </ContentWrapper>
      </InnerWrapper>
    </DescWrapper>
  );
};
