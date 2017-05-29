using System;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;

namespace contacts_app.Config
{
    public class TokenAuthOption
    {
        public static string Audience { get; } = "AppAudience";
        public static string Issuer { get; } = "AppIssuer";
        public static RsaSecurityKey Key { get; } = new RsaSecurityKey(rsa());
        public static SigningCredentials SigningCredentials { get; } = new SigningCredentials(Key, SecurityAlgorithms.RsaSha256Signature);
        public static TimeSpan ExpiresSpan { get; } = TimeSpan.FromMinutes(120);
        public static string TokenType { get; } = "Bearer";

        private static RSA rsa()
        {
            using (var rsa = RSA.Create())
            {
                rsa.KeySize = 2048;
                return rsa;
            }
        }
    }
}
