import { Category, Todo } from "../Todo";

const style = {
  border: "2px solid #aacfd0",
  width: "300px",
  minHeight: "200px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px",
  backgroundColor: "#c9dede",
};


interface CompleteTodosProps {
  todos: Todo[]
  onClick: (index: number, category: Category) => void
  title: string
}

export const CompleteTodos = (props: CompleteTodosProps) => {
  const { todos, onClick, title } = props
  return (
    <div style={style}>
      <p className="title">{title}</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.text}>
            <div className="list-row">
              <p className="todo-item">{todo.text}</p>
              <button onClick={() => onClick(index, todo.category)}>戻す</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
