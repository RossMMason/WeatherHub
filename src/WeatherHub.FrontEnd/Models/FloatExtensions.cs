// <copyright file="FloatExtensions.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Models
{
    public static class FloatExtensions
    {
        public static float ToCmFromInches(this float inches)
        {
            return inches * 2.54f;
        }

        public static float ToCelsiusFromFahrenheit(this float fahrenheit)
        {
            return (fahrenheit - 32f) * (5f / 9f);
        }

        public static float ToMbarFromInHG(this float inHG)
        {
            return inHG / 0.029530f;
        }
    }
}
