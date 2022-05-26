import { postService } from "../services/postService";
import { userService } from "../services/userService";

class postController {
    static async addPost(req, res, next) {
        try {
            // 요청으로부터 데이터 받아오기
            const user_id = req.currentUser.userId;
            const { week, tag, title } = req.body;
            const getUser = await userService.findUser({
                userId: user_id,
            });
            const lastmod_user = getUser.name;

            const body =
                "# title\n\n## h2\n\n- p tag   \n\n- p tag   \n\ncontent\n# hello";

            const create = await postService.addPost({
                user_id,
                week,
                tag,
                body,
                lastmod_user,
                title,
            });
            res.status(201).json({
                status: "success",
                payload: { postId: create.post_id },
            });
        } catch (error) {
            next(error);
        }
    }

    static async getPostByPostId(req, res, next) {
        try {
            const post_id = req.params.id;
            const getSinglePost = await postService.getPostByPostId({
                post_id,
            });
            res.status(200).json({ status: "success", payload: getSinglePost });
        } catch (error) {
            next(error);
        }
    }

    static async getPostByWeek(req, res, next) {
        try {
            const week = req.params.week;
            const { page = 1, perPage = 5 } = req.query;
            const postList = await postService.getPostByWeek({
                week: Number(week),
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json({ status: "success", payload: postList });
        } catch (error) {
            next(error);
        }
    }

    static async getPostsByTag(req, res, next) {
        try {
            const tag = req.params.tag;
            const { page = 1, perPage = 5 } = req.query;
            const posts = await postService.getPostsByTag({
                tag,
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json({ status: "success", payload: posts });
        } catch (error) {
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        try {
            const postId = req.params.id;
            const userId = req.currentUser.userId;
            const getUser = await userService.findUser({
                userId,
            });
            const lastmod_user = getUser.name;

            const { week, tag, title } = req.body;
            const body =
                "# hello world\n\n## h2\n\n- p tag   \n\n- p tag   \n\ncontent\n# hello";
            await postService.updatePost({
                body,
                user_id: userId,
                lastmod_user,
                postId,
                week,
                title,
                tag,
            });
            res.status(200).json({ status: "success" });
        } catch (error) {
            next(error);
        }
    }

    static async findAllPost(req, res, next) {
        try {
            const { page = 1, perPage = 5 } = req.query;
            const posts = await postService.getAllPost({
                page: Number(page),
                perPage: Number(perPage),
            });
            res.status(200).json({ status: "success", payload: posts });
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        const postIdList = req.params.postId.split(",");
        const deleteResult = { success: 0, failed: 0 };
        Promise.all(
            postIdList.map(async (id) => {
                try {
                    const result = await postService.deletePost({ postId: id });
                    if (result === 0) {
                        deleteResult.failed += 1;
                    } else {
                        deleteResult.success += 1;
                    }
                } catch (error) {
                    next(error);
                }
            })
        ).then(() => {
            const body = {
                status: "success",
                payload: { ...deleteResult },
            };
            res.status(200).json(body);
        });
    }
}

export { postController };
