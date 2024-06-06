namespace BeanBlissAPI.Models
{
    public class CoffeeMachine
    {
        public int CoffeeId { get; set; }
        public int MachineId { get; set; }
        public Coffee Coffee { get; set; }
        public Machine Machine { get; set; }
    }
}
