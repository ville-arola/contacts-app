using contacts_app.Models;

namespace contacts_app.Services
{
    public interface IUserService
    {
        User GetById(int id);
        User GetByUserName(string userName);
        User GetByUserNameAndPassword(string userName, string password);
        void Add(User user);
        void Update(User user);
        void Remove(int id);
    }
}
