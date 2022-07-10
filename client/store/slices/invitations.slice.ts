import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../interfaces/user.interface';

interface InvitationsListState {
  value: User[];
}

// Define the initial state using that type
const initialState: InvitationsListState = {
  value: [],
};

export const InvitationsListSlice = createSlice({
  name: 'invitations',

  initialState: initialState,

  reducers: {
    setInvitations: (
      state: InvitationsListState,
      action: PayloadAction<InvitationsListState>
    ) => {
      state.value = action.payload.value;
    },
  },
});

export const { setInvitations } = InvitationsListSlice.actions;

export default InvitationsListSlice.reducer;
