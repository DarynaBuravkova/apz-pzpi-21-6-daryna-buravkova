namespace BeanBlissAPI.Models
{
    public class Machine
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public Region Region { get; set; }
        public string? Address { get; set; }
        public bool IsWorking { get; set; } = true;
        public MachineParametre MachineParametre { get; set; }
        public MachineStatus MachineStatus { get; set; }
        public Technician Technician { get; set; }
        public ICollection<CoffeeMachine> CoffeeMachines { get; set; }
    }
}
