import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Todo } from '../shared/todo.actions';
import { TodoItem } from '../todo-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item: TodoItem;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  deleteItem() {
    this.store.dispatch(new Todo.Delete(this.item.id));
  }

  updateItem() {
    this.store.dispatch(new Todo.Edit(this.item));
  }

}
