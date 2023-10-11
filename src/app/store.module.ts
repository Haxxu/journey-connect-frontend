import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { counterReducer } from '@/core/store/test/counter/counter.reducer';
import { collectionReducer } from '@store/test/collection/collection.reducer';
import { booksReducer } from '@store/test/books/books.reducer';
import { meReducer } from '@/core/store/me/me.reducer';
import { postsReducer } from '@/core/store/posts/posts.reducer';
import { friendReducer } from '@/core/store/friend/friend.reducer';
import { usersReducer } from '@/core/store/users/users.reducer';
import { socketReducer } from '@/core/store/socket/socket.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      me: meReducer,
      posts: postsReducer,
      friend: friendReducer,
      users: usersReducer,
      socket: socketReducer,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Journey Connect',
    }),
  ],
})
export class AppStoreModule {}
