import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repos, setRepos ] = useState([]);

  useEffect( loadRepos, [] );

  function loadRepos(){
    api.get('/repositories').then(response => {
      setRepos(response.data);
    });
  }
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', { title: `Novo Repositório ${Date.now()}` });
    const repo = response.data;
    setRepos( [...repos, repo] );
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);        
    const new_repo = repos.filter( repo => repo.id !== id);
    setRepos(new_repo);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map( (repo, index ) => ( 
        <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
