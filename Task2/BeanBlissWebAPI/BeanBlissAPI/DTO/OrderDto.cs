namespace BeanBlissAPI.DTO
{
    public class OrderDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
        public bool IsPaid { get; set; } = false;
        public string PaymentDetail { get; set; } = string.Empty;
        public int MachineId { get; set; }
    }
}
