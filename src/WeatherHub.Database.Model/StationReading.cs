using System;

namespace WeatherHub.Database.Model
{
    public class StationReading
    {
        public Guid Id { get; set; }

        public WeatherStation Station { get; set; }

        public DateTime When { get; set; }

        public float DewpointC { get; set; }

        public float HeatIndexC { get; set; }

        public float PressureMb { get; set; }

        public float RelativeHuimidity { get; set; }

        public float TempC { get; set; }

        public float WindDegrees { get; set; }

        public float WindMph { get; set; }

        public float WindGustMph { get; set; }

        public float WindChillC { get; set; }

        public float RainCmPerHour { get; set; }
    }
}
