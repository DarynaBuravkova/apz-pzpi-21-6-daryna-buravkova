using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface IRegionRepository
    {
        ICollection<Region> GetRegions();
        Region GetRegion(int id);
        bool RegionExists(int id);
        bool CreateRegion(Region region);
        bool UpdateRegion(Region region);
        bool DeleteRegion(Region region);
        bool Save();
    }
}
