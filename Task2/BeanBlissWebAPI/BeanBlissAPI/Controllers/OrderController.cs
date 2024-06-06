using AutoMapper;
using BeanBlissAPI.DTO;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BeanBlissAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly ICoffeeRepository _coffeeRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMachineRepository _machineRepository;
        private readonly IMapper _mapper;

        public OrderController(IOrderRepository orderRepository, ICoffeeRepository coffeeRepository,
            IUserRepository userRepository, IMachineRepository machineRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _coffeeRepository = coffeeRepository;
            _userRepository = userRepository;
            _machineRepository = machineRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Order>))]
        public IActionResult GetOrders()
        {
            var orders = _mapper.Map<List<OrderDto>>(_orderRepository.GetOrders());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(orders);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(OrderDto))]
        [ProducesResponseType(404)]
        public IActionResult GetOrder(int id)
        {
            var order = _orderRepository.GetOrder(id);

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            var orderDto = _mapper.Map<OrderUserDto>(order);
            if (order.Coffee != null)
            {
                orderDto.CoffeeId = order.Coffee.Id;
            }

            return Ok(orderDto);
        }

        [HttpGet("user/{id}")]
        [ProducesResponseType(200, Type = typeof(Order))]
        [ProducesResponseType(400)]
        public IActionResult GetOrdersForAUser(int id)
        {
            var orders = _mapper.Map<List<OrderUserDto>>(_orderRepository.GetUserOrders(id));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(orders);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateOrder([FromQuery] int userId, [FromQuery] int coffeeId, [FromQuery] int machineId, [FromBody] OrderDto orderCreate)
        {
            if (orderCreate == null || !_coffeeRepository.CoffeeExists(coffeeId)
                || !_machineRepository.MachineExists(machineId))
                return BadRequest("Invalid order data.");

            var userExists = _userRepository.UserExists(userId);
            if (!userExists)
            {
                ModelState.AddModelError("", "User does not exist.");
                return BadRequest(ModelState);
            }

            var coffee = _coffeeRepository.GetCoffee(coffeeId);
            if (coffee == null)
            {
                ModelState.AddModelError("", "Selected coffee is not available.");
                return BadRequest(ModelState);
            }

            var machine = _machineRepository.GetMachine(machineId);
            if (machine == null)
            {
                ModelState.AddModelError("", "Selected machine is not available.");
                return BadRequest(ModelState);
            }

            var CoffeeMachine = _coffeeRepository.GetCoffeeMachineRelation(coffeeId, machineId);
            if (CoffeeMachine == null)
            {
                ModelState.AddModelError("", "Coffee is not available in the specified machine.");
                return BadRequest(ModelState);
            }

            var coffeePrice = _coffeeRepository.GetCoffeePrice(coffeeId);
            if (coffeePrice == null)
            {
                ModelState.AddModelError("", "Coffee price is not available.");
                return BadRequest(ModelState);
            }

            var orderMap = _mapper.Map<Order>(orderCreate);
            orderMap.Price = coffeePrice;
            orderMap.User = _userRepository.GetUser(userId);
            orderMap.Coffee = coffee;
            orderMap.Machine = machine;

            if (!_orderRepository.CreateOrder(orderMap))
            {
                ModelState.AddModelError("", "Failed to create order.");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

    }
}
