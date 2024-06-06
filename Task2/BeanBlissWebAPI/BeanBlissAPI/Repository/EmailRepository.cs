using BeanBlissAPI.Interfaces;
using System.Net.Mail;
using System.Net;

namespace BeanBlissAPI.Repository
{
    public class EmailRepository : IEmailRepository
    {
        private readonly IConfiguration _configuration;

        public EmailRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string to, string subject, string message)
        {
            var smtpClient = new SmtpClient(_configuration["EmailSettings:SmtpServer"])
            {
                Port = int.Parse(_configuration["EmailSettings:Port"]),
                Credentials = new NetworkCredential(_configuration["EmailSettings:Username"], _configuration["EmailSettings:Password"]),
                EnableSsl = bool.Parse(_configuration["EmailSettings:EnableSsl"]),
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_configuration["EmailSettings:From"]),
                Subject = subject,
                Body = message,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(to);

            smtpClient.Send(mailMessage);
        }
    }
}
