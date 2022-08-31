using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UnicornRewards.API.Database;
using UnicornRewards.API.Models;

namespace UnicornRewards.API.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IUnicornRepository _unicornRepo;

        public AlbumService(IUnicornRepository unicornRepo)
        {
            _unicornRepo = unicornRepo;
        }

        public async Task<List<Album>> GetAlbums(int userId)
        {
            var response =  _unicornRepo.GetAlbumsByUser(userId);
            return response;
        }

        public async Task<string> AddAlbums(List<Album> albums)
        {
            try
            {
                _unicornRepo.AddAlbums(albums);
                _unicornRepo.SaveChanges();
            }
            catch (Exception e)
            {
                return e.Message;
            }

            return "Ok";
        }
    }
}
