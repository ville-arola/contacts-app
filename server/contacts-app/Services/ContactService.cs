using System.Collections.Generic;
using contacts_app.Models;
using contacts_app.Repository;

namespace contacts_app.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public List<Contact> GetAll()
        {
            return _contactRepository.GetAll();
        }

        public Contact GetById(int id)
        {
            return _contactRepository.GetById(id);
        }

        public void Add(Contact contact)
        {
            _contactRepository.Create(contact);
        }

        public void Remove(int id)
        {
            _contactRepository.Remove(id);
        }

        public void Update(Contact updatedContact)
        {
            _contactRepository.Update(updatedContact);
        }
    }
}
