using BeanBlissAPI.Data;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;

namespace BeanBlissAPI.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly DataContext _context;

        public ReviewRepository(DataContext context)
        {
            _context = context;
        }
        public bool CreateReview(Review review)
        {
            _context.Add(review);
            return Save();
        }

        public bool DeleteReview(Review review)
        {
            _context.Remove(review);
            return Save();
        }

        public ICollection<Review> GetDrinkReviews(int drinkId)
        {
            return _context.Review.Where(c => c.Coffee.Id == drinkId).ToList();
        }

        public Review GetReview(int id)
        {
            return _context.Review.Where(p => p.Id == id).FirstOrDefault();
        }

        public ICollection<Review> GetReviews()
        {
            return _context.Review.OrderBy(p => p.Id).ToList();
        }

        public bool ReviewExists(int id)
        {
            return _context.Review.Any(r => r.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateReview(Review review)
        {
            _context.Update(review);
            return Save();
        }
    }
}
