namespace BeanBlissAPI.Models
{
    public class MachineStatus
    {
        public int Id { get; set; }
        public bool EquipmentState { get; set; } = true;
        public int CofeeLevel { get; set; }
        public int WaterLevel { get; set; }
        public int MilkLevel { get; set; }
        public int SugarLevel { get; set; }
        public DateTime MonitoringDate { get; set; }
        public int MachineId { get; set; }
        public Machine Machine { get; set; }
    }
}
