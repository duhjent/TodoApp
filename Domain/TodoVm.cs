using System.Collections.Generic;

namespace TodoApp.Domain
{
    public class TodoVm
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsDone { get; set; }
        public List<string> Tags { get; set; }
    }
}