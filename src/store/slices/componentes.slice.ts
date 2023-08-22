import { IComponentState } from "@models/components.model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState: IComponentState = {
  isDarkMode: true,
};

export const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.feedback,
      };
    });
  },
});

export const { setIsDarkMode } = componentSlice.actions;
export default componentSlice.reducer;
