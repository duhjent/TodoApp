import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Todo } from '../shared/todo.actions';
import { TodoItem } from '../todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Select(state => state.todos.todoList) public todoList$: Observable<TodoItem[]>;
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new Todo.FetchAll);
  }

}
