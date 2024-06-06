using BeanBlissAPI.Data;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BeanBlissAPI.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;
        }
        public bool CreateOrder(Order order)
        {
            _context.Add(order);
            return Save();
        }

        public bool DeleteOrder(Order order)
        {
            _context.Remove(order);
            return Save();
        }

        public Order GetOrder(int id)
        {
            return _context.Order.Include(o => o.Coffee).Where(p => p.Id == id).FirstOrDefault();
        }

        public ICollection<Order> GetOrders()
        {
            return _context.Order.Include(o => o.Machine).OrderBy(p => p.Id).ToList();
        }

        public ICollection<Order> GetUserOrders(int userId)
        {
            return _context.Order.Include(o => o.Coffee).Where(c => c.User.Id == userId).ToList();
        }

        public bool OrderExists(int id)
        {
            return _context.Order.Any(r => r.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
