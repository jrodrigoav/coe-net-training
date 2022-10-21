namespace UnicornRewards.API.Exceptions;

public class AppBaseException : Exception
{
    public int ErrorCode { get; set; } = -9999;
    public string Details { get; set; } = "";
    public new string Message { get; set; } = "";

    public AppBaseException(int errorCode, string message, string details)
    : base(message)
    {
        this.ErrorCode = errorCode;
        this.Details = details;
    }
}

