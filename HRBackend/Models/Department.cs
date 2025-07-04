using System.ComponentModel.DataAnnotations;

namespace HRBackend.Models
{
    public class Department
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string Ubication { get; set; } = string.Empty;

        public ICollection<Employee>? Employees { get; set; }

    }
}
