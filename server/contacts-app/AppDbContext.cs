using contacts_app.Models;
using Microsoft.EntityFrameworkCore;

namespace contacts_app
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().ToTable("Contact");
        }
    }
}
