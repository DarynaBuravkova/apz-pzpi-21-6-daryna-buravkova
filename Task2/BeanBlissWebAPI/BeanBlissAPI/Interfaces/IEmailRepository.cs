namespace BeanBlissAPI.Interfaces
{
    public interface IEmailRepository
    {
        void SendEmail(string to, string subject, string message);
    }
}
