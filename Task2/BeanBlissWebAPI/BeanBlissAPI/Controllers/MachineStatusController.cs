using AutoMapper;
using BeanBlissAPI.DTO;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using BeanBlissAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeanBlissAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineStatusController : ControllerBase
    {
        private readonly IMachineStatusRepository _statusRepository;
        private readonly IMachineRepository _machineRepository;
        private readonly IEmailRepository _emailRepository;
        private readonly ITechnicianRepository _technicianRepository;
        private readonly IMapper _mapper;

        public MachineStatusController(IMachineStatusRepository statusRepository, 
            IMapper mapper, IMachineRepository machineRepository, 
            IEmailRepository emailRepository, ITechnicianRepository technicianRepository)
        {
            _statusRepository = statusRepository;
            _mapper = mapper;
            _machineRepository = machineRepository;
            _emailRepository = emailRepository;
            _technicianRepository = technicianRepository;
        }

        [HttpGet("{machineId}")]
        [ProducesResponseType(200, Type = typeof(MachineStatusDto))]
        [ProducesResponseType(400)]
        public IActionResult GetMachineStatus(int machineId)
        {
            var status = _mapper.Map<MachineStatusDto>(
                _statusRepository.GetMachineStatus(machineId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(status);
        }

        [HttpPut("{machineId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateMachineStatus(int machineId,
            [FromBody] MachineStatusDto updatedMachineStatus)
        {
            if (updatedMachineStatus == null)
                return BadRequest(ModelState);

            if (machineId != updatedMachineStatus.MachineId)
                return BadRequest(ModelState);

            if (!_statusRepository.MachineStatusExists(machineId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var existingMachineStatus = _statusRepository.GetMachineStatus(machineId);

            if (existingMachineStatus == null)
                return NotFound();

            existingMachineStatus.CofeeLevel = updatedMachineStatus.CofeeLevel;
            existingMachineStatus.WaterLevel = updatedMachineStatus.WaterLevel;
            existingMachineStatus.MilkLevel = updatedMachineStatus.MilkLevel;
            existingMachineStatus.SugarLevel = updatedMachineStatus.SugarLevel;
            existingMachineStatus.MonitoringDate = DateTime.UtcNow;

            if (!_statusRepository.UpdateMachineStatus(existingMachineStatus))
            {
                ModelState.AddModelError("", "Something went wrong updating machine status");
                return StatusCode(500, ModelState);
            }

            return Ok("Changed");
        }

        [HttpGet("MachineCondition")]
        public IActionResult MachineCondition(int machineId)
        {
            if (!_machineRepository.MachineExists(machineId))
            {
                ModelState.AddModelError("", "Machine not found");
                return BadRequest(ModelState);
            }

            var isWorking = _statusRepository.MachineCondition(machineId);

            return Ok(new { machineId = machineId, isWorking = isWorking });
        }

        [HttpGet("Email")]
        public IActionResult SendEmails(int machineId)
        {
            var status = _statusRepository.MachineCondition(machineId);
            if (status == null)
                return NotFound();

            if (!status)
            {
                var technician = _technicianRepository.GetTechnicianByMachineId(machineId);
                if (technician != null)
                {
                    var subject = "Machine Failure Alert";
                    var message = $"The machine with ID {machineId} is currently not working.";
                    _emailRepository.SendEmail(technician.Email, subject, message);
                }
            }

            return Ok(status);
        }
    }
}
