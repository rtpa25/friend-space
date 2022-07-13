import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../interfaces/group.interface';

interface GroupChatWindowDataState {
  isOpen: boolean;
  group: Group | undefined;
}

// Define the initial state using that type
const initialState: GroupChatWindowDataState = {
  isOpen: false,
  group: undefined,
};

export const GroupChatWindowDataSlice = createSlice({
  name: 'groupChat',

  initialState: initialState,

  reducers: {
    setGroupChatData: (
      state: GroupChatWindowDataState,
      action: PayloadAction<GroupChatWindowDataState>
    ) => {
      state.isOpen = action.payload.isOpen;
      state.group = action.payload.group;
    },

    toggleGroupChatWindow: (state: GroupChatWindowDataState) => {
      state.isOpen = !state.isOpen;
    },

    hideGroupChatWindow: (state: GroupChatWindowDataState) => {
      state.isOpen = false;
    },
  },
});

export const { setGroupChatData, toggleGroupChatWindow, hideGroupChatWindow } =
  GroupChatWindowDataSlice.actions;

export default GroupChatWindowDataSlice.reducer;
