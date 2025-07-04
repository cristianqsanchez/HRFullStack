using HRBackend.Models;
using HRBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HRBackend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PositionsController : ControllerBase
{
    private readonly IPositionRepository _positionRepository;

    public PositionsController(IPositionRepository positionRepository)
    {
        _positionRepository = positionRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Position>>> GetPosition()
    {
        var positions = await _positionRepository.List();
        return Ok(positions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Position>> GetPosition(int id)
    {
        var position = await _positionRepository.GetById(id);
        if (position == null)
            return NotFound();

        return Ok(position);
    }

    [HttpPost]
    public async Task<ActionResult<Position>> PostPosition(Position position)
    {
        var created = await _positionRepository.Create(position);
        return CreatedAtAction(nameof(GetPosition), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPosition(int id, Position position)
    {
        if (id != position.Id)
            return BadRequest();

        await _positionRepository.Update(position);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePosition(int id)
    {
        await _positionRepository.Delete(id);
        return NoContent();
    }
}