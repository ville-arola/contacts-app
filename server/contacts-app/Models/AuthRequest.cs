using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace contacts_app.Models
{
    public class AuthRequest
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public AuthRequest(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }
    }
}
