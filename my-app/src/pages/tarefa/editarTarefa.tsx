import { Tarefa } from "../API/API/Models/Tarefa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EditarTarefa() {
  const { tarefaId } = useParams<{ tarefaId: string }>();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [status, setStatus] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  useEffect(() => {
    if (tarefaId) {
      patch(`http://localhost:5000/tarefas/buscar/${tarefaId}`)
        .then((response) => {
          console.log(response.data);
          const tarefa = response.data;
          setTitulo(tarefa.titulo);
          setDescricao(tarefa.descricao);
          setCategoriaId(tarefa.categoriaId);
          setStatus(tarefa.status);
        });
    }
  }, []);

  function editarTarefa(e: any) {
    e.preventDefault();
    const tarefa = {
      titulo: titulo,
      descricao: descricao,
      status: status,
      categoriaId: categoriaId,
    };
    axios.put(`http://localhost:5008/tarefas/alterar/${tarefaId}`, tarefa);
  }

  return (
    <div>
      <h1>Editar Tarefa</h1>

      <form onSubmit={editarTarefa}>
        <div>
          <label>Titulo:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div>
          <label>CategoriaId:</label>
          <input type="text" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required />
        </div>
        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}
export default EditarTarefa;
