using contacts_app.Models;
using contacts_app.Repository;

namespace contacts_app.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetById(int id)
        {
            return _userRepository.GetById(id);
        }

        public User GetByUserName(string userName)
        {
            return _userRepository.GetByUserName(userName);
        }

        public User GetByUserNameAndPassword(string userName, string password)
        {
            return _userRepository.GetByUserNameAndPassword(userName, password);
        }

        public void Add(User user)
        {
            _userRepository.Add(user);
        }

        public void Update(User user)
        {
            _userRepository.Update(user);
        }

        public void Remove(int id)
        {
            _userRepository.Remove(id);
        }
    }
}
