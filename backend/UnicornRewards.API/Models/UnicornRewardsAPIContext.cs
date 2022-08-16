using Microsoft.EntityFrameworkCore;
using UnicornRewards.API.Models.Entities;

namespace UnicornRewards.API.Models
{
    public class UnicornRewardsAPIContext : DbContext
    {
        public UnicornRewardsAPIContext(DbContextOptions<UnicornRewardsAPIContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        Id = 1,
                        Name = "Edson Ibañez",
                        UserName = "Edson554",
                        Email = "edson26qwe@gmail.com",
                        WebSite = "http://edgame.org"
                    },
                    new User
                    {
                        Id = 2,
                        Name = "Adriana Monrroy",
                        UserName = "AdrimonBest22",
                        Email = "adri_ma@gmail.com",
                        WebSite = "http://adri.com"
                    });
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Tab> Tabs { get; set; }
        public virtual DbSet<Question> Questions { get;set;}
    }
}
