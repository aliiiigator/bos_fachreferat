using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Fachreferat.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static DataMining.TwitterUserClustering;

namespace DataMining.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TweetController : ControllerBase
    {      

        private readonly TwitterService _twitterService = new TwitterService();
        private readonly ILogger<TweetController> _logger;

        public TweetController(ILogger<TweetController> logger)
        {
            _logger = logger;
        }

        [HttpGet("random")]
        public async Task<IEnumerable<Tweet>> GetRandomTweets()
        {
            var tweets = await _twitterService.RequestRandomTweets();
            return tweets;
        }
        [HttpGet("elon")]
        public async Task<IEnumerable<Tweet>> GeElonMuskTimeline()
        {
            var tweets = await _twitterService.GetElonMuskTweets();
            return tweets;
        }

    }
}
