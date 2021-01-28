using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using TodoApp.Domain;
using TodoApp.Exceptions;

namespace TodoApp.Data
{
    public class EfCoreRepository : IRepository
    {
        private readonly AppDbContext _ctx;

        public EfCoreRepository(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public TodoVm Add(TodoVm todo)
        {
            var newTodo = new Todo
            {
                Title = todo.Title,
                IsDone = todo.IsDone
            };

            var tagsInDb = _ctx.Tags.Select(t => t.Id).ToHashSet();
            var tagsToAdd = todo.Tags.Where(t => !tagsInDb.Contains(t)).Select(t => new Tag { Id = t }).ToList();

            _ctx.AddRange(tagsToAdd);

            newTodo.Tags = todo.Tags.Select(tag => new TodoTag
            {
                TagId = tag,
                Todo = newTodo
            }).ToList();

            _ctx.Add(newTodo);

            _ctx.SaveChanges();

            todo.Id = newTodo.Id;

            return todo;
        }

        public List<TodoVm> FindAll()
        {
            return _ctx.Todos.Select(t => new TodoVm
            {
                Id = t.Id,
                Title = t.Title,
                IsDone = t.IsDone,
                Tags = t.Tags.Select(tag => tag.TagId).ToList()
            }).ToList();
        }

        public TodoVm FindById(int id)
        {
            var item = _ctx.Todos
            .Where(t => t.Id == id)
            .Select(t => new TodoVm
            {
                Id = t.Id,
                Title = t.Title,
                IsDone = t.IsDone,
                Tags = t.Tags.Select(tag => tag.TagId).ToList()
            })
            .FirstOrDefault();
            if (item == null)
            {
                throw new ItemNotFoundException();
            }
            return item;
        }

        public TodoVm Update(TodoVm todo)
        {
            var found = _ctx.Todos.Include(t => t.Tags).Where(t => t.Id == todo.Id).FirstOrDefault();

            if (found == null)
            {
                throw new ItemNotFoundException();
            }

            found.Title = todo.Title;
            found.IsDone = todo.IsDone;

            UpdateTags(found, todo);

            _ctx.Update(found);
            _ctx.SaveChanges();

            return todo;
        }

        public void Delete(int id)
        {
            var found = _ctx.Todos.Include(t => t.Tags).FirstOrDefault(t => t.Id == id);
            if(found == null) {
                throw new ItemNotFoundException();
            }

            var potentialTagsToDelete = _ctx.Tags.Include(t => t.Todos)
                .Where(t => t.Todos.Count == 1)
                .ToList();

            var tagsToDelete = potentialTagsToDelete.Where(t => found.Tags.Any(tt => tt.TagId == t.Id)).ToList();

            _ctx.RemoveRange(tagsToDelete);
            _ctx.Remove(found);

            _ctx.SaveChanges();
        }

        public List<TagVm> GetAllTags()
        {
            var tagList = _ctx.Tags
                .Include(t => t.Todos)
                    .ThenInclude(tt => tt.Todo)
                .Select(t => new TagVm
                {
                    Name = t.Id,
                    Todos = t.Todos.Select(todo => new TodoVm
                    {
                        Id = todo.Todo.Id,
                        Title = todo.Todo.Title,
                        IsDone = todo.Todo.IsDone,
                    }).ToList()
                }).ToList();

            return tagList;
        }

        private void UpdateTags(Todo todo, TodoVm newTodo)
        {
            var tagsInDb = _ctx.Tags.ToHashSet();
            var tagsToAdd = newTodo.Tags.Where(t => !tagsInDb.Any(tag => tag.Id == t)).Select(t => new Tag { Id = t }).ToList();

            var tagsToDelete = tagsInDb
                .Where(t => !newTodo.Tags.Contains(t.Id) 
                    && _ctx.TodoTags.Where(tt => tt.TagId == t.Id).Count() == 1)
                .ToList();

            _ctx.AddRange(tagsToAdd);
            _ctx.RemoveRange(tagsToDelete);

            todo.Tags = newTodo.Tags.Select(tag => new TodoTag
            {
                TagId = tag,
                TodoId = todo.Id
            }).ToList();
        }
    }
}