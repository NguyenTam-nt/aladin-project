import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum language {
  'vi' = 'vi',
  'ko' = 'ko',
}

export interface ILanguageState {
  currenLanguage: language;
}

const initialState: ILanguageState = {
  currenLanguage: language.vi,
};

export const multiLangage = createSlice({
  name: 'multiLangage',
  initialState,
  reducers: {
    hanleChangeLanguage: (state, action: PayloadAction<language>) => {
      state.currenLanguage = action.payload;
    },
  },
});
export const {hanleChangeLanguage} = multiLangage.actions;
export default multiLangage.reducer;
