using BeanBlissAPI.Models;

namespace BeanBlissAPI.DTO
{
    public class MachineDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public bool IsWorking { get; set; } = true;
        public int RegionId { get; set; }
    }
}
