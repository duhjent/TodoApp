import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validator, Validators } from "@angular/forms";
import { Store } from '@ngxs/store';
import { Todo } from '../shared/todo.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [
        Validators.required
      ]],
      tags: []
    });
  }

  submitForm(): void {
    console.log(this.form.value);
    this.store.dispatch(new Todo.Add({isDone: false, title: this.form.value.title, tags: []}));
    this.form.reset();
  }

}
