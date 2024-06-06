namespace BeanBlissAPI.Models
{
    public class MachineParametre
    {
        public int Id { get; set; }
        public int Temperature { get; set; }
        public int Strength { get; set; }
        public int Volume { get; set; }
        public int MachineId { get; set; }
        public Machine Machine { get; set; }
    }
}
