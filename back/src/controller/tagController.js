import { tagService } from "../services/tagService";

class tagController {
    // tag기반으로  postId를 검색하면 리스트 형태로 나옵니다.
    static async getAllPostByTag(req, res, next) {
        const tag = req.params.tag;
        const postList = await tagService.getPostListByTag({ tag });
        res.status(200).json(postList);
    }

    static async getAllTag(req, res, next) {
        try {
            const tags = await tagService.getAllTag();
            res.status(200).json(tags);
        } catch (error) {
            next(error);
        }
    }
}

export { tagController };
