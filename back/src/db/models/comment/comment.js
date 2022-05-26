import models, { Sequelize } from "../index";

const Op = Sequelize.Op;

class commentModel {
  static async insertComment({ newComment }) {
    const insertedComment = await models.Comment.create(newComment);
    return insertedComment;
  }

  static async findByCommentId({ commentId }) {
    const comment = await models.Comment.findOne({ where: { commentId } });
    return comment;
  }

  static async findByBoardId({ boardId }) {
    const commentList = await models.Comment.findAll({
      order: [
        ["groupId", "ASC"],
        ["order", "ASC"],
      ],
      where: { boardId },
    });
    return commentList;
  }

  static async findByDepth({ groupId, parentId, depth }) {
    const comments = await models.Comment.findAll({
      where: { groupId, parentId, depth },
    });

    return comments;
  }

  static async incrementOrder({ groupId, orderRange }) {
    const comments = await models.Comment.increment(
      { order: 1 },
      { where: { groupId, order: { [Op.gte]: orderRange } } }
    );
    return comments;
  }

  static async update({ commentId, toUpdate }) {
    const filter = { commentId };
    const updatedComment = await models.Comment.update(toUpdate, {
      where: filter,
    });

    return updatedComment;
  }

  static async deleteByCommentId({ commentId }) {
    const deletedResult = await models.Comment.update(
      { isDeleted: true },
      { where: { commentId } }
    );
    return deletedResult;
  }
}

export { commentModel };
