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
    public class MachineController : ControllerBase
    {
        private readonly IMachineRepository _machineRepository;
        private readonly IMachineParametreRepository _parametreRepository;
        private readonly IMachineStatusRepository _statusRepository;
        private readonly IRegionRepository _regionRepository;
        private readonly ICoffeeRepository _coffeeRepository;
        private readonly ITechnicianRepository _technicianRepository;
        private readonly IMapper _mapper;

        public MachineController(IMachineRepository machineRepository,
            IMachineParametreRepository parametreRepository, IMachineStatusRepository statusRepository,
            IRegionRepository regionRepository, ICoffeeRepository coffeeRepository, IMapper mapper, 
            ITechnicianRepository technicianRepository)
        {
            _machineRepository = machineRepository;
            _parametreRepository = parametreRepository;
            _statusRepository = statusRepository;
            _regionRepository = regionRepository;
            _coffeeRepository = coffeeRepository;
            _technicianRepository = technicianRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Machine>))]
        public IActionResult GetMachines()
        {
            var machines = _mapper.Map<List<MachineDto>>(_machineRepository.GetMachines());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(machines);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Machine))]
        [ProducesResponseType(400)]
        public IActionResult GetMachine(int id)
        {
            if (!_machineRepository.MachineExists(id))
            {
                ModelState.AddModelError("", "Machine not found");
                return BadRequest(ModelState);
            }

            var machine = _mapper.Map<MachineDto>(_machineRepository.GetMachine(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(machine);
        }

        [HttpGet("/isWorking")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Machine>))]
        public IActionResult GetAvaliableMachine()
        {
            var machines = _mapper.Map<List<MachineDto>>(_machineRepository.GetAvailableMachines());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(machines);
        }

        [HttpGet("/Region/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Machine>))]
        public IActionResult GetMachinesByRegion(int id)
        {
            var machines = _mapper.Map<List<MachineDto>>(_machineRepository.GetMachinesByRegion(id));

            if (machines == null)
            {
                return NotFound();
            }
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(machines);
        }

        [HttpGet("/Coffee/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Machine>))]
        public IActionResult GetMachinesByOwner(int id)
        {
            var machines = _mapper.Map<List<MachineDto>>(_machineRepository.GetMachinesByCoffee(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(machines);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateMachine([FromQuery] int regionId, [FromQuery] int techId, [FromBody] MachineDto machineCreate)
        {
            if (machineCreate == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var machineMap = _mapper.Map<Machine>(machineCreate);
            machineMap.Region = _regionRepository.GetRegion(regionId);
            machineMap.Technician = _technicianRepository.GetTechnician(techId);

            var machineStatus = new MachineStatus
            {
                EquipmentState = true,
                CofeeLevel = 100,
                WaterLevel = 100,
                MilkLevel = 100,
                SugarLevel = 100,
                MonitoringDate = DateTime.Now,
                MachineId = machineMap.Id
            };
            machineMap.MachineStatus = machineStatus;

            var machineParametr = new MachineParametre
            {
                Temperature = 70,
                Strength = 3,
                Volume = 200,
                MachineId = machineMap.Id
            };
            machineMap.MachineParametre = machineParametr;

            if (!_machineRepository.CreateMachine(machineMap) || !_statusRepository.CreateMachineStatus(machineStatus)
                || _parametreRepository.CreateMachineParametre(machineParametr))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            if (!_machineRepository.SetMachineRegion(machineMap.Id, regionId))
            {
                ModelState.AddModelError("", "Failed to set region for the Machine");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpPost("Coffee")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult AddCoffee([FromQuery] int machineId, [FromQuery] int coffeeId)
        {
            var existingRelation = _coffeeRepository.GetCoffeeMachineRelation(coffeeId, machineId);
            if (existingRelation != null)
            {
                ModelState.AddModelError("", "This Coffee is already associated with the machine.");
                return BadRequest(ModelState);
            }

            if (!_coffeeRepository.AddCoffeesToMachine(coffeeId, machineId))
            {
                ModelState.AddModelError("", "Something went wrong adding Coffee");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully added");
        }

        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateMachine(int id, [FromBody] MachineDto updatedMachine)
        {
            if (updatedMachine == null)
                return BadRequest(ModelState);

            if (id != updatedMachine.Id)
                return BadRequest(ModelState);

            if (!_machineRepository.MachineExists(id))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var machineMap = _mapper.Map<Machine>(updatedMachine);

            if (!_machineRepository.UpdateMachine(machineMap))
            {
                ModelState.AddModelError("", "Something went wrong updating review");
                return StatusCode(500, ModelState);
            }

            return Ok("Changed");
        }

        [HttpPut("AssignTechnician")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult AssignTechnicianToMachine([FromQuery] int machineId, [FromQuery] int technicianId)
        {
            if (!_technicianRepository.TechnicianExists(technicianId))
            {
                ModelState.AddModelError("", "Technician not found");
                return BadRequest(ModelState);
            }

            if (!_machineRepository.MachineExists(machineId))
            {
                ModelState.AddModelError("", "Machine not found");
                return BadRequest(ModelState);
            }

            if (!_machineRepository.UpdateMachineTechnician(machineId, technicianId))
            {
                ModelState.AddModelError("", "Failed to assign technician to machine");
                return StatusCode(500, ModelState);
            }

            return Ok("Changed");
        }


        [HttpDelete("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteMachine(int machineId)
        {
            if (!_machineRepository.MachineExists(machineId))
            {
                return NotFound();
            }

            var machineToDelete = _machineRepository.GetMachine(machineId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_machineRepository.DeleteMachine(machineToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting machine");
            }

            return Ok("Deleted");
        }
    }
}
