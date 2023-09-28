import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { counterReducer } from '@/core/store/test/counter/counter.reducer';
import { collectionReducer } from '@store/test/collection/collection.reducer';
import { booksReducer } from '@store/test/books/books.reducer';
import { meReducer } from '@/core/store/me/me.reducer';
import { feedPostsReducer } from '@/core/store/feed-posts/feed-posts.reducer';
import { friendReducer } from '@/core/store/friend/friend.reducer';
import { userReducer } from '@/core/store/user/user.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      me: meReducer,
      feedPosts: feedPostsReducer,
      friend: friendReducer,
      user: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Journey Connect',
    }),
  ],
})
export class AppStoreModule {}
