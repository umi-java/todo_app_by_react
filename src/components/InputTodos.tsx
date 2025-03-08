import { ChangeEvent } from "react";
import { Category } from "../Todo";

const style = {
  backgroundColor: "#c6e5d9",
  width: "600px",
  height: "30px",
  padding: "8px",
  margin: "8px",
  borderRadius: "8px",
};

interface InputTodosProps {
  todoText: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClick: (category: Category) => void
  disabled: boolean
}

export const InputTodo = (props: InputTodosProps) => {
  const { todoText, onChange, onClick, disabled } = props;
  return (
    <div style={style}>
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={onChange}
      />
      <button disabled={disabled} onClick={() => { onClick("work") }}>
        お仕事
      </button>
      <button disabled={disabled} onClick={() => { onClick("prv") }}>
        プライベート
      </button>
    </div>
  );
};
