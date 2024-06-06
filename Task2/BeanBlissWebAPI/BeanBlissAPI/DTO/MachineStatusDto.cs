namespace BeanBlissAPI.DTO
{
    public class MachineStatusDto
    {
        public int Id { get; set; }
        public int CofeeLevel { get; set; }
        public int WaterLevel { get; set; }
        public int MilkLevel { get; set; }
        public int SugarLevel { get; set; }
        public DateTime MonitoringDate { get; set; }
        public int MachineId { get; set; }
    }
}
