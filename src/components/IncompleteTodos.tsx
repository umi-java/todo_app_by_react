import { Category, Todo } from "../Todo";

const style = {
  border: "2px solid #aacfd0",
  width: "300px",
  minHeight: "200px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px",
};

interface IncompleteProps {
  todos: Todo[]
  onClickComplete: (index: number, category: Category) => void
  onClickDelete: (index: number, category: Category) => void
  title: string
}

export const IncompleteTodos = (props: IncompleteProps) => {
  const { todos, onClickComplete, onClickDelete, title } = props;
  return (
    <div style={style}>
      <p className="title">{title}</p>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.text}>
            <div className="list-row">
              <p className="todo-item">{todo.text}</p>
              <button onClick={() => onClickComplete(index, todo.category)}>完了</button>
              <button onClick={() => onClickDelete(index, todo.category)}>削除</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
