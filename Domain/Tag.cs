using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TodoApp.Domain
{
    public class Tag
    {
        public string Id { get; set; }
        public ICollection<TodoTag> Todos { get; set; }
    }
}