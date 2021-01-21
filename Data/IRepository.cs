using System.Collections.Generic;
using TodoApp.Domain;

namespace TodoApp.Data
{
    public interface IRepository
    {
        IEnumerable<Todo> FindAll();
        Todo FindById(int id);
        Todo Add(Todo todo);
    }
}