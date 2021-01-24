using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Data;
using TodoApp.Domain;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly IRepository _repo;

        public TagsController(IRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TagVm>> GetAll() => Ok(_repo.GetAllTags());
    }
}