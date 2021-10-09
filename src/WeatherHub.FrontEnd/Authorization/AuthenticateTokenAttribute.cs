// <copyright file="AuthenticateTokenAttribute.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Authorization
{
    using System;

    public class AuthenticateTokenAttribute : Attribute
    {
        public AuthenticateTokenAttribute()
        {
        }
    }
}
