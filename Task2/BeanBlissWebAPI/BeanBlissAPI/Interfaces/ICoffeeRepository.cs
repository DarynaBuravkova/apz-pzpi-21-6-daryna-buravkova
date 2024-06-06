using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface ICoffeeRepository
    {
        ICollection<Coffee> GetCoffees();
        Coffee GetCoffee(int id);
        decimal GetCoffeePrice(int id);
        ICollection<Coffee> GetCoffeesByCofeeMachine(int machineId);
        ICollection<Coffee> GetAvailableCoffees();
        bool AddCoffeesToMachine(int drinkId, int machineId);
        CoffeeMachine GetCoffeeMachineRelation(int drinkId, int machineId);
        bool CoffeeExists(int id);
        bool CreateCoffee(Coffee coffee);
        bool UpdateCoffee(Coffee coffee);
        bool DeleteCoffee(Coffee coffee);
        bool DeleteCoffees(List<Coffee> coffees);
        bool Save();
    }
}
