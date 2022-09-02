namespace UnicornRewards.API.Models.Response
{
    public class ReadCsvResponse
    {
        public int TotalRowsParsed { get; set; }
        public int ValidRows { get; set; }
        public int InvalidRows { get; set; }
        public List<Error> Errors { get; set; } = new List<Error>();
    }

    public class Error {
        public int LineNumber { get; set; }
        public List<string> ValidationErrors { get; set; } = new List<string>();
    }
}
