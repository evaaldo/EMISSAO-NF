using AutoMapper;
using Dapper;
using Login.DTOs;
using Login.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Login.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly IDbConnection _connection;
        private readonly ILogger<AuthController> _logger;
        private readonly IMapper _mapper;

        public AuthController(IDbConnection connection, ILogger<AuthController> logger, IMapper mapper)
        {
            _connection = connection;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<AuthDTO>> AuthCostumer(AuthDTO costumer) 
        {
            try
            {
                if (string.IsNullOrWhiteSpace(costumer.Username) || string.IsNullOrWhiteSpace(costumer.Password))
                {
                    return BadRequest("Usuário e senha são obrigatórios");
                }

                _logger.LogInformation($"Costumer: {costumer.Username} | Password: {costumer.Password}");

                var sql = "SELECT * FROM Costumers WHERE Username = @Username AND Password = @Password";
                var costumerDb = await _connection.QueryFirstOrDefaultAsync<Costumer>(sql, new { costumer.Username, costumer.Password });

                if (costumerDb == null)
                {
                    return Unauthorized("Usuário não encontrado");
                }

                var token = CreateToken(costumerDb);

                var costumerDto = _mapper.Map<AuthDTO>(costumerDb);

                return Ok(new { Message = "Usuário validado", Token = token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar cliente.");
                return StatusCode(500, "Erro interno do servidor.");
            }
        }

        private string CreateToken(Costumer costumer)
        {
            var key = Encoding.ASCII.GetBytes(Key.Secret);
            var tokenConfig = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                {
                    new Claim("costumerId", costumer.CostumerID.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenConfig);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        [HttpGet("validate-token/{token}")]
        public ActionResult ValidateToken(string token)
        {
            if(string.IsNullOrWhiteSpace(token))
            {
                return BadRequest("Nenhum token foi passado");
            };

            try
            {
                var key = Encoding.ASCII.GetBytes(Key.Secret);
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };

                tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);
                return Ok("Token válido");

            }
            catch (SecurityTokenException ex)
            {
                _logger.LogWarning(ex, "Token inválido");
                return Unauthorized("Token inválido");
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Erro ao validar o token");
                return StatusCode(500, "Erro interno do servidor");
            }
        }
    }
}
