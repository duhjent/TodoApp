using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TodoApp.Domain
{
    public class TodoVm : IValidatableObject
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsDone { get; set; }
        public List<string> Tags { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Title == null || Title.Trim() == "")
            {
                yield return new ValidationResult("Title must be specified");
            }

            if (Tags.Contains("") || Tags.Distinct().Count() != Tags.Count)
            {
                yield return new ValidationResult("Tags must be unique and not empty");
            }
        }
    }
}