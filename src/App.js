import React, { useState, useEffect } from 'react';
import tasks from '../tasks.json';
import './App.css';

function App() {
  const [task, setTask] = useState(tasks);
  const [tarefas, setTarefas] = useState([]);
  // CRIANDO NOVO ID...
  const randonId = (id) => {
    return Math.floor(Math.random() * id);
  };
  // ADD TASKS E COLOCANDO A ID
  const handleSubmit = (e) => {
    e.preventDefault();

    const dadosJson = {
      id: randonId(99),
      titulo: tarefas,
    };

    const updateTasks = [...task, dadosJson];
    setTask(updateTasks);

    localStorage.setItem('tasks', JSON.stringify(updateTasks));
  };
  // DELETANDO TASKS COM A ID
  const handleremoverTask = (id) => {
    const novatask = task.filter((tas) => tas.id !== id);
    setTask(novatask);
    localStorage.setItem('tasks', JSON.stringify(novatask));
  };

  //VAMOS ALTERAR UMA TASK
  const hadleAlterarTask = (id) => {
    const pront = prompt('qual o valor?');
    const todos = [...task];

    for (var i in todos) {
      if (todos[i].id === id) {
        todos[i].titulo = pront;
      }
    }

    setTask(todos);
    localStorage.setItem('tasks', JSON.stringify(todos));
  };

  useEffect(() => {
    let localstorageTasks = localStorage.getItem('tasks');
    if (localstorageTasks) {
      localstorageTasks = JSON.parse(localstorageTasks);
      setTask(localstorageTasks);
    }
  }, []);

  return (
    <div className="App">
      <form className="App-form" onSubmit={handleSubmit}>
        <label>Digite uma tarefa</label>
        <input
          className="inpText"
          type="text"
          value={tarefas}
          required
          onChange={(e) => setTarefas(e.target.value)}
        />

        <button type="submit">Registrar</button>
      </form>
      <ul>
        {task.map((tas) => (
          <div className="container" key={tas.id}>
            <li>{tas.titulo}</li>
            <button
              className="fechar"
              onClick={() => handleremoverTask(tas.id)}
            >
              fechar
            </button>
            <button className="editar" onClick={() => hadleAlterarTask(tas.id)}>
              Editar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
