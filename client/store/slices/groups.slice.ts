import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../interfaces/group.interface';

interface GroupsListState {
  value: Group[];
}

// Define the initial state using that type
const initialState: GroupsListState = {
  value: [],
};

export const GroupsListSlice = createSlice({
  name: 'groups',

  initialState: initialState,

  reducers: {
    setGroups: (
      state: GroupsListState,
      action: PayloadAction<GroupsListState>
    ) => {
      state.value = action.payload.value;
    },

    addGroup: (state: GroupsListState, action: PayloadAction<Group>) => {
      state.value.push(action.payload);
    },
  },
});

export const { setGroups, addGroup } = GroupsListSlice.actions;

export default GroupsListSlice.reducer;
