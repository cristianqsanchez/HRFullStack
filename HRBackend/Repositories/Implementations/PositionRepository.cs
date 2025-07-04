using HRBackend.Data;
using HRBackend.Models;
using HRBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRBackend.Repositories.Implementations
{
    public class PositionRepository : IPositionRepository
    {
        private readonly AppDbContext _context;

        public PositionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> List()
        {
            return await _context.Positions
                .ToListAsync();
        }
        public async Task<Position?> GetById(int id)
        {
            return await _context.Positions
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Position> Create(Position position)
        {
            _context.Positions.Add(position);
            await _context.SaveChangesAsync();
            return position;
        }

        public async Task Update(Position position)
        {
            _context.Entry(position).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var position = await _context.Positions.FindAsync(id);
            if (position != null)
            {
                _context.Positions.Remove(position);
                await _context.SaveChangesAsync();
            }
        }
    }
}
