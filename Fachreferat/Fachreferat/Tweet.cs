using Fachreferat.Services;

namespace DataMining
{
    public class Tweet
    {
        public string Id{ get; set; }
        public List<string> Edit_history_tweet_ids { get; set; }
        public string Text { get; set; }
        public string Lang { get; set; }
        public PublicMetricsTweet Public_metrics { get; set; }
        public DateTime Created_at { get; set; }


        public bool IsValid()
        {
            return !string.IsNullOrEmpty(Id) && !string.IsNullOrEmpty(Text) && !string.IsNullOrEmpty(Lang) && Edit_history_tweet_ids.Count > 0 && Public_metrics != null && Created_at != null;
        }
    }

    public class PublicMetricsTweet
    {
        public int Like_count { get; set; }
        public int Reply_count { get; set; }
        public int Retweet_count { get; set; }
        public int Quote_count { get; set; }
    }

    public class TweetDto
    {
        public Tweet data { get; set; }
    }

    public class TweetsDto
    {
        public List<Tweet> data { get; set; }
    }
}
