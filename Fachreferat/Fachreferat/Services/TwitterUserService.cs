
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http.Headers;
using System.Text.Json;
using DataMining;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace Fachreferat.Services
{
    public class TwitterUserService
    {

        private static HttpClient _httpClient = new HttpClient() { BaseAddress = new Uri("https://api.twitter.com"), DefaultRequestHeaders = { Authorization = new AuthenticationHeaderValue("Bearer", token) } };
        private readonly JsonSerializerOptions _options;
        private const string token = "AAAAAAAAAAAAAAAAAAAAAOz8kwEAAAAAdt%2BqwVgLlrkmxR%2BUIQCtC%2FmCd5I%3Dyv8NSBu4gVWPosYcIM59QVGK9cuinRutoeFJuUsZ0oDwWeBCPA";

        public TwitterUserService()
        {
            _options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        }

        public async Task<IEnumerable<TwitterUser>> GetCelebtrityUser()
        {
            List<CelebrityUser> celebrityUsersCSV = File.ReadAllLines("./CelebrityTwitterAccounts.csv").Skip(1).Take(30).Select(v => CelebrityUser.FromCsv(v)).ToList();

            var twitterUsers = await LoadTwitterUser(string.Join(",", celebrityUsersCSV.Select(user => user.UserName)));

            return twitterUsers;
        }

        private async Task<List<TwitterUser>> LoadTwitterUser(string userNames)
        {
            var users = new List<TwitterUser>();
            var url = $"https://api.twitter.com/2/users/by?usernames={userNames}&user.fields=public_metrics";

            try
            {
                var result = await _httpClient.GetAsync(url);
                var res = await result.Content.ReadAsStringAsync();

                users = JsonConvert.DeserializeObject<TwitterUserDto>(res).data;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

            return users;
        }
    }

    class CelebrityUser
    {
        public string UserName { get; set; }
        public string Domain { get; set; }
        public string FullName { get; set; }

        public static CelebrityUser FromCsv(string csvLine)
        {
            string[] values = csvLine.Split(',');
            var celeb = new CelebrityUser();
            celeb.UserName = values[0];
            celeb.Domain = values[1];
            celeb.FullName = values[1];
            return celeb;
        }
    }
}
