import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { TodoItem } from '../todo-item';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  items: TodoItem[];
  
  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.items = data;
    });
  }

}
