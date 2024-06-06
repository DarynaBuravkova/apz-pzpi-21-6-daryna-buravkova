using AutoMapper;
using BeanBlissAPI.DTO;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeanBlissAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineParametrController : ControllerBase
    {
        private readonly IMachineParametreRepository _parametreRepository;
        private readonly IMapper _mapper;

        public MachineParametrController(IMachineParametreRepository parametreRepository,
            IMapper mapper)
        {
            _parametreRepository = parametreRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(MachineParametre))]
        [ProducesResponseType(400)]
        public IActionResult GetMachineParametr(int machineId)
        {
            var status = _mapper.Map<MachineParametreDto>(
                _parametreRepository.GetMachineParametre(machineId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(status);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateMachineParametr(int machineId,
            [FromBody] MachineParametreDto updatedMachineParametre)
        {
            if (updatedMachineParametre == null)
                return BadRequest(ModelState);

            if (machineId != updatedMachineParametre.Id)
                return BadRequest(ModelState);

            if (!_parametreRepository.MachineParametreExists(machineId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var existingMachineParametr = _parametreRepository.GetMachineParametre(machineId);

            if (existingMachineParametr == null)
                return NotFound();

            existingMachineParametr.Temperature = updatedMachineParametre.Temperature;
            existingMachineParametr.Strength = updatedMachineParametre.Strength;
            existingMachineParametr.Volume = updatedMachineParametre.Volume;

            if (!_parametreRepository.UpdateMachineParametre(existingMachineParametr))
            {
                ModelState.AddModelError("", "Something went wrong updating car status");
                return StatusCode(500, ModelState);
            }

            return Ok("Changed");
        }
    }
}
