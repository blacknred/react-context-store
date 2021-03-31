import { Observable } from "../../core";

export interface Todo {
  readonly text: string;
  readonly completed: boolean;
}

export enum VisibilityFilter {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE
}

export class TodoService {
  readonly todos = new Observable<Todo[]>([]);
  readonly visibilityFilter = new Observable(VisibilityFilter.SHOW_ALL);

  addTodo(text: string) {
    this.todos.set([...this.todos.get(), { text, completed: false }]);
  }

  toggleTodo(index: number) {
    this.todos.set(
      this.todos
        .get()
        .map((todo, i) =>
          i === index ? { text: todo.text, completed: !todo.completed } : todo
        )
    );
  }

  setVisibilityFilter(filter: VisibilityFilter) {
    this.visibilityFilter.set(filter);
  }
}
