const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
  { id: "1", title: "First Post!", content: "Hello!" },
  { id: "2", title: "Second Post", content: "More text" },
];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload);
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (!!existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export default postsSlice.reducer;

export const selectPosts = state => state.posts;

export const { postAdded, postUpdated } = postsSlice.actions;
