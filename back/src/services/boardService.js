import { boardModel } from "../db/models/board/board";
import { v4 as uuidv4 } from "uuid";
import { addError, findError } from "../utils/errorMessages";

class boardService {
  static async addBoard({ userId, userName, header, title, body }) {
    if (!userId || !userName || !header || !title || !body) {
      const errorMessage = addError("게시판");
      throw new Error(errorMessage);
    }
    const boardId = uuidv4();
    const newBoard = { boardId, userId, userName, header, title, body };
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

  static async getBoardListByUserId({ userId }) {
    const boardList = await boardModel.findByUserId({ userId });
    return boardList;
  }

  static async getBoardList() {
    const boardList = await boardModel.findBoardList();
    return boardList;
  }

  static async getBoardListByPage({ page, perPage }) {
    if (
      !page ||
      !perPage ||
      typeof page !== "number" ||
      typeof perPage !== "number"
    ) {
      const errorMessage = findError("게시판 리스트");
      throw new Error(errorMessage);
    }
    const boardList = await boardModel.findBoardListByPage({ page, perPage });
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
