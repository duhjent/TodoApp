export interface TodoItem {
    id?: number;
    title: string;
    isDone: boolean;
    tags: string[];
}

export interface Tag {
    name: string;
    todos: TodoItem[];
}