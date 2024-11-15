using DataAccess.Dtos;
using NpgsqlTypes;

namespace DataAccess.Models
{
    public class TipoModel
    {
        public DAO dao = new DAO();
        public TipoModel() { }
        public List<TipoDto> obtenerTipos()
        {
            List<TipoDto> result = new List<TipoDto>();
            string sql = "SELECT * FROM tipo ORDER BY 1";
            var reader = dao.Consultar(sql);
            while (reader.Read())
            {
                result.Add(new TipoDto()
                {
                    idtipo = Convert.ToInt32(reader["idtipo"]),
                    nombre = Convert.ToString(reader["nombre"]),
                    descripcion = Convert.ToString(reader["descripcion"]),
                });
                // reader.GetInt32(reader.GetOrdinal("idtipo"))
            }
            return result;
        }
        public int GuardarTipo(TipoDto data)
        {
            string sql = "INSERT INTO Tipo(Nombre, Descripcion) VALUES(@name,@desc) RETURNING idTipo";
            List<ParameterDto> parameters = [
                new ParameterDto { name = "@name", type = NpgsqlDbType.Varchar, value = data.nombre },
                new ParameterDto { name = "@desc", type = NpgsqlDbType.Varchar, value = data.descripcion }
            ];
            int pk = dao.Insertar(sql, parameters);
            return pk;
        }

    }
}
