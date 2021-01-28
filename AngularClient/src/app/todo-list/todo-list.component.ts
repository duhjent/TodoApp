import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Todo } from '../shared/todo.actions';
import { TodoListStateModel } from '../shared/todo.state';
import { TodoItem } from '../todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Select(state => state.todos.todoList) public todoList$: Observable<TodoItem[]>;
  
  constructor(private service: TodoService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new Todo.FetchAll);
  }

}
