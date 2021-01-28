import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Todo } from '../shared/todo.actions';
import { TodoItem } from '../domain';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() item: TodoItem;
  itemClone: TodoItem;

  newTag = this.fb.control('');

  options: string[] = ['home', 'univerisity', 'anime'];
  filteredOptions: Observable<string[]>;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.itemClone = Object.assign({}, this.item);
    this.itemClone.tags = Object.assign([], this.item.tags);
    this.filteredOptions = this.newTag.valueChanges.pipe(
      startWith(''),
      map(val => this._filter(val))
    );
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
    if (this.newTag.value === '' ||
        this.itemClone.tags.includes(this.newTag.value)) {
      return;
    }
    this.itemClone.tags.push(this.newTag.value);
    this.updateItem();
  }

  private _filter(val: string): string[] {
    let filterVal = val.toLowerCase();

    return this.options.filter(o => o.toLowerCase().includes(filterVal));
  }

}
