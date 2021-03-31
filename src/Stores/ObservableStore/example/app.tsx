import React, { FC } from "react";
import { useObservable } from "./core";
import { todoService } from "./example/services";
import { Todo, VisibilityFilter } from "./example/services/TodoService";

export const TodoList: FC<{}> = () => {
  const todos = useObservable<Todo[]>(todoService.todos);
  const filter = useObservable<VisibilityFilter>(todoService.visibilityFilter);
  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <div>
      <ul>
        {visibleTodos.map((todo, index) => (
          <TodoItem key={index} todo={todo} index={index} />
        ))}
      </ul>
      <p>
        Show: <FilterLink filter={VisibilityFilter.SHOW_ALL}>All</FilterLink>,
                <FilterLink filter={VisibilityFilter.SHOW_ACTIVE}>Active</FilterLink>,
                <FilterLink filter={VisibilityFilter.SHOW_ALL}>Completed</FilterLink>
      </p>
    </div>
  );
};

const TodoItem = ({ todo: { text, completed }, index }: { todo: Todo; index: number }) => {
  return (
    <li
      style={{ textDecoration: completed ? "line-through" : "none" }}
      onClick={() => todoService.toggleTodo(index)}
    >
      {text}
    </li>
  );
};

const FilterLink = ({ filter, children }: { filter: VisibilityFilter; children: React.ReactNode }) => {
  const activeFilter = useObservable(todoService.visibilityFilter);
  const active = filter === activeFilter;
  return active ? (
    <span>{children}</span>
  ) : (
    <a href="" onClick={() => todoService.setVisibilityFilter(filter)}>
      {children}
    </a>
  );
};

function getVisibleTodos(todos: Todo[], filter: VisibilityFilter): Todo[] {
  switch (filter) {
    case VisibilityFilter.SHOW_ALL:
      return todos;
    case VisibilityFilter.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilter.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
  }
}