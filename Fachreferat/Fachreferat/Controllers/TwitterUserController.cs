using Fachreferat.Services;
using Microsoft.AspNetCore.Mvc;
using static DataMining.TwitterUserClustering;

namespace DataMining.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TwitterUserController : ControllerBase
    {      

        private readonly TwitterUserService _twitterUserService = new TwitterUserService();
        private readonly ILogger<TweetController> _logger;

        public TwitterUserController(ILogger<TweetController> logger)
        {
            _logger = logger;
        }

        [HttpGet("celb")]
        public async Task<IEnumerable<Centroid>> GetCelebrityUser()
        {
            var user = await _twitterUserService.GetCelebtrityUser();
            var centroids = KMeansCluster(user);
            return centroids;           
        }



    }
}
