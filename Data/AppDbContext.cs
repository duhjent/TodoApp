using Microsoft.EntityFrameworkCore;
using TodoApp.Domain;

namespace TodoApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoTag>()
                .HasKey(tt => new { tt.TagId, tt.TodoId });
            modelBuilder.Entity<TodoTag>()
                .HasOne(tt => tt.Tag)
                .WithMany(tag => tag.Todos)
                .HasForeignKey(tt => tt.TagId);
            modelBuilder.Entity<TodoTag>()
                .HasOne(tt => tt.Todo)
                .WithMany(todo => todo.Tags)
                .HasForeignKey(tt => tt.TodoId);
        }

        public DbSet<Todo> Todos { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TodoTag> TodoTags { get; set; }
    }
}