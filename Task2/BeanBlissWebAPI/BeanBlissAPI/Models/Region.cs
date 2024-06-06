namespace BeanBlissAPI.Models
{
    public class Region
    {
        public int Id { get; set; }
        public string City { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public ICollection<Machine> Machines { get; set; }
    }
}
