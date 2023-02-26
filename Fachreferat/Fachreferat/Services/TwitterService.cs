
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using DataMining;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace Fachreferat.Services
{
    public class TwitterService
    {

        private static HttpClient _httpClient = new HttpClient() { BaseAddress = new Uri("https://api.twitter.com"), DefaultRequestHeaders = { Authorization = new AuthenticationHeaderValue("Bearer", token) } };
        private readonly JsonSerializerOptions _options;
        private const string token = "AAAAAAAAAAAAAAAAAAAAAOz8kwEAAAAAdt%2BqwVgLlrkmxR%2BUIQCtC%2FmCd5I%3Dyv8NSBu4gVWPosYcIM59QVGK9cuinRutoeFJuUsZ0oDwWeBCPA";

        public static readonly string[] defaultTweetFields = { "lang", "public_metrics", "created_at" };

        public const string randomTweetChacheKey = "randomTweets";
        public MemoryCache randomTweetCache = new MemoryCache(new MemoryCacheOptions() { ExpirationScanFrequency = new TimeSpan(0,15,0)});


        public TwitterService()
        {
            _options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        }

        public async Task<IEnumerable<Tweet>> RequestRandomTweets(int count = 20)
        {

            var tweets = await LoadTweetsOfFromCache($"/2/tweets/sample/stream?tweet.fields={string.Join(",", defaultTweetFields)}", count, (tweet) => !string.IsNullOrEmpty(tweet.Lang), "./TweetTmp.txt");
            return tweets;
        }

        public async Task<IEnumerable<Tweet>> GetElonMuskTweets()
        {
            var tweets = await LoadTweetsAsync($"/2/users/44196397/tweets?tweet.fields={string.Join(",", defaultTweetFields)}&exclude=retweets,replies&max_results=50");

            return tweets;
        }

        private async Task<IEnumerable<Tweet>> LoadTweetsOfFromCache(string url, int count, Func<Tweet, bool> meetRequirements, string fileName)
        {
            var tweets = randomTweetCache.Get<List<Tweet>>(randomTweetChacheKey);

            /*if (tweets != null)
            {
                if(tweets.Count > 0) randomTweetCache.Set(randomTweetChacheKey, tweets);                                
            }*/

            var lines = File.ReadAllLines("./TweetTmp.txt");
            if (lines?.Length > 0 && lines[0] != "")
            {
                List<Tweet> tweetsCsv = lines.Select(v => System.Text.Json.JsonSerializer.Deserialize<Tweet>(v)).ToList();
                             
                return tweetsCsv;
            }

            tweets = (await LoadTweetsStream(url, count, meetRequirements)).ToList();

            using (var file = File.CreateText("./TweetTmp.txt"))
            {
                foreach (var tweet in tweets)
                {
                    file.WriteLine(System.Text.Json.JsonSerializer.Serialize(tweet));
                }
            }

            return tweets ?? new List<Tweet>();
        }


        private async Task<IEnumerable<Tweet>> LoadTweetsStream(string url, int count, Func<Tweet, bool> meetRequirements)
        {
            var tweets = new List<Tweet>();

            try
            {

                var stream = await _httpClient.GetStreamAsync(url);
                using (var reader = new StreamReader(stream))
                {
                    while (!reader.EndOfStream && tweets.Count < count)
                    {
                        var currentLine = reader.ReadLine();
                        try
                        {
                            var tweet = System.Text.Json.JsonSerializer.Deserialize<TweetDto>(currentLine, _options)?.data;
                            if (tweet.IsValid() && meetRequirements(tweet)) tweets.Add(tweet);
                        }
                        catch { }

                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return tweets;
        }


        private async Task<List<Tweet>> LoadTweetsAsync(string url)
        {
            var tweets = new List<Tweet>();

            try
            {

                var result = await _httpClient.GetAsync(url);
                var res = await result.Content.ReadAsStringAsync();

                tweets = System.Text.Json.JsonSerializer.Deserialize<TweetsDto>(res, _options).data;
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return tweets;
        }

    }
    
}
