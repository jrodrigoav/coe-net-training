namespace UnicornRewards.API.Models.Request
{
    public class DtoQuestion
    {
        public string Type { get; set; }
        public string Label { get; set; }
        public string? Answer { get; set; }
        public string? SugestedAnswers { get; set; }
        public int TabId { get; set; }
        public bool Status { get; set; }
    }
}
