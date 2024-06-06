using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface IMachineRepository
    {
        ICollection<Machine> GetMachines();
        Machine GetMachine(int id);
        ICollection<Machine> GetAvailableMachines();
        ICollection<Machine> GetMachinesByRegion(int regionId);
        ICollection<Machine> GetMachinesByCoffee(int drinkId);
        bool SetMachineRegion(int machineId, int regionId);
        bool UpdateMachineTechnician(int machineId, int techId);
        bool MachineExists(int id);
        bool CreateMachine(Machine machine);
        bool UpdateMachine(Machine machine);
        bool DeleteMachine(Machine machine);
        bool DeleteMachines(List<Machine> machines);
        bool Save();
    }
}
