using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
        User GetUser(int id);
        bool CreateUser(User user);
        bool UserExists(int userId);
        bool UpdateUser(User user);
        bool DeleteUser(User user);
        bool Save();
    }
}
