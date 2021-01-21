using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Data;
using TodoApp.Domain;
using TodoApp.Exceptions;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly IRepository _repo;

        public TodosController(IRepository repository)
        {
            _repo = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Todo>> GetAll() => Ok(_repo.FindAll());

        [HttpGet("{id}")]
        public ActionResult<Todo> GetById(int id)
        {
            try
            {
                return Ok(_repo.FindById(id));
            }
            catch (ItemNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult<Todo> Create(Todo todo) => Ok(_repo.Add(todo));

        [HttpPut]
        public ActionResult<Todo> ChangeItem(Todo todo)
        {
            try
            {
                return _repo.Update(todo);
            }
            catch (ItemNotFoundException)
            {
                return NotFound();
            }
        }
    }
}