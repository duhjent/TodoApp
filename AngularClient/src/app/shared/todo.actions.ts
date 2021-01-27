import { TodoItem } from "../todo-item";

export namespace Todo {
  export class FetchAll {
    static readonly type = '[Todo] Fetch All';
  }

  export class Add {
    static readonly type = '[Todo] Add';
    constructor(public item: TodoItem) { }
  }

  export class MarkAsDone {
    static readonly type = '[Todo] Mark As Read';
    constructor(public id: number) { }
  }

  export class Delete {
    static readonly type = '[Todo] Delete';
    constructor(public id: number) { }
  }

  export class Edit {
    static readonly type = '[Todo] edit';
    constructor(public item: TodoItem) { }
  }
}