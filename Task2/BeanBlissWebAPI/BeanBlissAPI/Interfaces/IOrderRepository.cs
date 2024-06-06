using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface IOrderRepository
    {
        ICollection<Order> GetOrders();
        Order GetOrder(int id);
        ICollection<Order> GetUserOrders(int userId);
        bool OrderExists(int id);
        bool CreateOrder(Order order);
        bool DeleteOrder(Order order);
        bool Save();
    }
}
