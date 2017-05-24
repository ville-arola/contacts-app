using System.Linq;
using contacts_app.Models;

namespace contacts_app.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
            User testUser = new User("Erkki", "kopkop", "Erkki", "Esimerkki", "erkki.esimerkki@gmail.com");
            if (GetByUserNameAndPassword(testUser.UserName, testUser.Password) == null)
            {
                Add(testUser);
            }
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

        public User GetByUserName(string userName)
        {
            return _context.Users.FirstOrDefault(u => u.UserName == userName);
        }

        public User GetByUserNameAndPassword(string userName, string password)
        {
            return _context.Users.FirstOrDefault(u => u.UserName == userName && u.Password == password);
        }

        public void Add(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _context.Update(user);
            _context.SaveChanges();
        }

        public void Remove(int id)
        {
            _context.Remove(GetById(id));
            _context.SaveChanges();
        }
    }
}
