// <copyright file="SharedKeyAuthenticationRequirementAuthorizationHandler.cs" company="Ross Mason">
// Licensed under the MIT License. See LICENSE file in the project root for full license information.
// </copyright>

namespace WeatherHub.FrontEnd.Authorization
{
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.Extensions.Primitives;

    public class SharedKeyAuthenticationRequirementAuthorizationHandler : AuthorizationHandler<SharedKeyAuthenticationRequirement, HubInvocationContext>
    {
        private SharedKeys _sharedKeys;

        public SharedKeyAuthenticationRequirementAuthorizationHandler(SharedKeys sharedKeys)
        {
            _sharedKeys = sharedKeys;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            SharedKeyAuthenticationRequirement requirement,
            HubInvocationContext resource)
        {
            var authenticateTokenAttribute = resource
                .HubMethod.CustomAttributes
                .OfType<AuthenticateTokenAttribute>()
                .FirstOrDefault();

            if (authenticateTokenAttribute == null)
            {
                // We only authenticate where this attribute is present so this request is authorized.
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            if (resource.Context.GetHttpContext().Request.Headers.TryGetValue("Authorization", out StringValues authHeaderValues))
            {
                var authHeader = authHeaderValues.ToString();

                if (!authHeader.StartsWith("SharedKey "))
                {
                    context.Fail();
                    return Task.CompletedTask;
                }

                string key = authHeader.Substring(9).Trim();

                if (key == _sharedKeys.SignalRSharedKey)
                {
                    context.Succeed(requirement);
                }
                else
                {
                    context.Fail();
                }

                return Task.CompletedTask;
            }
            else
            {
                context.Fail();
                return Task.CompletedTask;
            }
        }
    }
}
