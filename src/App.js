import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state: 'all', 'active', 'completed'

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTask = { text: newTodo, completed: false };
      setTodos([...todos, newTask]);
      setNewTodo('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const saveEdit = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText('');
  };

  // Filter tasks based on the current filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' shows all tasks
  });

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            {
              editingIndex === index ? (
                <>
                  <input
                  style={{flex: '1'}}
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <div style={{ flex: '1', textAlign: 'right', minWidth: '130px'}}>
                    <button onClick={() => saveEdit(index)}>Save</button>
                  </div>
                </>
              ) : (
                <>
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => toggleComplete(index)} 
                  />
                  <span 
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                  >
                    {todo.text}
                  </span>
                  <div style={{ flex: '1', textAlign: 'right', minWidth: '130px'}}>
                    <button onClick={() => startEditing(index)}>Edit</button>
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                  </div>
                </>
              )
            }
          </li>
        ))}
      </ul>

      {/* Footer with filter buttons */}
      <footer className="footer">
        <button 
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </footer>
    </div>
  );
}

export default App;
