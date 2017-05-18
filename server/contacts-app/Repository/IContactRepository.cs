using contacts_app.Models;
using System.Collections.Generic;

namespace contacts_app.Repository
{
    public interface IContactRepository
    {
        List<Contact> GetAll();
        Contact GetById(int id);
        void Create(Contact contact);
        void Update(Contact contact);
        void Remove(int id);
    }
}
