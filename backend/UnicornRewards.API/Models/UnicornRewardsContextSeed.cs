using UnicornRewards.API.Models.Entities;

namespace UnicornRewards.API.Models
{
    public class UnicornRewardsContextSeed
    {
        private readonly UnicornRewardsAPIContext _rewardsDbContext;
        public UnicornRewardsContextSeed(UnicornRewardsAPIContext rewardsDbContext)
        {
            _rewardsDbContext = rewardsDbContext;
        }

        public void SeedAsync()
        {
            if (!_rewardsDbContext.Users.Any())
            {
                var users = new List<User>
                {
                    new User { 
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
                    }
                };
                _rewardsDbContext.Users.AddRange(users);
                _rewardsDbContext.SaveChanges();
            }
        }
    }
}
