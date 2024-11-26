using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5008/api/categoria/listar
app.MapGet("/api/models/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5008/api/categoria/cadastrar
app.MapPost("/api/models/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5008/api/tarefas/listar
app.MapGet("/api/models/tarefa/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Tarefa não encontrada");
});

//POST: http://localhost:5008/api/tarefas/cadastrar
app.MapPost("/api/models/tarefa/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

/*

 ALTERAR TAREFA

*/

//GET: http://localhost:5008/tarefas/naoconcluidas
app.MapGet("/api/models/tarefa/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
  if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(t => t.Categoria).Where(x => x.Status != "Concluída").ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//GET: http://localhost:5008/tarefas/concluidas
app.MapGet("/api/tarefa/concluidas", ([FromServices] AppDataContext ctx) =>
{
 if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(t => t.Categoria).Where(x => x.Status == "Concluída").ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

app.UseCors("AcessoTotal");
app.Run();
