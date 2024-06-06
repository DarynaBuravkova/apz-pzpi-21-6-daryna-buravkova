using BeanBlissAPI.Data;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;

namespace BeanBlissAPI.Repository
{
    public class MachineParametreRepository : IMachineParametreRepository
    {
        private readonly DataContext _context;

        public MachineParametreRepository(DataContext context)
        {
            _context = context;
        }
        public bool CreateMachineParametre(MachineParametre machineParametre)
        {
            _context.Add(machineParametre);
            return Save();
        }

        public MachineParametre GetMachineParametre(int machineId)
        {
            return _context.MachineParametre.Where(o => o.MachineId == machineId).FirstOrDefault();
        }

        public bool MachineParametreExists(int id)
        {
            return _context.MachineParametre.Any(p => p.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateMachineParametre(MachineParametre machineParametre)
        {
            _context.Update(machineParametre);
            return Save();
        }
    }
}
