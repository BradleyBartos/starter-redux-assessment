import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const suggestionApi = 'http://localhost:3004/api/suggestion';

export const fetchSuggestion = createAsyncThunk(
  'suggestion/fetchSuggestion',
  async () => {
    const data = await fetch(suggestionApi).then(response => response.json());
    return data;
  }
);

const initialState = {
  suggestion: '',
  loading: true,
  error: false,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSuggestion.pending]: (state, action) => {
      state.suggestion = '';
      state.loading = true;
      state.error = false;
    },
    [fetchSuggestion.fulfilled]: (state, action) => {
      state.suggestion = action.payload.data;
      state.loading = false;
      state.error = false;
    },
    [fetchSuggestion.rejected]: (state, action) => {
      state.suggestion = '';
      state.loading = false;
      state.error = true;
    },
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
