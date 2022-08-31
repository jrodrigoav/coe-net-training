namespace UnicornRewards.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public string UserName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Website { get; set; } = "";
        public string Checked { get; set; } = "";
        public bool Title { get; set; }
    }
}
