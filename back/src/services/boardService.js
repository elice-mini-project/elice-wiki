import { boardModel } from "../db/models/board/board";
import { v4 as uuidv4 } from "uuid";
import { addError, findError } from "../utils/errorMessages";

class boardService {
  static async addBoard({ userId, postId, title, body }) {
    if (!userId || !postId || !title || !body) {
      const errorMessage = addError("게시판");
      throw new Error(errorMessage);
    }
    const boardId = uuidv4();
    const newBoard = { boardId, userId, postId, title, body };
    const insertedBoard = await boardModel.insertBoard({ newBoard });

    return insertedBoard;
  }

  static async getBoard({ boardId }) {
    const board = await boardModel.findByBoardId({ boardId });
    if (!board) {
      const errorMessage = findError("게시판");
      throw new Error(errorMessage);
    }
    return board;
  }

  static async getBoardList({ userId }) {
    const boardList = await boardModel.findByUserId({ userId });
    return boardList;
  }

  static async setBoard({ boardId, toUpdate }) {
    let board = await boardModel.findByBoardId({ boardId });
    if (!board) {
      const errorMessage = findError("게시판");
      throw new Error(errorMessage);
    }

    board = await boardModel.update({
      boardId,
      toUpdate,
    });

    return board;
  }

  static async deleteBoard({ boardId }) {
    const deletedResult = await boardModel.deleteByBoardId({ boardId });
    if (!deletedResult) {
      const errorMessage = findError("게시판");
      throw new Error(errorMessage);
    }

    return deletedResult;
  }

  static async deleteBoardList({ userId }) {
    const deletedResult = await boardModel.deleteByUserId({ userId });

    return deletedResult;
  }
}

export { boardService };
