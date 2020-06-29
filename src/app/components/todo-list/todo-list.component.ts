import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Data } from '../../models/todos.interface';
import { TodoService } from '../../services/todo.services';

@Component({
  selector: 'todo-list-component',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

class TodoListComponent implements OnInit, OnChanges {

  /**
   * Item list, sent from component parent
   */
  @Input() todos: Data[];

  /**
   * Total pages, sent from component parent
   */
  @Input() totalPages: number;

  /**
   * Current page, sent from component parent
   */
  @Input() currentPage: number;

  /**
   * Communication between child component to parent
   */
  @Output() eventChangePage = new EventEmitter();

  /**
   *
  */
  pages: number[];

  selected: string;

  constructor(
    private todoService: TodoService,
    private toastrService: ToastrService) {
  }

  ngOnInit() {
  }

  clean = () => {
    this.pages = [];
  }

  ngOnChanges(): void {
    if (this.totalPages > 0) {
      /* Separar en una función */
      this.pages = Array.from(Array(this.totalPages).keys());
    } else {
      this.clean();
    }

    /**
     * Controls the logic of pagination with respect to removing elements.
     *
     */
    if (this.currentPage > 1 && this.todos.length === 0) {
      this.changePage(this.currentPage - 1);
    }
  }

  /**
   * Event change page, comunication child - parent.
   */
  changePage = (page: number) => {
    this.eventChangePage.emit(page);
  }

  /**
   * Delete element of list
   */
  deleteTodo = (todo: Data) => {
    this.selected = todo._id;
    this.todoService.todoDelete(todo).subscribe({
      next: deleted => {
        this.toastrService.success(deleted.success);
        this.changePage(this.currentPage);
      },
      error: err => {
        const { error } = err;
        this.toastrService.error(error.error);
      }
    });
  }
}

export { TodoListComponent };
