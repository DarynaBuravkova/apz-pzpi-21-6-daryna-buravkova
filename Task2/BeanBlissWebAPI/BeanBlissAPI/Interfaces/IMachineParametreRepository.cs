using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface IMachineParametreRepository
    {
        MachineParametre GetMachineParametre(int machineId);
        bool MachineParametreExists(int id);
        bool CreateMachineParametre(MachineParametre machineParametre);
        bool UpdateMachineParametre(MachineParametre machineParametre);
        bool Save();
    }
}
