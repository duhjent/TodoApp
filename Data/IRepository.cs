using System.Collections.Generic;
using TodoApp.Domain;

namespace TodoApp.Data
{
    public interface IRepository
    {
        List<TodoVm> FindAll();
        TodoVm FindById(int id);
        TodoVm Add(TodoVm todo);
        TodoVm Update(TodoVm todo);
        void Delete(int id);
        List<TagVm> GetAllTags();
    }
}