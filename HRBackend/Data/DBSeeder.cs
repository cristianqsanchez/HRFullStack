using HRBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace HRBackend.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            context.Database.Migrate();

            if (!context.Departments.Any())
            {
                var departments = new List<Department>
                {
                    new Department { Name = "Recursos Humanos" },
                    new Department { Name = "Desarrollo" },
                    new Department { Name = "Marketing" }
                };

                context.Departments.AddRange(departments);
                context.SaveChanges();
            }

            if (!context.Positions.Any())
            {
                var positions = new List<Position>
                {
                    new Position { Title = "Desarrollador" },
                    new Position { Title = "Diseñador" },
                    new Position { Title = "Gerente" }
                };

                context.Positions.AddRange(positions);
                context.SaveChanges();
            }

            if (!context.Employees.Any())
            {
                var firstDepartment = context.Departments.First();
                var firstPosition = context.Positions.First();

                var employees = new List<Employee>
                {
                    new Employee
                    {
                        Name = "Cristian Quintero",
                        DepartmentId = firstDepartment.Id,
                        PositionId = firstPosition.Id
                    }
                };

                context.Employees.AddRange(employees);
                context.SaveChanges();
            }
        }
    }
}
