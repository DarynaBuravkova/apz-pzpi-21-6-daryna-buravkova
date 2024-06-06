namespace BeanBlissAPI.DTO
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public string Feedback { get; set; } = string.Empty;
    }
}
