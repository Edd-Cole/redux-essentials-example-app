import { sub } from "date-fns";

const { createSlice, nanoid } = require("@reduxjs/toolkit");

export const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        };
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (!!existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (!!existingPost) {
        existingPost.reactions[reaction] += 1;
      }
    },
  },
});

export default postsSlice.reducer;

export const selectAllPosts = state => state.posts;

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId);
