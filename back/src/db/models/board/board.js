import models, { Sequelize } from "../index";

// const Op = Sequelize.Op;

class boardModel {
  static async insertBoard({ newBoard }) {
    const insertBoard = await models.Board.create(newBoard);
    return insertBoard;
  }

  static async findByBoardId({ boardId }) {
    const board = await models.Board.findOne({ where: { boardId } });
    return board;
  }

  static async findByUserId({ userId }) {
    const boardList = await models.Board.findAll({ where: { userId } });
    return boardList;
  }

  static async update({ boardId, toUpdate }) {
    const filter = { boardId };
    const updatedBoard = await models.Board.update(toUpdate, {
      where: filter,
    });

    return updatedBoard;
  }

  static async deleteByBoardId({ boardId }) {
    const result = await models.Board.destroy({ where: { boardId } });
    const deletedResult = result === 1;
    return deletedResult;
  }

  static async deleteByUserId({ userId }) {
    const result = await models.Board.destroy({ where: { userId } });
    return result;
  }
}

export { boardModel };
