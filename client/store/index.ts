import { configureStore } from '@reduxjs/toolkit';
import friendsReducers from './slices/friends.slice';
import invitationsReducers from './slices/invitations.slice';

export const store = configureStore({
  reducer: {
    friends: friendsReducers,
    invitations: invitationsReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
