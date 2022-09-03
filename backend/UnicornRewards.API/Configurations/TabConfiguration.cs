using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UnicornRewards.API.Models.Entities;

namespace UnicornRewards.API.Configurations
{
    public class TabConfiguration : IEntityTypeConfiguration<Tab>
    {
        public void Configure(EntityTypeBuilder<Tab> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
