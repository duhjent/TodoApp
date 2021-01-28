import { HttpClient } from "@angular/common/http";
import { Action, State, StateContext } from "@ngxs/store";
import { TodoItem } from "../todo-item";
import { Todo } from "./todo.actions";
import { catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

export interface TodoListStateModel {
  todoList: TodoItem[];
}

@State<TodoListStateModel>({
  name: 'todos',
  defaults: {
    todoList: []
  }
})
@Injectable()
export class TodoListState {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  @Action(Todo.FetchAll)
  fetchTodos(ctx: StateContext<TodoListStateModel>) {
    return this.http.get<TodoItem[]>('/api/todos').pipe(
      tap(data => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          todoList: data
        });
      }),
      catchError(async (err) => 
      {
        console.log(err);
        this.snackBar.open('Error fetching todos', 'OK', {
          duration: 1000
        });
      })
    );
  }

  @Action(Todo.Add)
  addTodo(ctx: StateContext<TodoListStateModel>, action: Todo.Add) {
    return this.http.post<TodoItem>('/api/todos', action.item).pipe(
      tap(data => {
        const state = ctx.getState();
        ctx.setState({...state, todoList: [...state.todoList, data]});
      }),
      catchError(async (err) => {
        console.log(err);
        this.snackBar.open('Error adding todo', 'OK', {
          duration: 1000
        })
      })
    );
  }

  @Action(Todo.Edit)
  editTodo(ctx: StateContext<TodoListStateModel>, action: Todo.Edit) {
    return this.http.put<TodoItem>('/api/todos', action.item).pipe(
      tap(data => {
        const state = ctx.getState();
        let exceptChosen = state.todoList.filter(t => t.id !== action.item.id);
        ctx.setState({...state, todoList: [...exceptChosen, data]});
      }),
      catchError(async (err) => {
        console.log(err);
        this.snackBar.open('Error updating todo', 'OK', {
          duration: 1000
        })
      })
    );
  }

  @Action(Todo.Delete)
  deleteTodo(ctx: StateContext<TodoListStateModel>, action: Todo.Delete) {
    return this.http.delete(`/api/todos/${action.id}`).pipe(
      tap(data => {
        const state = ctx.getState();
        ctx.setState({...state, todoList: [...state.todoList.filter(t => t.id != action.id)]});
      }),
      catchError(async (err) => {
        console.log(err);
        this.snackBar.open('Error deleting todo', 'OK', {
          duration: 1000
        })
      })
    );
  }
}