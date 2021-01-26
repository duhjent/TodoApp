import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>('/api/todos');
  }

  getById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`/api/todos/${id}`);
  }
}
