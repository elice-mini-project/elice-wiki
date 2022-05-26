import is from "@sindresorhus/is";
import { boardService } from "../services/boardService";
import { userService } from "../services/userService";
import { headerError } from "../utils/errorMessages";

class boardController {
  static async addBoard(req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(headerError);
      }

      const { userId } = req.currentUser;
      const user = await userService.findUser({ userId });
      const userName = user["name"];
      const { header, title, body } = req.body;

      await boardService.addBoard({
        userId,
        userName,
        header,
        title,
        body,
      });

      res.status(201).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async getBoard(req, res, next) {
    try {
      const { boardId } = req.params;
      const foundBoard = await boardService.getBoard({ boardId });

      res.status(200).json({ status: "success", payload: foundBoard });
    } catch (error) {
      next(error);
    }
  }

  static async getBoardListByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const foundList = await boardService.getBoardListByUserId({ userId });

      res.status(200).json({ status: "success", payload: foundList });
    } catch (error) {
      next(error);
    }
  }

  static async getBoardList(req, res, next) {
    try {
      const foundList = await boardService.getBoardList();

      res.status(200).json({ status: "success", payload: foundList });
    } catch (error) {
      next(error);
    }
  }

  static async getBoardListByPage(req, res, next) {
    try {
      const { page, perPage } = req.query;
      const boardList = await boardService.getBoardListByPage({
        page: Number(page),
        perPage: Number(perPage),
      });
      res.status(200).json({ status: "success", payload: boardList });
    } catch (error) {
      next(error);
    }
  }

  static async setBoard(req, res, next) {
    try {
      const { boardId } = req.params;

      const toUpdate = req.body;

      await boardService.setBoard({
        boardId,
        toUpdate,
      });

      res.status(200).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBoard(req, res, next) {
    try {
      const { boardId } = req.params;
      await boardService.deleteBoard({ boardId });

      res.status(200).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }
}
export { boardController };
