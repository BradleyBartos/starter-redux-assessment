import { createSlice } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/search.slice';
import photos from './photos.data.js';

// Initialize
const initialState = {
  photos,
};

// Reducers
const addReducer = (state, action) => {
  state.photos.unshift(action.payload);
}
const removeReducer = (state, action) => {
  state.photos.splice(action.payload-1, 1 );
}

const options = {
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: addReducer,
    removePhoto: removeReducer,
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  const photos = selectAllPhotos(state);
  const search = selectSearchTerm(state);
  return photos.filter(photo => photo.caption.toLowerCase().includes(search.toLowerCase()));
};
