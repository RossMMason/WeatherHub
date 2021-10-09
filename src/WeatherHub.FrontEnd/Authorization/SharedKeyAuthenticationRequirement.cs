// <copyright file="SharedKeyAuthenticationRequirement.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Authorization
{
    using Microsoft.AspNetCore.Authorization;

    public class SharedKeyAuthenticationRequirement : IAuthorizationRequirement
    {
    }
}
