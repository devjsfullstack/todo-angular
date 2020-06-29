import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../../services/todo.services';
import { Todos, Data, Todo } from '../../models/todos.interface';

@Component({
  selector: 'todo-component',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

class TodoComponent implements OnInit {

  @ViewChild('todoInput', { static: false }) todoInput: ElementRef;

  /**
   * Object pagination
   * Receive the service payload
   */
  todos: Data[];
  currentPage: number;
  totalPages: number;

  /* Page (skip) and limit of objects per pages. Params services pagination */
  skip: number = 1;
  limit: number = 5;

  /* Validation utilities */
  todo: Todo = {};
  isValid: boolean = false;
  regex: RegExp = /^[a-zA-ZáéíóúAÉÍÓÚÑñ\s]+$/;

  constructor(
    private todoService: TodoService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.getTodos();
  }

  /**
   * Clean input element and reset utilities validation
   */
  clean = () => {
    this.todo = {};
    this.isValid = false;
    this.todoInput.nativeElement.value = '';
  }

  cleanPagination = () => {
    this.totalPages = 0;
    this.currentPage = 1;
    this.todos = [];
  }

  /**
   * Event input, perform validation of entered data
   */
  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      const value = event.target.value;
      if (!value) {
        this.todo['error'] = {required: `Campo requerido.`};
      } else if (!this.regex.test(value)) {
        this.todo['error'] = {invalid: `Solo caracteres de la A a la Z.`};
      } else {
        this.isValid = true;
        delete this.todo['error'];
        this.todo['name'] = value;
        this.todoService.todoCreate(this.todo).subscribe({
          next: this.beCreated.bind(this),
          error: this.hasError.bind(this)
        });
      }
    }
  }

  /* Callback success service create */
  beCreated = (created) => {
    this.clean();
    this.toastrService.success(created.success);
    this.getPage(this.currentPage); /* Mantiene la pagina actual, al agregar un nuevo elemento */
  }

  /* Callback error service create */
  hasError = (err) => {
    this.clean();
    const { error } = err;
    this.toastrService.error(error.error);
  }

  /* Service pgination */
  getTodos = () => {
    this.todoService.todoPagination(this.skip, this.limit).subscribe({
      next: (todos: Todos) => {
        this.cleanPagination();
        this.totalPages = todos.pages;
        this.currentPage = todos.current;
        this.todos = todos.doc as Data[];
      },
      error: err => {
        const { error } = err;
        this.toastrService.error(error.error);
      }
    });
  }

  /* EventEmitter fo child component, change page */
  getPage = (page: number) => {
    this.todoService.todoPagination(page, this.limit).subscribe({
      next: (todos: Todos) => {
        this.cleanPagination();
        this.totalPages = todos.pages;
        this.currentPage = todos.current;
        this.todos = todos.doc as Data[];
      },
      error: err => {
        const { error } = err;
        this.toastrService.error(error.error);
      }
    });
  }

}

export { TodoComponent };
