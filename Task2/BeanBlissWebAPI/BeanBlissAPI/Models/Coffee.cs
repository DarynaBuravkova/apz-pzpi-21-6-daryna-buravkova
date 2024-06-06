using Microsoft.AspNetCore.Mvc.ViewEngines;

namespace BeanBlissAPI.Models
{
    public class Coffee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Bulk { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; } = string.Empty;
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<CoffeeMachine> CoffeeMachines { get; set; }
    }
}
