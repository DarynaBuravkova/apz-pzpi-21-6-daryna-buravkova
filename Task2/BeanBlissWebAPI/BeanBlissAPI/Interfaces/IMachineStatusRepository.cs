using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface IMachineStatusRepository
    {
        MachineStatus GetMachineStatus(int machineId);
        bool MachineCondition(int machineId);
        bool MachineStatusExists(int id);
        bool CreateMachineStatus(MachineStatus machineStatus);
        bool UpdateMachineStatus(MachineStatus machineStatus);
        bool Save();
    }
}
