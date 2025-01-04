using Dapper;
using Login.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Login.Controllers
{
    [ApiController]
    [Route("costumer")]
    public class CostumerController : ControllerBase
    {
        private readonly IDbConnection _connection;
        private readonly ILogger<CostumerController> _logger;

        public CostumerController(IDbConnection connection, ILogger<CostumerController> logger)
        {
            _connection = connection;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Costumer>>> GetAllCostumers()
        {
            try
            {
                var sql = "SELECT * FROM Costumers";
                var costumersDb = await _connection.QueryAsync<Costumer>(sql);

                if (costumersDb == null)
                {
                    return NotFound("Não foi encontrado nenhum cliente");
                }

                return Ok(costumersDb);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao buscar todos os clientes: {ex.Message}");
                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Costumer>> RegisterCostumer(Costumer costumer)
        {
            try
            {
                var sql = "INSERT INTO Costumers (CPF,Username,Email,Password) VALUES (@CPF,@Username,@Email,@Password)";
                await _connection.QueryAsync(sql, new
                {
                    CPF = costumer.CPF,
                    Username = costumer.Username,
                    Email = costumer.Email,
                    Password = costumer.Password,
                });

                _logger.LogInformation($"Cliente {costumer.Username} adicionado");

                return Ok("Cadastro realizado");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erro ao cadastrar o cliente: {ex.Message}");
                return StatusCode(500, "Erro interno do servidor.");
            }
        }

    }
}
