import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  increment,
  decrement,
  reset,
} from '@store/test/counter/counter.actions';
import { BookListComponent } from '../book-list/book-list.component';
import { BookCollectionComponent } from '../book-collection/book-collection.component';
import {
  selectBookCollection,
  selectBooks,
} from '@store/test/books/books.selectors';
import { BooksActions, BooksApiActions } from '@store/test/books/books.actions';
import { GoogleBooksService } from '../book-list/books.service';

@Component({
  imports: [CommonModule, BookListComponent, BookCollectionComponent],
  standalone: true,
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
})
export class MyCounterComponent implements OnInit {
  count$: Observable<number> = new Observable();
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);

  constructor(
    private store: Store<{ count: number; books: any; collection: any }>,
    private booksService: GoogleBooksService
  ) {
    this.count$ = store.select('count');
  }

  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      );
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
}
