using AutoMapper;
using BeanBlissAPI.DTO;
using BeanBlissAPI.Models;

namespace BeanBlissAPI.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<Machine, MachineDto>();
            CreateMap<MachineDto, Machine>();
            CreateMap<Region, RegionDto>();
            CreateMap<RegionDto, Region>();
            CreateMap<Coffee, CoffeeDto>();
            CreateMap<CoffeeDto, Coffee>();
            CreateMap<MachineParametre, MachineParametreDto>();
            CreateMap<MachineParametreDto, MachineParametreDto>();
            CreateMap<MachineStatus, MachineStatusDto>();
            CreateMap<MachineStatusDto, MachineStatusDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderDto, Order>();
            CreateMap<Order, OrderUserDto>();
            CreateMap<OrderUserDto, Order>();
            CreateMap<Review, ReviewDto>();
            CreateMap<ReviewDto, Review>();
            CreateMap<Technician, TechnicianDto>();
            CreateMap<TechnicianDto, Technician>();
        }
    }
}
