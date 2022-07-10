import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';

interface FriendsListState {
  value: User[];
}

// Define the initial state using that type
const initialState: FriendsListState = {
  value: [],
};

export const FriendsListSlice = createSlice({
  name: 'friends',

  initialState: initialState,

  reducers: {
    setFriends: (
      state: FriendsListState,
      action: PayloadAction<FriendsListState>
    ) => {
      state.value = action.payload.value;
    },
  },
});

export const { setFriends } = FriendsListSlice.actions;

export default FriendsListSlice.reducer;
