using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using contacts_app.Models;

namespace contacts_app.Services
{
    public class ContactService : IContactService
    {
        public List<Contact> FindAllContacts()
        {
            return LoadContacts();
        }
        public Contact FindContactById(string id)
        {
            List<Contact> contacts = LoadContacts();
            return contacts.FirstOrDefault(c => c.Id == id);
        }
        /*
        public List<Contact> FindContactsByFirstName(string firstName)
        {
            return _contacts.FindAll(contact => contact.FirstName.Equals(firstName));
        }
        */
        public void SaveContact(Contact contact)
        {
            List<Contact> contacts = LoadContacts();
            if (contacts.FirstOrDefault(c => c.Id == contact.Id) == null && Regex.IsMatch(contact.Id, @"^\d+$"))
            {
                contacts.Add(new Contact(
                    contact.Id,
                    contact.FirstName,
                    contact.LastName,
                    contact.Phone,
                    contact.StreetAddress,
                    contact.City
                ));
                SaveContacts(contacts);
            }
        }
        public void Remove(string id)
        {
            List<Contact> contacts = LoadContacts();
            if (contacts.Remove(contacts.First(c => c.Id == id)))
            {
                SaveContacts(contacts);
            }
        }
        public void Update(Contact updatedContact)
        {
            List<Contact> contacts = LoadContacts();
            var contact = contacts.First(c => c.Id == updatedContact.Id);
            int i = contacts.IndexOf(contact);
            if (i != -1)
            {
                contacts[i] = updatedContact;
                SaveContacts(contacts);
            }
        }
        /*
        private int GetId()
        {
            var lastSaved = _contacts.OrderByDescending(contact => contact.Id).FirstOrDefault();
            //return lastSaved?.Id + 1 ?? 1;
            if (lastSaved != null)
            {
                return lastSaved.Id + 1;
            }
            return 1;
        }
        */
        private void SaveContacts(List<Contact> contacts)
        {
            var xml = new XElement("contacts",
                contacts.Select(c => new XElement("contact",
                    new XElement("id", c.Id),
                    new XElement("firstName", c.FirstName),
                    new XElement("lastName", c.LastName),
                    new XElement("phone", c.Phone),
                    new XElement("streetAddress", c.StreetAddress),
                    new XElement("city", c.City))
                )
            );
            File.WriteAllText("contacts.xml", xml.ToString());
        }

        private List<Contact> LoadContacts()
        {
            List<Contact> res = new List<Contact>();
            try
            {
                XDocument doc = XDocument.Load("contacts.xml");
                var contacts = doc.Element("contacts").Elements("contact");
                foreach (var c in contacts)
                {
                    res.Add(new Contact(
                        c.Element("id").Value,
                        c.Element("firstName").Value,
                        c.Element("lastName").Value,
                        c.Element("phone").Value,
                        c.Element("streetAddress").Value,
                        c.Element("city").Value
                    ));
                }
            }
            catch { }
            return res;
        }
    }
}
