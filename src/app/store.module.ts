import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { counterReducer } from '@/core/store/test/counter/counter.reducer';
import { collectionReducer } from '@store/test/collection/collection.reducer';
import { booksReducer } from '@store/test/books/books.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({
      count: counterReducer,
      books: booksReducer,
      collection: collectionReducer,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Journey Connect',
    }),
  ],
})
export class AppStoreModule {}
