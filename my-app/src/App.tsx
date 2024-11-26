//1 - Um componente SEMPRE deve começar com a primeira letra maiúscula 
//2 - Todo componente DEVE ser uma função do JS 
//3 - Todo deve retornar apenas UM elemento HTML function App() { return ( <div> <h1>Projeto base em React com TypeScript</h1> </div> ); } 
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado export default App;

import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TarefaCadastrar from './pages/tarefa/cadastrarTarefa';
import TarefaListar from './pages/tarefa/listarTarefa';
import TarefaListarConcluida from './pages/tarefa/tarefaConcluida';
import TarefaListarNaoConcluida from './pages/tarefa/tarefaNaoConcluida';
import TarefaEditar from './pages/tarefa/editarTarefa';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
            <Link to="/">Inicio</Link>
            </li>
            <li>
            <Link to="/tarefa/cadastrarTarefa">Cadastrar Tarefa</Link>
            </li>
            <li>
            <Link to="/tarefa/listaTarefa">Listar Tarefas</Link>
            </li>
            <li>
            <Link to="/tarefa/listar/tarefaConcluida">Listar Tarefas Concluidas</Link>
            </li>
            <li>
            <Link to="/tarefa/listar/tarefaNaoConcluida">Listar Tarefas Não Concluidas</Link>
            <li>
            <Route path="tarefa/listar/editarTarefa">Editar Tarefa</Route>
            </li>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TarefaListar/>}></Route>
          <Route path="/tarefa/cadastrarTarefa" element={<TarefaCadastrar/>}></Route>
          <Route path="/tarefa/listarTarefa" element={<TarefaListar/>}></Route>
          <Route path="/tarefa/listar/Tarefaconcluida" element={<TarefaListarConcluida/>}></Route>
          <Route path="/tarefa/listar/TafefaNaoConcluida" element={<TarefaListarNaoConcluida/>}></Route>
          <Route path={"/tarefa/alterar/:tarefaId" }element={<TarefaEditar/>}></Route>
        </Routes>
        <footer>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;