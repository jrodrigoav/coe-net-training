using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Database
{
    public class ApiContext : DbContext
    {
        public DbSet<Album> Album { get; set; }
        public DbSet<User> User { get; set; }

        public ApiContext(DbContextOptions options) : base(options)
        {
        }
    }
}
