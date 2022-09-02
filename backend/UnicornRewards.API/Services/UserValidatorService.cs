using FluentValidation;
using UnicornRewards.API.Models.Entities;

namespace UnicornRewards.API.Services
{
    public class UserValidatorService : AbstractValidator<User>
    {
        public UserValidatorService()
        {
            RuleFor(x => x.Id)
                .Must((id) => id > 0).WithMessage("Id must be greater than 0")
                .NotEmpty().WithMessage("Id is required");
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .MaximumLength(300).WithMessage("Name length must be less than 300");
            RuleFor(x => x.UserName)
                .Matches("^[A-Za-z0-9_-]*$").WithMessage("'{PropertyName}' only accepts characters and numbers.")
                .Matches("^[A-Za-z]").WithMessage("'{PropertyName}' must start with a letter.");
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("A valid email is required");
        }
    }
}
