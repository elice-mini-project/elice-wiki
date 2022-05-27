import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

const getTagList = (tagString) => {
    // find 동작 시 post의 태그를 리스트로 변환
    const tagList = tagString.replaceAll("#", " ").trim().split(" ");
    return tagList;
};

const getPostInfo = (element) => {
    const { tag, ...postElement } = element;
    const tagList = getTagList(tag);
    return {
        ...postElement.dataValues,
        tag: tagList,
    };
};

const getPostList = (posts) => {
    const postListInfo = [];
    posts.forEach((element) => {
        postListInfo.push(getPostInfo(element));
    });
    return postListInfo;
};

const postPagination = async ({ page, perPage, query = null }) => {
    const paginateQuery = {
        where: query,
        order: [["createdAt", "DESC"]],
        limit: perPage,
        offset: perPage * (page - 1),
    };
    const { count, rows } = await models.Post.findAndCountAll(paginateQuery);
    const totalPage = Math.ceil(count / perPage);

    return { totalPage, rows };
};

// post model class
class postModel {
    // post 추가
    static async insertPost({ newPost }) {
        const insertPost = await models.Post.create(newPost);
        return insertPost;
    }

    static async findAllPost({ page, perPage }) {
        const { totalPage, rows } = await postPagination({
            page,
            perPage,
        });
        const postListInfo = getPostList(rows);
        return { totalPage, postListInfo };
    }

    static async getPostByPostId({ post_id }) {
        const getOnePost = await models.Post.findOne({
            where: { post_id },
        });
        return getOnePost;
    }

    static async findByWeek({ week, page, perPage }) {
        const query = {
            week: week,
        };
        if (perPage === -1) {
            const rows = await models.Post.findAll({ where: query });
            const postListInfo = getPostList(rows);
            return { totalPage: 1, postListInfo };
        }
        // week를 기준으로 post 검색
        const { totalPage, rows } = await postPagination({
            page,
            perPage,
            query,
        });
        const postListInfo = getPostList(rows);
        return { totalPage, postListInfo };
    }

    static async findByTag({ tag, page, perPage }) {
        const query = {
            tag: { [Op.substring]: tag },
        };
        const { totalPage, rows } = await postPagination({
            page,
            perPage,
            query,
        });
        const postListInfo = getPostList(rows);
        return { totalPage, postListInfo };
    }

    static async updatePost({ postId, update }) {
        const updateValue = { ...update };
        const updatePostInfo = await models.Post.update(updateValue, {
            where: {
                post_id: postId,
            },
        });
        return updatePostInfo;
    }
    static async deletePost({ postId }) {
        const deleteResult = await models.Post.destroy({
            where: { post_id: postId },
        });
        return deleteResult;
    }

    static async findByUserId({ user_id, page, perPage }) {
        const query = {
            user_id: user_id,
        };
        const { totalPage, rows } = await postPagination({
            page,
            perPage,
            query,
        });
        const postListInfo = getPostList(rows);
        return { totalPage, postListInfo };
    }
}

export { postModel };
