using Backend_NET.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using DataAccess.Models;
using DataAccess.Dtos;
using System.Text;
using System.Web;

namespace Backend_NET.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class TipoController : ControllerBase
    {
        TipoModel model = new TipoModel();
        // GET: tipo/obtenerTipos
        [HttpGet("obtenerTipos")]
        public IActionResult obtenerTipos()
        {
            ResultDto result = new ResultDto();
            try
            {
                result.Success = true;
                result.Data = model.obtenerTipos();
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Mensaje = ex.Message;
            }
            //return Ok(result);
            return new JsonResult(result, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }
        // POST: tipo/GuardarTipo
        [HttpPost("GuardarTipo")]
        public async Task<IActionResult> GuardarTipo()
        {
            ResultDto result = new ResultDto();
            try
            {
                TipoDto data = new TipoDto();
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    //idtipo=0&nombre=Ejemplo&descripcion=EjemploDesc                    
                    string sdata = await reader.ReadToEndAsync();
                    var pdat = HttpUtility.ParseQueryString(sdata);
                    data.idtipo = Convert.ToInt32(pdat.GetValues("idtipo")[0]);
                    data.nombre = pdat.GetValues("nombre")[0];
                    data.descripcion = pdat.GetValues("descripcion")[0];
                }                
                if (data.idtipo == 0)
                {
                    int pk = model.GuardarTipo(data);
                    result.Success = true;
                    result.Data = pk;
                }
                else { // Aca va el modificar
                }
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Mensaje = ex.Message;
            }
            return new JsonResult(result, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }
    }
}
