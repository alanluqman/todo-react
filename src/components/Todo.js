import { useState, useRef } from 'react';
import './todo.css';

function Header() {
  return <h1 className="header">To Do list</h1>;
}

function Todo() {
  const [state, setState] = useState({ items: [] });
  const inputRef = useRef(null);

  function add() {
    if (inputRef.current.value.trim() !== '') {
      setState(
        {
          items: [...state.items, {
            task: `${inputRef.current.value}`,
            complete: false,
            id: `${inputRef.current.value}${state.items.length}`,
          }],
        },
      );
      inputRef.current.value = '';
    } else inputRef.current.value = '';
  }

  function deleteBtn(task) {
    const newTasks = state.items.filter((t) => t.id !== task.id);
    setState({ items: newTasks });
  }

  function checked(task) {
    const taskList = state.items;
    const index = taskList.indexOf(task);
    taskList[index].complete = !taskList[index].complete;
    setState({ items: taskList });
  }
  return (
    <>
      <div className="todo-container">
        <Header />
        <div className="input">
          <input type="text" ref={inputRef} className="input-field" placeholder="New Task ..." />
          <button type="button" onClick={add} className="addBtn">
            <i className="fa fa-plus" />
          </button>
        </div>
        <div>
          <ul className="list">
            {
                state.items.map((item) => (
                  <li key={item.id} className="list-item">
                    <input type="checkbox" onChange={() => checked(item)} />
                    <p className={`item-title ${(item.complete) ? 'done' : ''}`}>{item.task}</p>
                    <button type="button" onClick={() => deleteBtn(item)} className="deleteBtn">
                      <i className="fa fa-trash" />
                    </button>
                  </li>
                ))
              }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todo;
