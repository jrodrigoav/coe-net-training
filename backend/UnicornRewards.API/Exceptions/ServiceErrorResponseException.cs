namespace UnicornRewards.API.Exceptions;

public class ServiceErrorResponseException : AppBaseException
{
    public string ServiceName { get; set; }

    public ServiceErrorResponseException(string serviceName, string details)
    : base(5001, $"[ErrorCode {5001}]. Unable to reache [{serviceName}]. (Details: {details})", details)
    {
        this.ErrorCode = 5001;
        this.ServiceName = serviceName;
        this.Details = details;

    }
}

