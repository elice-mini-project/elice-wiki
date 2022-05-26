import models, { Sequelize } from "../index";
const Op = Sequelize.Op;

class tagModel {
    static async insertPostId({ newPostTag }) {
        // tag 테이블에 post_id 추가
        const insert = await models.Tag.create(newPostTag);
        return insert;
    }

    static async getTagId({ tag }) {
        // tag 하나만 검색
        const tagId = await models.Tag.findOne({ where: { tag } });
        return tagId;
    }

    static async findPostsByTag({ tag }) {
        // tag 클릭 시 post 반환
        // tag 기반 검색 시 join연산 필요
        const postList = await models.Tag.findAll({
            where: { tag },
            include: [
                {
                    model: "Post",
                    required: false,
                },
            ],
            attributes: ["post_id", "tag"],
        });
        return postList;
    }

    static async getAllTag() {
        const tags = await models.Tag.findAll({
            attributes: ["tag"],
            group: ["tag"],
        });

        if (!tags) {
            return {
                status: "failed",
                message: "저장된 태그가 없습니다.",
            };
        }
        let tagList = [];
        [...tags].forEach((tag) => {
            tagList.push(tag.tag);
        });

        return {
            status: "succ",
            payload: tagList,
        };
    }
}

export { tagModel };
