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
  itemClone: TodoItem;

  newTag: string = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.itemClone = Object.assign({}, this.item);
    this.itemClone.tags = Object.assign([], this.item.tags);
  }

  deleteItem() {
    this.store.dispatch(new Todo.Delete(this.itemClone.id));
  }

  updateItem() {
    this.store.dispatch(new Todo.Edit(this.itemClone));
  }

  deleteTag(tag: string) {
    this.itemClone.tags = this.itemClone.tags.filter(t => t !== tag);
    this.updateItem();
  }

  addTag() {
    if(this.newTag === '') {
      return;
    }
    this.itemClone.tags.push(this.newTag);
    this.updateItem();
  }

}
