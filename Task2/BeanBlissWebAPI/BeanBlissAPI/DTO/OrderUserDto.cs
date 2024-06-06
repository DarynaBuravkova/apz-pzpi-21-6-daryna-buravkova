namespace BeanBlissAPI.DTO
{
    public class OrderUserDto
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
        public bool IsPaid { get; set; } = false;
        public decimal Price { get; set; }
        public string PaymentDetail { get; set; } = string.Empty;
        public int CoffeeId { get; set; } 
    }
}
