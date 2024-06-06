using BeanBlissAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace BeanBlissAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Machine> Machine { get; set; }
        public DbSet<Coffee> Coffee { get; set; }
        public DbSet<CoffeeMachine> CoffeeMachine { get; set; }
        public DbSet<MachineParametre> MachineParametre { get; set; }
        public DbSet<MachineStatus> MachineStatus { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Region> Region { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Technician> Technician { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Machine>()
                .HasOne(a => a.MachineStatus)
                .WithOne(a => a.Machine)
                .HasForeignKey<MachineStatus>(a => a.MachineId);

            modelBuilder.Entity<Machine>()
            .HasOne(a => a.MachineParametre)
                .WithOne(a => a.Machine)
                .HasForeignKey<MachineParametre>(a => a.MachineId);

            modelBuilder.Entity<CoffeeMachine>()
                .HasKey(a => new { a.MachineId, a.CoffeeId });
            modelBuilder.Entity<CoffeeMachine>()
                .HasOne(a => a.Coffee)
                .WithMany(a => a.CoffeeMachines)
                .HasForeignKey(a => a.CoffeeId);
            modelBuilder.Entity<CoffeeMachine>()
                .HasOne(a => a.Machine)
                .WithMany(a => a.CoffeeMachines)
                .HasForeignKey(a => a.MachineId);

            modelBuilder.Entity<Coffee>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,4)");

            modelBuilder.Entity<Order>()
                .Property(p => p.Price)
                .HasColumnType("decimal(18,4)");
        }
    }
}
