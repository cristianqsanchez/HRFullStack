using HRBackend.Models;

namespace HRBackend.Repositories.Interfaces
{
    public interface IPositionRepository
    {
        Task<IEnumerable<Position>> List();
        Task<Position?> GetById(int id);
        Task<Position> Create(Position position);
        Task Update(Position position);
        Task Delete(int id);
    }
}
