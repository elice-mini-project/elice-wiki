import { commentModel } from "../db/models/comment/comment";
import { v4 as uuidv4 } from "uuid";
import { addError, findError, deleteError } from "../utils/errorMessages";

class commentService {
  static async addComment({ boardId, userId, userName, profileImg, content }) {
    if (!boardId || !userId || !userName || !content) {
      const errorMessage = addError("댓글");
      throw new Error(errorMessage);
    }
    const commentId = uuidv4();
    const newComment = {
      commentId,
      boardId,
      userId,
      userName,
      profileImg,
      content,
    };
    const insertedComment = await commentModel.insertComment({ newComment });

    const { id } = insertedComment;
    const toUpdate = { groupId: id };
    const insertedGroupId = await commentModel.update({
      commentId,
      toUpdate,
    });

    return insertedGroupId;
  }

  static async addReComment({ target, userId, userName, profileImg, content }) {
    if (!target || !userId || !userName || !content) {
      const errorMessage = addError("댓글");
      throw new Error(errorMessage);
    }

    if (target.isDeleted == 1) {
      const errorMessage = deleteError("댓글");
      throw new Error(errorMessage);
    }
    const commentId = uuidv4();
    const groupId = target.groupId;
    const parentId = target.id;
    const depth = target.depth + 1;
    const comments = await commentModel.findByDepth({
      groupId,
      parentId,
      depth,
    });
    const orderList = comments.map((comment) => comment.order);
    const maxOrder =
      orderList.length > 0 ? Math.max(...orderList) : target.order;
    const order = maxOrder + 1;

    const orderRange = order;
    await commentModel.incrementOrder({ groupId, orderRange });

    const boardId = target.boardId;
    const newComment = {
      commentId,
      groupId,
      parentId,
      order,
      depth,
      boardId,
      userId,
      userName,
      profileImg,
      content,
    };
    const insertedReComment = await commentModel.insertComment({ newComment });

    return insertedReComment;
  }

  static async getComment({ commentId }) {
    const comment = await commentModel.findByCommentId({ commentId });
    if (!comment) {
      const errorMessage = findError("댓글");
      throw new Error(errorMessage);
    }

    return comment;
  }

  static async getCommentList({ boardId }) {
    const commentList = await commentModel.findByBoardId({ boardId });
    return commentList;
  }

  static async getCommentListByUserId({ userId }) {
    const commentList = await commentModel.findByUserId({ userId });
    return commentList;
  }

  static async setComment({ commentId, toUpdate }) {
    let comment = await commentModel.findByCommentId({ commentId });
    if (!comment) {
      const errorMessage = findError("댓글");
      throw new Error(errorMessage);
    }
    comment = await commentModel.update({
      commentId,
      toUpdate,
    });
    console.log(comment);
    return comment;
  }

  static async deleteComment({ commentId }) {
    const deletedResult = await commentModel.deleteByCommentId({ commentId });
    if (!deletedResult) {
      const errorMessage = findError("댓글");
      throw new Error(errorMessage);
    }

    return deletedResult;
  }
}

export { commentService };
