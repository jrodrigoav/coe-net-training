namespace UnicornRewards.API.Models.Entities
{
    public class Question
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Label { get; set; }
        public string? Answer { get; set; }
        public string? SugestedAnswers { get; set; }
        //public List<string> ListAnswers { get; set; } = new List<string>();
        public int TabId { get; set; }
        public bool Status { get; set; }
    }
}
