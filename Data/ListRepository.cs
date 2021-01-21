using System.Collections.Generic;
using System.Linq;
using TodoApp.Domain;
using TodoApp.Exceptions;

namespace TodoApp.Data
{
    public class ListRepository : IRepository
    {
        private List<Todo> _list;

        public ListRepository()
        {
            _list = new List<Todo>();
            _list.Add(new Todo { Id = 1, Body = "testBody", Title = "testTitle" });
        }

        public Todo Add(Todo todo)
        {
            todo.Id = GenerateId();
            _list.Add(todo);
            return todo;
        }

        public IEnumerable<Todo> FindAll()
        {
            return _list.AsReadOnly();
        }

        public Todo FindById(int id)
        {
            var found = _list.Find(t => t.Id == id);
            if (found == null)
            {
                throw new ItemNotFoundException();
            }
            return found;
        }

        public Todo Update(Todo todo)
        {
            var found = _list.Find(t => t.Id == todo.Id);
            if(found == null)
            {
                throw new ItemNotFoundException();
            }
            found.Title = todo.Title ?? found.Title;
            found.Body = todo.Body ?? found.Body;
            return found;
        }

        private int GenerateId()
        {
            return _list.Count == 0 ? 1 : _list.Max(t => t.Id) + 1;
        }
    }
}