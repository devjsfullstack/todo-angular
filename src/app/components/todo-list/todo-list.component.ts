import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Data } from '../../models/todos.interface';

@Component({
  selector: 'todo-list-component',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

class TodoListComponent implements OnInit, OnChanges {

  @Input() todos: Data[];
  @Input() totalPages: number;
  @Input() currentPage: number;

  @Output() eventChangePage = new EventEmitter();

  pages: number[];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    console.log(this.currentPage, '¿CURRENT PAGE?')
    console.log(this.todos, '¿TODOS?')
    console.log(this.totalPages, '¿TOTAL PAGES?')
    if (this.totalPages > 0) {
      this.pages = Array.from(Array(this.totalPages).keys());
    }
  }

  changePage = (page: number) => {
    this.eventChangePage.emit(page);
  }

  setPage = (page) => {
    this.eventChangePage.emit(page);
  }

}

export { TodoListComponent };
