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

    public class User { 
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string WebSite { get; set; }
    }
}
