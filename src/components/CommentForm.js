import React, { useState } from 'react';

const CommentForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && comment.trim()) {
      onSubmit({ name, comment, date: new Date().toISOString() });
      setName('');
      setComment('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="input-field"
      />
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comment"
        className="input-field"
      />
      <button type="submit" className="post-btn">POST</button>
    </form>
  );
};

export default CommentForm;
