namespace UnicornRewards.API.Models.Entities
{
    public class GenericResponse<T>
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public T ResponseResult { get; set; }
    }
}
