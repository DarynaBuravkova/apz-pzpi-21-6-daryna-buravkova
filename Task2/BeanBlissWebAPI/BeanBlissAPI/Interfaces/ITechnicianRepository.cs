using BeanBlissAPI.Models;

namespace BeanBlissAPI.Interfaces
{
    public interface ITechnicianRepository
    {
        ICollection<Technician> GetTechnicians();
        Technician GetTechnician(int TechnicianId);
        ICollection<Machine> GetMachinesByTechnician(int ownerId);
        Technician GetTechnicianByMachineId(int machineId);
        bool CreateTechnician(Technician tech);
        bool TechnicianExists(int TechnicianId);
        bool UpdateTechnician(Technician Technician);
        bool DeleteTechnician(Technician Technician);
        bool Save();
    }
}
