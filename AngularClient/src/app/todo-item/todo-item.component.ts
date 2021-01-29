import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
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

  editing: boolean = false;

  @Select(state => state.todos.todoList) public todoList$: Observable<TodoItem[]>;
  tagHints: string[];
  filteredHints: Observable<string[]>;

  newTag = this.fb.control('');

  @Output() updateTagFilter = new EventEmitter<string>();

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.itemClone = Object.assign({}, this.item);
    this.itemClone.tags = Object.assign([], this.item.tags);

    this.todoList$
      .subscribe(vals => this.tagHints = vals.map(t => t.tags) // choose tags of each todo item
                                              .reduce((accumulator, value) => accumulator.concat(value), []) // flatten the array
                                              .filter((v, i, a) => a.indexOf(v) === i) // choose unique only
                                              .filter(v => !this.itemClone.tags.includes(v))); // filter tags that are already added

    this.filteredHints = this.newTag.valueChanges.pipe(
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

  addToFilter(tag: string) {
    this.updateTagFilter.emit(tag);
  }

  private _filter(val: string): string[] {
    let filterVal = val.toLowerCase();

    return this.tagHints.filter(o => o.toLowerCase().includes(filterVal));
  }

}
