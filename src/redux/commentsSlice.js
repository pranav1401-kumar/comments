import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: JSON.parse(localStorage.getItem('comments')) || [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment(state, action) {
      state.comments.push(action.payload);
      state.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
      state.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    editComment(state, action) {
      const { id, text } = action.payload;
      const comment = state.comments.find(comment => comment.id === id);
      if (comment) {
        comment.text = text;
      }
      state.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    sortComments(state) {
      state.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  },
});

export const { addComment, deleteComment, editComment, sortComments } = commentsSlice.actions;
export default commentsSlice.reducer;
