using System.ComponentModel.DataAnnotations;

namespace HRBackend.Models
{
    public class Position
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public ICollection<Employee>? Employees { get; set; }
    }
}
