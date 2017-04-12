using System.Collections.Generic;
using contacts_app.Models;
using contacts_app.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace contacts_app.Controllers
{
    [Route("api/contacts")]
    [EnableCors("MyPolicy")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public List<Contact> GetAll()
        {
            return _contactService.FindAllContacts();
        }

        [HttpGet("{id}", Name = "GetContact")]
        public Contact GetById(string id)
        {
            return _contactService.FindContactById(id);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact contact)
        {
            _contactService.SaveContact(contact);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }
            var contactToUpdate = _contactService.FindContactById(id);
            if (contactToUpdate == null)
            {
                return NotFound();
            }
            contactToUpdate.FirstName = contact.FirstName;
            contactToUpdate.LastName = contact.LastName;
            contactToUpdate.Phone = contact.Phone;
            contactToUpdate.StreetAddress = contact.StreetAddress;
            contactToUpdate.City = contact.City;
            _contactService.Update(contactToUpdate);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var contact = _contactService.FindContactById(id);
            if (contact == null)
            {
                return NotFound();
            }

            _contactService.Remove(id);
            return new NoContentResult();
        }
    }
}
