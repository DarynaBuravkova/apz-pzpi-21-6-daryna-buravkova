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
    public class CoffeeController : ControllerBase
    {
        private readonly ICoffeeRepository _coffeeRepository;
        private readonly IMapper _mapper;

        public CoffeeController(ICoffeeRepository coffeeRepository,
            IMapper mapper)
        {
            _coffeeRepository = coffeeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Coffee>))]
        public IActionResult GetCoffees()
        {
            var coffees = _mapper.Map<List<CoffeeDto>>(_coffeeRepository.GetCoffees());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(coffees);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Coffee))]
        [ProducesResponseType(400)]
        public IActionResult GetCoffee(int id)
        {
            if (!_coffeeRepository.CoffeeExists(id))
            {
                ModelState.AddModelError("", "Coffee not found");
                return BadRequest(ModelState);
            }

            var coffee = _mapper.Map<CoffeeDto>(_coffeeRepository.GetCoffee(id));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(coffee);
        }

        [HttpGet("/CoffeeMachine")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Coffee>))]
        public IActionResult GetAvailableCoffee()
        {
            var coffees = _mapper.Map<List<CoffeeDto>>(_coffeeRepository.GetAvailableCoffees());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(coffees);
        }

        [HttpGet("CofeeMachine/{machineId}")]
        public IActionResult GetCoffeesByMachine(int machineId)
        {
            var coffees = _mapper.Map<List<CoffeeDto>>(_coffeeRepository.GetCoffeesByCofeeMachine(machineId));
            if (coffees == null || coffees.Count == 0)
            {
                return NotFound("No Coffees found for this machine.");
            }

            return Ok(coffees);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateCoffee([FromBody] CoffeeDto coffeeCreate)
        {
            if (coffeeCreate == null)
            {
                return BadRequest(ModelState);
            }

            var coffeeExists = _coffeeRepository.GetCoffees()
                .Any(c => c.Name.Trim().ToUpper() == coffeeCreate.Name.TrimEnd().ToUpper());

            if (coffeeExists)
            {
                ModelState.AddModelError("", "Coffee already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var coffeeMap = _mapper.Map<Coffee>(coffeeCreate);

            if (!_coffeeRepository.CreateCoffee(coffeeMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpPut("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateCoffee(int id, [FromBody] CoffeeDto updatedCoffee)
        {
            if (updatedCoffee == null)
                return BadRequest("Updated coffee data is null.");

            if (id != updatedCoffee.Id)
                return BadRequest("ID in URL does not match ID in the updated coffee data.");

            if (!_coffeeRepository.CoffeeExists(id))
                return NotFound($"Coffee with ID {id} not found.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var coffeeEntity = _coffeeRepository.GetCoffee(id);
            if (coffeeEntity == null)
                return NotFound($"Coffee with ID {id} not found in the repository.");

            _mapper.Map(updatedCoffee, coffeeEntity);

            if (!_coffeeRepository.UpdateCoffee(coffeeEntity))
            {
                ModelState.AddModelError("", "Something went wrong updating the coffee.");
                return StatusCode(500, ModelState);
            }

            return Ok("Changed");
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteCoffee(int id)
        {
            if (!_coffeeRepository.CoffeeExists(id))
            {
                return NotFound();
            }

            var coffeeToDelete = _coffeeRepository.GetCoffee(id);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_coffeeRepository.DeleteCoffee(coffeeToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting owner");
            }

            return Ok("Deleted");
        }
    }
}
