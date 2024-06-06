using BeanBlissAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BeanBlissAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;
        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpPost("BackupDatabase")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult BackupDatabase([FromQuery] string databaseName)
        {
            if (_adminRepository.BackupDatabase(databaseName))
            {
                return Ok("Бекап бази даних успішно створенно.");
            }

            return StatusCode(500, "Помилка при створенні бекапу бази даних.");
        }

        [HttpGet("LastBackupDate")]
        public IActionResult GetLastBackupDate(string databaseName)
        {
            var lastBackupDate = _adminRepository.GetLastBackupDate(databaseName);
            if (lastBackupDate == null)
            {
                return NotFound($"Не знайдено бекапів для '{databaseName}'.");
            }
            return Ok(lastBackupDate);
        }

        [HttpPost("RestoreDatabase")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public IActionResult RestoreDatabase([FromQuery] string databaseName)
        {
            if (_adminRepository.RestoreDatabase(databaseName))
            {
                return Ok("Відновлення бази даних успішне.");
            }

            return StatusCode(500, "Помилка при відновленні бази даних.");
        }

    }
}
