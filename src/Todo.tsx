import { ChangeEvent, useState } from "react"
import "./styles.css"
import { InputTodo } from "./components/InputTodos"
import { IncompleteTodos } from "./components/IncompleteTodos"
import { CompleteTodos } from "./components/CompleteTodos"

export type Category = "work" | "prv"

export type Todo = {
  text: string
  category: Category
}

export const Todo = () => {

  const [todoText, setTodoText] = useState<string>("")
  const [incompleteTodos, setInCompleteTodos] = useState<Todo[]>([])
  const [completeTodos, setCompleteTodos] = useState<Todo[]>([])


  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => setTodoText(event.target.value);

  const onClickAdd = (category: Category) => {
    if (todoText === "") return;
    const newTodo: Todo = { text: todoText, category: category }
    setInCompleteTodos([...incompleteTodos, newTodo])
    setTodoText("")
  }

  const onClickDeleteForWork = (index: number, category: Category) => {
    // const newTodos = [...incompleteTodos];
    // newTodos.splice(index, 1);
    const targetTodos = incompleteTodos.filter((todo) => todo.category === category)
    const targetTodo = targetTodos[index]

    const newTodos = [...incompleteTodos].filter((todo) => todo !== targetTodo)
    setInCompleteTodos(newTodos);
  }

  const onClickComplete = (index: number, category: Category) => {
    // const newIncompleteTodos = [...incompleteTodos];
    // newIncompleteTodos.splice(index, 1);
    const targetTodos = incompleteTodos.filter((todo) => todo.category === category)
    const targetTodo = targetTodos[index]

    const newIncompleteTodos = [...incompleteTodos].filter((todo) => todo !== targetTodo)
    const newCompleteTodos = [...completeTodos, targetTodo];
    setInCompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index: number, category: Category) => {
    // const newCompleteTodos = [...completeTodos];
    // newCompleteTodos.splice(index, 1);
    const targetTodos = completeTodos.filter((todo) => todo.category === category)
    const targetTodo = targetTodos[index]

    const newCompleteTodos = [...completeTodos].filter((todo) => todo !== targetTodo)
    const newIncompleteTodos = [...incompleteTodos, targetTodo];
    setCompleteTodos(newCompleteTodos);
    setInCompleteTodos(newIncompleteTodos);
  };

  const onDeleteAllCompleteTodos = () => {
    if (confirm("全ての完了TODOを一括削除しても大丈夫？"))
      setCompleteTodos([])
  }

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 10

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={isMaxLimitIncompleteTodos}
      />
      {isMaxLimitIncompleteTodos && (
        <p style={{ color: "red" }}>
          登録できるTODOは10個まで。はやく消化してね〜。
        </p>
      )}

      <div className="list-row">
        <IncompleteTodos
          todos={incompleteTodos.filter((todo) => todo.category === "work")}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDeleteForWork}
          title="お仕事 TODO"
        />
        <IncompleteTodos
          todos={incompleteTodos.filter((todo) => todo.category === "prv")}
          onClickComplete={onClickComplete}
          onClickDelete={onClickDeleteForWork}
          title="プライベート TODO"
        />
      </div>
      <div className="list-row">
        <CompleteTodos
          todos={completeTodos.filter((todo) => todo.category === "work")}
          onClick={onClickBack}
          title="お仕事 完了TODO" />
        <CompleteTodos
          todos={completeTodos.filter((todo) => todo.category === "prv")}
          onClick={onClickBack}
          title="プライベート 完了TODO" />
      </div>
      <button
        onClick={onDeleteAllCompleteTodos}
        disabled={completeTodos.length < 1}>完了TODO 一括削除</button>
    </>
  )


}