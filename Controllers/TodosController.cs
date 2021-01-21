using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Data;
using TodoApp.Domain;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController: ControllerBase
    {
        private readonly IRepository _repo;

        public TodosController(IRepository repository)
        {
            _repo = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> GetAll() => Ok(_repo.FindAll());

        [HttpGet("{id}")]
        public ActionResult<Todo> GetById(int id) => Ok(_repo.FindById(id));

        [HttpPost]
        public ActionResult<Todo> Create(Todo todo) => Ok(_repo.Add(todo));
    }
}