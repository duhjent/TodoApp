import { HttpClient } from "@angular/common/http";
import { Action, State, StateContext } from "@ngxs/store";
import { TodoItem } from "../todo-item";
import { Todo } from "./todo.actions";
import { catchError, tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

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
  constructor(private http: HttpClient) {}

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
      catchError(async (err) => console.log(err))
    );
  }

  @Action(Todo.Add)
  addTodo(ctx: StateContext<TodoListStateModel>, action: Todo.Add) {
    return this.http.post<TodoItem>('/api/todos', action.item).pipe(
      tap(data => {
        const state = ctx.getState();
        ctx.setState({...state, todoList: [...state.todoList, data]});
      }),
      catchError(async (err) => console.log(err))
    );
  }
}