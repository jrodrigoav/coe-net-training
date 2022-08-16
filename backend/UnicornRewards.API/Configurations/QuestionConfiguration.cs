using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UnicornRewards.API.Models.Entities;

namespace UnicornRewards.API.Configurations
{
    public class QuestionConfiguration :IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
