import { Footer } from "./Footer";
import CardSection from "./CardSection";
import styles from "./Intro.module.css";
import { DescSection } from "./DescSection";
import useScrollFadeIn from "../../../hooks/useScrollFadeIn";
import OAuthButton from "../../auth/OAuthButton";

const Intro = () => {
    const animatedItem = {
        0: useScrollFadeIn("up", 0.9, 0),
        1: useScrollFadeIn("up", 0.9, 0.1),
    };
    return (
        <main className={styles["mainContainer"]}>
            <section className={styles["sectionOne"]}>
                <div style={{ position: "relative" }}>
                    <div className={styles["textWarpper"]}>
                        <div className={styles["innerWrapper"]}>
                            <h1 className={styles["title"]}>
                                엘리스 레이서,
                                <br />
                                학습 내용을 내 것으로
                            </h1>
                            <div
                                className={styles["description"]}
                                {...animatedItem[0]}
                            >
                                본 서비스는 엘리스에서 주관하는 교육 상황에서의
                                빠르고 많은
                                <br />
                                학습량과 구글링을 중심으로 한 프로그래밍 학습의
                                특성을 반영하여
                                <br />
                                제안된 위키 서비스입니다.
                            </div>
                            <div className={styles["btnWrapper"]}>
                                    <OAuthButton />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className={styles["subSection"]}>
                <p className={styles["subDescription"]} {...animatedItem[1]}>
                    모든 레이서들의 학습을 한눈에 보고, 자신의 학습을
                    기록해보세요.
                    <br />
                    <span>#elice-wiki</span> 는 엘리스 AI 트랙에 참여하는
                    레이서를 위한
                    <br />
                    <span>위키 서비스</span>입니다.
                </p>
            </div>
            <CardSection />
            <DescSection />
            <Footer />
        </main>
    );
};

export default Intro;
