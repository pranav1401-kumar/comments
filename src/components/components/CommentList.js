import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentItem from './CommentItem';
import { sortComments } from '../redux/commentsSlice';

const CommentList = () => {
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    // Sort comments and replies by date and time
    dispatch(sortComments());
  }, [comments, dispatch]);

  // Filter root comments (those without a parent) and sort by date
  const sortedComments = comments
    .filter(comment => comment.parentId === null)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="comment-list">
      {sortedComments.map(comment => (
        <CommentItem key={comment.id} comment={comment} comments={comments} />
      ))}
    </div>
  );
};

export default CommentList;
