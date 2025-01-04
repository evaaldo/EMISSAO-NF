using System.ComponentModel.DataAnnotations;

namespace Login.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [StringLength(11)]
        public string? CPF { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}
