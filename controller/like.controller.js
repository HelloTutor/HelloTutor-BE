const freeBoardLikeRepository = require(
    "../repository/freeBoardLikeRepository");

async function freeBoardLike(req, res) {
  try {
    const { params: { postId }, user } = req;
    const selectRow = await freeBoardLikeRepository.selectFreeBoardLike(postId, user);

    if (selectRow === undefined) {
      const insertRow = await freeBoardLikeRepository.insert(user, postId, null);

      if (insertRow.affectedRows === 1) {
        return res.status(200).json({ message: "좋아요 완료" });
      }
    }

    if (selectRow.user_id === user.id) {
      const deleteRow = await freeBoardLikeRepository.deleteFreeBoardLike(user, postId);

      if (deleteRow.affectedRows === 1) {
        return res.status(200).json({ message: "좋아요 취소 완료" });
      }
    } else {
      return res.status(500).json({ message: "좋아요 취소 권한이 없습니다." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "에러 발생" });
  }
}

async function freeBoardCommentsLike(req, res) {
  try {
    const { params: { commentId }, user} = req;

    const selectRow = await freeBoardLikeRepository.selectFreeBoardCommentsLike(user, commentId);

    if (selectRow === undefined) {
      const insertRow = await freeBoardLikeRepository.insert(user, null, commentId);

      if (insertRow.affectedRows === 1) {
        return res.status(200).json({message: "좋아요 등록 완료"});
      }
    }

    if (selectRow.user_id === user.id) {
      const deleteRow = await freeBoardLikeRepository.deleteFreeBoardCommentsLike(user, commentId);

      if (deleteRow.affectedRows === 1) {
        return res.status(200).json({ message: "좋아요 삭제 완료" });
      }
    } else {
      return res.status(500).json({ message: "좋아요 삭제 권한이 없습니다." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error 발생" });
  }
}

module.exports = {
  freeBoardLike,
  freeBoardCommentsLike
}