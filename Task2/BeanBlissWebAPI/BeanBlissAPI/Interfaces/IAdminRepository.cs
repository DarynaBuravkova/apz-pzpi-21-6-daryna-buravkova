namespace BeanBlissAPI.Interfaces
{
    public interface IAdminRepository
    {
        bool BackupDatabase(string databaseName);
        DateTime? GetLastBackupDate(string databaseName);
        bool RestoreDatabase(string databaseName);
    }
}
