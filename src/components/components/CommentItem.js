import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment, addComment } from '../redux/commentsSlice';
import { FaTrash, FaEdit, FaReply } from 'react-icons/fa';

const CommentItem = ({ comment, comments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (isEditing) {
      dispatch(editComment({ id: comment.id, text }));
    }
    setIsEditing(!isEditing);
  };

  const handleReply = () => {
    if (replyText) {
      const newReply = {
        id: Date.now(),
        parentId: comment.id,
        name: comment.name,
        text: replyText,
        date: new Date().toISOString(),
      };
      dispatch(addComment(newReply));
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <strong>{comment.name}</strong> 
        <span>{new Date(comment.date).toLocaleDateString()}</span>
      </div>
      <div className="comment-body">
        {isEditing ? (
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <p>{comment.text}</p>
        )}
      </div>
      <div className="comment-actions">
        <button onClick={handleEdit}>
          <FaEdit /> {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={() => setShowReplyForm(!showReplyForm)}>
          <FaReply /> {showReplyForm ? 'Cancel' : 'Reply'}
        </button>
        <button
          className="delete-btn"
          onClick={() => dispatch(deleteComment(comment.id))}
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
      {showReplyForm && (
        <div className="reply-form">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply to this comment..."
          />
          <button onClick={handleReply}>Post Reply</button>
        </div>
      )}
      <div className="replies">
        {comments
          .filter(reply => reply.parentId === comment.id)
          .map(reply => (
            <CommentItem key={reply.id} comment={reply} comments={comments} />
          ))}
      </div>
    </div>
  );
};

export default CommentItem;
