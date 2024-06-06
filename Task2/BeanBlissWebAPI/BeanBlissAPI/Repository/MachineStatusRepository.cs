using BeanBlissAPI.Data;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;

namespace BeanBlissAPI.Repository
{
    public class MachineStatusRepository : IMachineStatusRepository
    {
        private readonly DataContext _context;

        public MachineStatusRepository(DataContext context)
        {
            _context = context;
        }
        public bool CreateMachineStatus(MachineStatus machineStatus)
        {
            _context.Add(machineStatus);
            return Save();
        }

        public MachineStatus GetMachineStatus(int machineId)
        {
            return _context.MachineStatus.Where(p => p.Id == machineId).FirstOrDefault();
        }

        public bool MachineCondition(int machineId)
        {
            var status = GetMachineStatus(machineId);
            return status != null && status.EquipmentState;
        }

        public bool MachineStatusExists(int id)
        {
            return _context.MachineStatus.Any(p => p.Id == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateMachineStatus(MachineStatus machineStatus)
        {
            _context.Update(machineStatus);
            return Save();
        }
    }
}
