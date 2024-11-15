using DataAccess.Dtos;
using Npgsql;

namespace DataAccess
{
    public class DAO
    {
        const string? _connString = "Host=localhost:5432;Username=postgres;Password=Senale;Database=dbDES";
        private NpgsqlDataSourceBuilder _dataSourceBuilder = new NpgsqlDataSourceBuilder(_connString);
        private NpgsqlDataSource _dataSource;
        protected NpgsqlConnection _conn;

        public DAO()
        {
            _dataSource = _dataSourceBuilder.Build();
        }
        public NpgsqlDataReader Consultar(string sql)
        {
            _conn = _dataSource.OpenConnection();
            using var cmd = _conn.CreateCommand();
            cmd.CommandText = sql;
            var reader = cmd.ExecuteReader();
            return reader;
        }
        public int Insertar(string sql, List<ParameterDto> parameters)
        {
            _conn = _dataSource.OpenConnection();
            using var cmd = _conn.CreateCommand();
            cmd.CommandText = sql;
            foreach (var par in parameters)
            {
                cmd.Parameters.AddWithValue(par.name, par.type, par.value);
            }
            int id = (int)cmd.ExecuteScalar();
            return id;
        }

    }
}
