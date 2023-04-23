import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  author: "",
  content: "",
  description: "",
  publishedAt: "",
  source: {},
  title: "",
  url: "",
  urlToImage: "",
};

export const stateSlice = createSlice({
  name: "article",
  initialState,

  reducers: {
    setArticle: (state, action) => {
      (state.author = action.payload.author),
        (state.content = action.payload.content),
        (state.description = action.payload.description),
        (state.publishedAt = action.payload.publishedAt),
        (state.source = action.payload.source),
        (state.title = action.payload.title),
        (state.url = action.payload.url),
        (state.urlToImage = action.payload.urlToImage);
    },
  },
});

export const { setArticle } = stateSlice.actions;
export default stateSlice.reducer;
