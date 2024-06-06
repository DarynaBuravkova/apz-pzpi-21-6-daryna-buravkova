using BeanBlissAPI.Data;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BeanBlissAPI.Repository
{
    public class CoffeeRepository : ICoffeeRepository
    {
        private readonly DataContext _context;

        public CoffeeRepository(DataContext context)
        {
            _context = context;
        }

        public bool AddCoffeesToMachine(int coffeeId, int machineId)
        {
            var coffeeEntity = _context.Coffee.FirstOrDefault(a => a.Id == coffeeId);
            var machineEntity = _context.Machine.FirstOrDefault(a => a.Id == machineId);

            var coffeeMachine = new CoffeeMachine()
            {
                Coffee = coffeeEntity,
                Machine = machineEntity,
            };

            _context.Add(coffeeMachine);
            return Save();
        }

        public bool CreateCoffee(Coffee coffee)
        {
            _context.Add(coffee);
            return Save();
        }

        public bool DeleteCoffee(Coffee coffee)
        {
            _context.Remove(coffee);
            return Save();
        }

        public bool DeleteCoffees(List<Coffee> coffees)
        {
            _context.RemoveRange(coffees);
            return Save();
        }

        public bool CoffeeExists(int id)
        {
            return _context.Coffee.Any(p => p.Id == id);
        }

        public ICollection<Coffee> GetAvailableCoffees()
        {
            var usedCoffeeId = _context.CoffeeMachine.Select(dm => dm.CoffeeId).Distinct().ToList();

            return _context.Coffee.Where(coffee => usedCoffeeId.Contains(coffee.Id)).ToList();
        }

        public Coffee GetCoffee(int id)
        {
            return _context.Coffee.FirstOrDefault(p => p.Id == id);
        }

        public CoffeeMachine GetCoffeeMachineRelation(int coffeeId, int machineId)
        {
            return _context.CoffeeMachine.FirstOrDefault(dm => dm.CoffeeId == coffeeId && dm.MachineId == machineId);
        }

        public ICollection<Coffee> GetCoffees()
        {
            return _context.Coffee.OrderBy(p => p.Id).ToList();
        }

        public ICollection<Coffee> GetCoffeesByCofeeMachine(int machineId)
        {
            return _context.CoffeeMachine.Where(p => p.Machine.Id == machineId).Select(p => p.Coffee).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0;
        }

        public bool UpdateCoffee(Coffee coffee)
        {
            _context.Update(coffee);
            return Save();
        }

        public decimal GetCoffeePrice(int id)
        {
            var coffee = _context.Coffee.FirstOrDefault(c => c.Id == id);

            if (coffee != null)
            {
                return coffee.Price;
            }
            else
            {
                throw new ArgumentException("No coffee found with the provided id", nameof(id));
            }
        }
    }
}
