using BeanBlissAPI.Data;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;

namespace BeanBlissAPI.Repository
{
    public class RegionRepository : IRegionRepository
    {
        private readonly DataContext _context;

        public RegionRepository(DataContext context)
        {
            _context = context;
        }
        public bool CreateRegion(Region region)
        {
            _context.Add(region);
            return Save();
        }

        public bool DeleteRegion(Region region)
        {
            _context.Remove(region);
            return Save();
        }

        public Region GetRegion(int id)
        {
            return _context.Region.Where(p => p.Id == id).FirstOrDefault();
        }

        public ICollection<Region> GetRegions()
        {
            return _context.Region.OrderBy(p => p.Id).ToList();
        }

        public bool RegionExists(int id)
        {
            return _context.Region.Any(p => p.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateRegion(Region region)
        {
            _context.Update(region);
            return Save();
        }
    }
}
