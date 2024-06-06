namespace BeanBlissAPI.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Feedback { get; set; } = string.Empty;
        public Coffee Coffee { get; set; }
    }
}
