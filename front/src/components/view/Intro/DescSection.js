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
          <Title1>커리큘럼에 따른 학습 기록</Title1>
          <Description>
            본인의 말로 학습한 내용을 기록해 보세요. 구글링으로 추가 학습한 내용이어도 좋아요. 더
            오래, 더 잘 기억날거에요. 또, 기록으로 이전에 배운 내용을 상기해보세요. 지금까지 걸어온
            길이 한 눈에 잘 보일거에요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title2>학습 기록 공유</Title2>
          <Description>
            동료 레이서의 학습 기록으로 학습해보세요. 함께 성장한다는 것은 큰 동기 부여가 될거에요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title3>학습 관련 토론</Title3>
          <Description>
            자유게시판을 이용해 학습한 내용에 대한 깊은 토론을 나눠보세요. 수박 겉핥기 학습에서
            벗어날 수 있을거에요.
          </Description>
        </ContentWrapper>
        <ContentWrapper>
          <Title4>최초 생성자 기록</Title4>
          <Description>
            편집자 기록이 남는 위키 서비스에요. 열심히 기여하여 취업시 포트폴리오로 활용할 수
            있을거에요.
          </Description>
        </ContentWrapper>
      </InnerWrapper>
    </DescWrapper>
  );
};
