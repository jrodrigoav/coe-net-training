using UnicornRewards.API.Models;

namespace UnicornRewards.API.Database
{
    public class UnicornRepository : IUnicornRepository
    {
        private readonly ApiContext _context;
        public UnicornRepository(ApiContext context)
        {
            _context = context;
            SetUp();
        }

        public void SetUp()
        {
            Album category = new Album() { Id = 0, UserId = 23, Title = "Holi" };
            _context.Album.Add(category);
            SaveChanges();
        }
        public List<Album> GetAlbumsByUser(int userId)
        {
            return _context.Album.Where(a => a.UserId == userId).ToList();
        }

        public void AddAlbums(List<Album> albums)
        {
            _context.Album.AddRange(albums);

        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
