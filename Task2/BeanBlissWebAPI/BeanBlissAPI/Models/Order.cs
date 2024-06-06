namespace BeanBlissAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderStatus { get; set; } = string.Empty;
        public bool IsPaid { get; set; } = false;
        public decimal Price { get; set; }
        public string PaymentDetail { get; set; } = string.Empty;
        public User User { get; set; }
        public Coffee Coffee { get; set; }
        public Machine Machine { get; set; }
    }
}
