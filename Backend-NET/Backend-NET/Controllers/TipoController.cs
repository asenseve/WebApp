using Backend_NET.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Backend_NET.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class TipoController : ControllerBase
    {
        // GET: tipo/obtenerTipos
        [HttpGet("obtenerTipos")]
        public IActionResult obtenerTipos()
        {
            ResultDto result = new ResultDto();
            try
            {
                result.Success = true;
                result.Data = "Devolvio";
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Mensaje = ex.Message;
            }
            //return Ok(result);
            return new JsonResult(result, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

    }
}
