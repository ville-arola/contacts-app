using contacts_app.Models;
using System.Collections.Generic;
using System.Linq;

namespace contacts_app.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly AppDbContext _context;

        public ContactRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Contact> GetAll()
        {
            return _context.Contacts.ToList();
        }

        public Contact GetById(int id)
        {
            return _context.Contacts.FirstOrDefault(c => c.Id == id);
        }

        public void Create(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
        }
        
        public void Update(Contact contact)
        {
            _context.Contacts.Update(contact);
            _context.SaveChanges();
        }

        public void Remove(int id)
        {
            _context.Contacts.Remove(GetById(id));
            _context.SaveChanges();
        }
    }
}
