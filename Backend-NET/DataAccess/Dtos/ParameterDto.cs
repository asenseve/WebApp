using NpgsqlTypes;

namespace DataAccess.Dtos
{
    public class ParameterDto
    {
        public string name { get; set; }
        public object value { get; set; }
        public NpgsqlDbType type { get; set; }
    }
}
