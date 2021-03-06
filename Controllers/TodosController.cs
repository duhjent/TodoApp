using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Data;
using TodoApp.Domain;
using TodoApp.Exceptions;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly IRepository _repo;

        public TodosController(IRepository repository)
        {
            _repo = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TodoVm>> GetAll() => Ok(_repo.FindAll());

        [HttpGet("{id}")]
        public ActionResult<TodoVm> GetById(int id)
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
        public ActionResult<Todo> Create(TodoVm todo) => Ok(_repo.Add(todo));

        [HttpPut]
        public ActionResult<TodoVm> ChangeItem(TodoVm todo)
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

        [HttpDelete("{id}")]
        public ActionResult DeleteItem(int id) {
            try {
                _repo.Delete(id);
            } catch(ItemNotFoundException) {
                return NotFound();
            }
            return Ok();
        }
    }
}