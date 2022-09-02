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

                var tabs = new List<Tab>()
                {
                    new Tab{
                        Id = 1,
                        Name = "PersonalData",
                        Label = "Candidate Info",
                        Status = true
                    },
                    new Tab{
                        Id=2,
                        Name = "FrontEnd",
                        Label = "FrontEnd Skills",
                        Status = true
                    },
                    new Tab{
                        Id=3,
                        Name = "BackEnd",
                        Label = "BackEnd Skills",
                        Status = true
                    },
                    new Tab{
                        Id=4,
                        Name = "Azure",
                        Label = "Microsoft Azure Skills",
                        Status = true
                    }
                };

                var questions = new List<Question>() {
                    new Question{
                        Id = 1,
                        Type = "text",
                        Label = "Candidate Name:",
                        //SugestedAnswers="First|Second|Third|Fourth",
                        TabId = 1,
                        Status = true
                    },
                    new Question{
                        Id = 2,
                        Type = "text",
                        Label = "Candidate Email:",
                        TabId = 1,
                        Status = true
                    },
                    new Question {
                        Id = 3,
                        Type = "select",
                        Label = "What is Cloud Computing?",
                        SugestedAnswers="Cloud computing is a concept that means storing and accessing data on the internet. In the case of cloud computing, you are accessing the data from a remote server.|" +
                        "It’s like you are using a vendor’s server to store or access your data and you are paying for the time you are using the server.",
                        TabId = 4,
                        Status = true
                    },
                    new Question{
                        Id = 4,
                        Type = "select",
                        Label = "What are the differences between a public cloud and a private cloud?",
                        SugestedAnswers = "A private cloud belongs to a specific organization and no other organization can access the same Cloud.|" +
                        "A private cloud is also known as an internal cloud or enterprise cloud|" +
                        "Maintenance in the case of a Private cloud is difficult compared to the Public cloud.|" +
                        "A public cloud is a cloud service that shares the services among different organizations.|" +
                        "You can call it a Shared cloud.",
                        TabId= 4,
                        Status = true
                    },
                    new Question{
                        Id = 5,
                        Type = "select",
                        Label = "What are the differences between a public cloud and a private cloud?",
                        SugestedAnswers = "Cost-saving is one of the cool benefits of cloud computing so many organization prefers to use cloud computing.|" +
                        "Highly available with High-speed performance.|" +
                        "Back up and restoring data is very easy in Cloud computing.|" +
                        "Unlimited storage capacity is an important feature here.|" +
                        "Pay only for how much you are using.|" +
                        "In case of natural disaster, or power failure, it will save your data that helps for the Business continuity plan for an organization.",
                        TabId= 4,
                        Status = true
                    },
                    new Question {
                        Id = 6,
                        Type = "select",
                        Label = "What do you mean by PaaS, SaaS, and IaaS?",
                        SugestedAnswers="Paas: Paas is Platform as service is a cloud computing model, where you will get all the hardware and software tools that are needed for the development activities.|" +
                        "Saas is Software as a service is delivering an application as a service via the internet. No need to install, or maintain the software, just you need to access those as a service.|" +
                        "IaaS is Infrastructure as a service that is responsible for providing virtualized computing resources over the internet.",
                        TabId = 4,
                        Status = true
                    },
                    new Question {
                        Id = 7,
                        Type = "select",
                        Label = "What are the main use of the Azure Cloud Service?",
                        SugestedAnswers="The main purpose of the Azure Cloud Service is to host the application that is running.|" +
                        "Saas is Software as a service is delivering an application as a service via the internet. No need to install, or maintain the software, just you need to access those as a service.|" +
                        "This service is also responsible to maintain the background application.",
                        TabId = 4,
                        Status = true
                    }
                };

                _rewardsDbContext.Users.AddRange(users);
                _rewardsDbContext.Tabs.AddRange(tabs);
                _rewardsDbContext.Questions.AddRange(questions);
                _rewardsDbContext.SaveChanges();
            }
        }
    }
}
