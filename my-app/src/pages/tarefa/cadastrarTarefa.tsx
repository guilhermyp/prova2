import { Tarefa } from "../API/API/Models/Tarefa";
import { useState } from "react";

    function CadastrarTarefa() {
      const [titulo, setTitulo] = useState("");
      const [descricao, setDescricao] = useState("");
      const [status, setStatus] = useState("");
      const [categoriaId, setCategoriaId] = useState("");

      function CadastrarTarefa(e : any) {
        e.preventDefault();
        const tarefa = {
            titulo: titulo,
            descricao: descricao,
            status: "Não iniciada",
            categoriaId: categoriaId,
        };


        fetch("http://localhost:5008/api/produto/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarefa),
        })
          .then((resposta) => resposta.json())
          .then((tarefa) => {
            console.log(tarefa);
          });
      }


  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form onSubmit={CadastrarTarefa}>
        <div>
          <label>Titulo:</label>
          <input type="text" placeholder="Digite a tarefa" onChange={(e) => setTitulo(e.target.value)} required/>
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text" placeholder="Digite a descricao da tarefa" onChange={(e) => setDescricao(e.target.value)}/>
        </div>
        <div>
          <label>CategoriaId</label>
          <input type="text" onChange={(e) => setCategoriaId(e.target.value)}required/>
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarTarefa;