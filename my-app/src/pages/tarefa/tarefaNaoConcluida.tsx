import { useState, useEffect } from "react";
import { Tarefa } from "../API/API/Models/Tarefa";
import { Link } from "react-router-dom";	

function TarefaListarNaoConcluida() {
  const [tarefa, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    carregarTarefas();
  }, []);

  function carregarTarefas() {
    fetch("http://localhost:5000/tarefas/naoconcluidas").then((resposta) => {
      setTarefas(resposta.data);
    }).catch((erro) => {
      console.log("Erro: " + erro);
    });
  }

  return (
    <div>
      <h1>Lista de tarefas não concluidas</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Titulo</th>
            <th>Descricao</th>
            <th>Status</th>
            <th># - CategoriaId</th>
            <th>Criado Em</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {tarefa.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.status}</td>
              <td>{tarefa.categoriaId}</td>
              <td>{tarefa.criadoEm}</td>
              <td>
                <button type="button"><Link to={`/tarefa/alterar/${tarefa.tarefaId!}`}>Editar</Link></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TarefaListarNaoConcluida;