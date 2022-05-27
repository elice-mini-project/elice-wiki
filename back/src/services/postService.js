import { postModel } from "../db/models/post/post";
import { tagModel } from "../db/models/tag/index";
import {
    existError,
    matchError,
    addError,
    findError,
    deleteError,
    headerError,
} from "../utils/errorMessages";

import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const writePost = (postId, body) => {
    const pwd = process.env.PWD;
    // post  추가 시 content를 파일로 만들어 폴더에 저장
    const savePath_post = `${pwd}/../front/src/_post`;
    const exist_post = fs.existsSync(savePath_post);
    if (!exist_post) {
        fs.mkdirSync(savePath_post);
    }

    // front/src/_post에 md파일이 저장된다
    fs.writeFile(
        `${savePath_post}/${postId}.md`,
        "\ufeff" + body,
        {
            encoding: "utf-8",
        },
        (err, data) => {
            if (err) {
                console.log(err);
            }
        }
    );
};

const getNowDateToString = () => {
    // 현재 시간을 받아오기
    // fixme: 날짜를 그냥 시간 빼고 문자열로 저장 하는것 생각해보기

    const nowDate = new Date();
    const year = nowDate.getUTCFullYear();

    // 월과 일은 2자리가 아닌경우 앞에 0을 붙여줌
    const month =
        nowDate.getUTCMonth().toString().length !== 2
            ? `0${nowDate.getUTCMonth()}`
            : nowDate.getUTCMonth();

    const day =
        nowDate.getUTCDate().toString().length !== 2
            ? `0${nowDate.getUTCDate()}`
            : nowDate.getUTCDate();

    const date = `${year}-${month}-${day}`;

    const dateDot = `${year}.${month}.${day}`;
    return { date, dateDot };
};

const makeTag = ({ tagList, post_id }) => {
    // tag 테이블에 추가하기
    let storedTag = "";

    tagList.forEach(async (tag) => {
        let lower = tag.toLowerCase();
        storedTag += `#${lower}`;
        const getTagId = await tagModel.getTagId({ tag: lower });
        let tag_id = "";
        if (getTagId === null) {
            // tag가 존재하지 않으면 추가
            tag_id = uuidv4();
        } else {
            tag_id = getTagId.tag_id;
        }
        const newPostTag = { tag_id, tag: lower, post_id };
        await tagModel.insertPostId({
            newPostTag,
        });
    });

    return storedTag;
};

class postService {
    // 값 req에서 받아와 추가 하기
    // tag 여러개 가져오는 방법은 프론트와 함께 얘기해봐야 함 #tag 이런식??
    static async addPost({ user_id, week, tag, lastmod_user, title, body }) {
        // body에서 받은 text를 md파일로 저장
        // todo: 함수 다이어트 필요
        if (!user_id || !week || !tag || !lastmod_user || !title || !body) {
            throw new Error(addError("post"));
        }

        const { date, dateDot } = getNowDateToString();
        const post_id = uuidv4();
        const createFile = writePost(post_id, body);

        if (createFile === "error") {
            throw new Error("create file error");
        }

        // tag 테이블에 추가하기
        const storedTag = makeTag({ tagList: tag, post_id });

        const newPost = {
            post_id,
            user_id,
            date: dateDot,
            week: Number(week),
            tag: storedTag,
            lastmod_user,
            title,
        };
        const insertedPost = await postModel.insertPost({ newPost });
        let addField = { ...insertedPost };
        addField.post_id = post_id;

        return addField;
    }

    static async getPostByPostId({ post_id }) {
        // post_id를 기준으로 검색
        const getOnePost = await postModel.getPostByPostId({ post_id });
        if (!getOnePost) {
            throw new Error(findError("post"));
        }
        return getOnePost;
    }

    static async getPostByWeek({ week, page, perPage }) {
        // week 기준으로 post 검색
        const { totalPage, postListInfo } = await postModel.findByWeek({
            week,
            page,
            perPage,
        });
        if (!postListInfo) {
            throw new Error(findError("post"));
        }
        const payload = {
            totalPage,
            postListInfo,
        };

        return payload;
    }

    static async getPostsByTag({ tag, page, perPage }) {
        const { totalPage, postListInfo } = await postModel.findByTag({
            tag,
            page,
            perPage,
        });
        if (!postListInfo) {
            throw new Error(findError("post"));
        }
        const payload = {
            totalPage,
            postListInfo,
        };
        return payload;
    }

    static async updatePost({
        body,
        week,
        tag,
        title,
        postId,
        lastmod_user,
        user_id,
    }) {
        // todo: body는 이후에 수정
        if (!week || !tag || !title || !postId) {
            throw new Error(addError("post"));
        }

        writePost(postId, body);

        const getTag = makeTag({ tagList: tag, post_id: postId });
        const update = {
            user_id,
            lastmod_user,
            week,
            tag: getTag,
            title,
        };
        const updatePost = await postModel.updatePost({ postId, update });
        return updatePost;
    }

    static async getAllPost({ page, perPage }) {
        const { totalPage, postListInfo } = await postModel.findAllPost({
            page,
            perPage,
        });
        if (!postListInfo) {
            throw new Error(findError("post"));
        }
        const payload = {
            totalPage,
            postListInfo,
        };

        return payload;
    }

    static async deletePost({ postId }) {
        const deleteResult = await postModel.deletePost({ postId });
        return deleteResult;
    }

    static async findByUserId({ page, perPage, user_id }) {
        const { totalPage, postListInfo } = await postModel.findByUserId({
            page,
            perPage,
            user_id,
        });
        if (!postListInfo) {
            throw new Error(findError("post"));
        }
        const payload = {
            totalPage,
            postListInfo,
        };
        return payload;
    }
}

export { postService };
