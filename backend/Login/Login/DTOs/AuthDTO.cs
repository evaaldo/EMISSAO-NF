using System.ComponentModel.DataAnnotations;

namespace Login.DTOs
{
    public class AuthDTO
    {
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
