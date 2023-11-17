import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPopupState {
  showDrawerFloor: boolean
  showAction : boolean
  floorDrawerActive : string
  areaId : number | undefined
  nameArea: string
}

const initialState: IPopupState = {
  showDrawerFloor: false,
  showAction : false,
  floorDrawerActive : 'Tất cả',
  areaId : undefined,
  nameArea: ""
};

export const infoDrawerSlice = createSlice({
  name: 'infoDrawerSlice',
  initialState,
  reducers: {
    setShowDrawerFloor: (state, action: PayloadAction<boolean>) => {
      if (state.showDrawerFloor !== action.payload) {
        state.showDrawerFloor = action.payload;
      }
    },
    setShowActionCart: (state, action: PayloadAction<boolean>) => {
      if (state.showAction !== action.payload) {
        state.showAction = action.payload;
      }
    },
    setFloorActiveRedux: (state, action: PayloadAction<string>) => {
      state.floorDrawerActive = action.payload;
    },
    setAreaId: (state, action: PayloadAction<{id: number; name: string}>) => {
      state.areaId = action.payload.id;
      state.nameArea = action.payload.name;
    },
  },
});
export const {setShowDrawerFloor ,setShowActionCart ,setFloorActiveRedux ,setAreaId} = infoDrawerSlice.actions;
export default infoDrawerSlice.reducer;