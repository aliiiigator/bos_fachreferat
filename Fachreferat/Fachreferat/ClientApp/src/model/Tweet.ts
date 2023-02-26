export interface ITweet{
    id: string;
    edit_history_tweet_ids: string[];
    text: string;
    lang: string;
    public_metrics :IPublicMetricsTweet;
}

export interface IPublicMetricsTweet{
    like_count :number; 
    reply_count :number; 
    retweet_count :number; 
    quote_count :number; 
        
}