import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../redux/commentsSlice';
import '../css/CommentForm.css';  

const CommentForm = ({ parentId = null }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && text) {
      const newComment = {
        id: Date.now(),
        parentId,
        name,
        text,
        date: new Date().toISOString(),
      };
      dispatch(addComment(newComment));
      setName('');
      setText('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
         <label htmlFor="comment">Comment</label>
     
      <label htmlFor="name" className="form-label">Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="input-field"
      />

      <label htmlFor="comment" className="form-label">Comment</label>
      <textarea
        id="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment here"
        className="input-field comment-box"
      ></textarea>

      <button type="submit" className="post-btn">Post</button>
    </form>
  );
};

export default CommentForm;
