using BeanBlissAPI.Data;
using BeanBlissAPI.Interfaces;
using BeanBlissAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BeanBlissAPI.Repository
{
    public class MachineRepository : IMachineRepository
    {
        private readonly DataContext _context;

        public MachineRepository(DataContext context)
        {
            _context = context;
        }
        public bool MachineExists(int id)
        {
            return _context.Machine.Any(p => p.Id == id);
        }

        public bool CreateMachine(Machine machine)
        {
            _context.Add(machine);
            return Save();
        }

        public bool DeleteMachine(Machine machine)
        {
            _context.Remove(machine);
            return Save();
        }

        public bool DeleteMachines(List<Machine> machines)
        {
            _context.RemoveRange(machines);
            return Save();
        }

        public ICollection<Machine> GetAvailableMachines()
        {
            return _context.Machine.Where(e => e.IsWorking == true).ToList();
        }

        public ICollection<Machine> GetMachinesByCoffee(int drinkId)
        {
            return _context.CoffeeMachine
                .Where(p => p.Coffee.Id == drinkId).Select(p => p.Machine).ToList();
        }

        public ICollection<Machine> GetMachinesByRegion(int regionId)
        {
            return _context.Machine.Include(m => m.Region)
                .Where(e => e.Region.Id == regionId).ToList();
        }

        public Machine GetMachine(int id)
        {
            return _context.Machine.Include(m => m.Region)
                .Where(p => p.Id == id).FirstOrDefault();
        }

        public ICollection<Machine> GetMachines()
        {
            return _context.Machine.Include(m => m.Region)
                .OrderBy(p => p.Id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool SetMachineRegion(int machineId, int regionId)
        {
            var machine = GetMachine(machineId);
            var region = _context.Region.Where(c => c.Id == regionId).FirstOrDefault();

            if (machine == null)
                return false;

            machine.Region = region;
            return Save();
        }

        public bool UpdateMachine(Machine machine)
        {
            _context.Update(machine);
            return Save();
        }

        public bool UpdateMachineTechnician(int machineId, int techId)
        {
            var machine = GetMachine(machineId);
            if (machine == null)
                return false;

            var technician = _context.Technician.FirstOrDefault(t => t.Id == techId);
            if (technician == null)
                return false;

            machine.Technician = technician;
            return Save();
        }
    }
}
