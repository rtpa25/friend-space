import { configureStore } from '@reduxjs/toolkit';
import friendsReducers from './slices/friends.slice';
import invitationsReducers from './slices/invitations.slice';
import chatWindowReducers from './slices/chatWindowData.slice';
import currentUserReducers from './slices/currentUserData.slice';
import groupsReducers from './slices/groups.slice';
import groupChatWindowReducers from './slices/groupChatWindowData.slice';

export const store = configureStore({
  reducer: {
    friends: friendsReducers,
    invitations: invitationsReducers,
    chat: chatWindowReducers,
    currentUser: currentUserReducers,
    groups: groupsReducers,
    groupChat: groupChatWindowReducers,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
