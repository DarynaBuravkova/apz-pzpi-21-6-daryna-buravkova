using BeanBlissAPI.Interfaces;
using Microsoft.Data.SqlClient;

namespace BeanBlissAPI.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly string _connectionString;
        private readonly string _backupDirectory = @"D:\darin\Documents\ХНУРЕ\АПЗ\Backup\";

        public AdminRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        public bool BackupDatabase(string databaseName)
        {
            try
            {
                string backupFileName = $"{databaseName}_Backup_{DateTime.Now:yyyyMMddHHmmss}.bak";
                string backupPath = Path.Combine(_backupDirectory, backupFileName);
                string query = $"BACKUP DATABASE [{databaseName}] TO DISK = '{backupPath}'";

                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand(query, connection);
                    command.ExecuteNonQuery();
                }

                Console.WriteLine($"Backup of database '{databaseName}' created successfully at '{backupPath}'.");
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating backup of database '{databaseName}': {ex.Message}");
                return false;
            }
        }

        public DateTime? GetLastBackupDate(string databaseName)
        {
            try
            {
                var directory = new DirectoryInfo(_backupDirectory);
                var backupFile = directory.GetFiles($"{databaseName}_Backup_*.bak")
                                          .OrderByDescending(f => f.CreationTime)
                                          .FirstOrDefault();

                if (backupFile == null)
                {
                    Console.WriteLine($"No backup files found for database '{databaseName}'.");
                    return null;
                }

                return backupFile.CreationTime;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving last backup date for database '{databaseName}': {ex.Message}");
                return null;
            }
        }

        public bool RestoreDatabase(string databaseName)
        {
            try
            {
                // Перевіряємо наявність бекапів у директорії
                var directory = new DirectoryInfo(_backupDirectory);
                var backupFile = directory.GetFiles($"{databaseName}_Backup_*.bak")
                                          .OrderByDescending(f => f.CreationTime)
                                          .FirstOrDefault();

                if (backupFile == null)
                {
                    Console.WriteLine($"No backup files found for database '{databaseName}'.");
                    return false;
                }

                string backupPath = backupFile.FullName;
                string query = $@"
            USE master;
            ALTER DATABASE [{databaseName}] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
            RESTORE DATABASE [{databaseName}] FROM DISK = '{backupPath}' WITH REPLACE;
            ALTER DATABASE [{databaseName}] SET MULTI_USER;";

                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.ExecuteNonQuery();
                    }
                }

                Console.WriteLine($"Database '{databaseName}' restored successfully from '{backupPath}'.");
                return true;
            }
            catch (SqlException sqlEx)
            {
                Console.WriteLine($"SQL Error restoring database '{databaseName}': {sqlEx.Message}");
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error restoring database '{databaseName}': {ex.Message}");
                return false;
            }
        }

    }
}
