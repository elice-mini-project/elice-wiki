import is from "@sindresorhus/is";
import { boardService } from "../services/boardService";
import { headerError } from "../utils/errorMessages";

class boardController {
  static async addBoard(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(headerError);
      }

      const userId = req.currentUserId;
      const { postId, title, body } = req.body;

      await boardService.addBoard({
        userId,
        postId,
        title,
        body,
      });

      res.status(201).json({ status: success });
    } catch (error) {
      next(error);
    }
  }

  static async getBoard(req, res, next) {
    try {
      const { boardId } = req.params;
      const foundBoard = await boardService.getBoard({ boardId });

      res.status(200).json({ status: success, payload: foundBoard });
    } catch (error) {
      next(error);
    }
  }

  static async getBoardList(req, res, next) {
    try {
      const { userId } = req.params;
      const foundList = await boardService.getBoardList({ userId });

      res.status(200).json({ status: success, payload: foundList });
    } catch (error) {
      next(error);
    }
  }

  static async setBoard(req, res, next) {
    try {
      const { boardId } = req.params;
      const postId = req.body.postId ?? null;
      const title = req.body.title ?? null;
      const body = req.body.body ?? null;

      const toUpdate = { postId, title, body };

      await boardService.setBoard({
        boardId,
        toUpdate,
      });

      res.status(200).json({ status: success });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBoard(req, res, next) {
    try {
      const { boardId } = req.params;
      await boardService.deleteBoard({ boardId });

      res.status(200).json({ status: success });
    } catch (error) {
      next(error);
    }
  }
}
export { boardController };
