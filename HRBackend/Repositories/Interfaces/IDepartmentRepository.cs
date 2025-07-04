using HRBackend.Models;

namespace HRBackend.Repositories.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> List();
        Task<Department?> GetById(int id);
        Task<Department> Create(Department department);
        Task Update(Department department);
        Task Delete(int id);
    }
}
