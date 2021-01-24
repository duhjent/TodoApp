using System.Collections.Generic;

namespace TodoApp.Domain
{
    public class TagVm
    {
        public string Name { get; set; }
        public List<TodoVm> Todos { get; set; }
    }
}