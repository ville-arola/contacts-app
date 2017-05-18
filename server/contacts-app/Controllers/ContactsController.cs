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
            return _contactService.GetAll();
        }

        [HttpGet("{id}")]
        public Contact GetById(int id)
        {
            return _contactService.GetById(id);
        }

        [HttpPost]
        public void Post([FromBody]Contact contact)
        {
            _contactService.Add(contact);
        }

        [HttpPut("{id}")]
        public void Update(int id, [FromBody] Contact contact)
        {
            _contactService.Update(contact);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _contactService.Remove(id);
        }
    }
}
