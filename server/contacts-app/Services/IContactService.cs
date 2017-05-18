using System.Collections.Generic;
using contacts_app.Models;

namespace contacts_app.Services
{
    public interface IContactService
    {
        List<Contact> GetAll();
        Contact GetById(int id);
        void Add(Contact contact);
        void Update(Contact updatedContact);
        void Remove(int id);
    }
}
