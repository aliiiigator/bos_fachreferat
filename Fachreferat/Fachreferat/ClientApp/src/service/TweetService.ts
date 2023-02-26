import httpClient from "../httpClient";
import { ITweet } from "../model/Tweet";


export abstract class TweetService{
    
    public static async getRandomTweets(): Promise<ITweet[]> {
        const respons = await httpClient.get<ITweet[]>("/tweet/random");
        return respons.data;
      }

      public static async getElonTweets(): Promise<ITweet[]> {
        const respons = await httpClient.get<ITweet[]>("/tweet/elon");
        return respons.data;
      }
    
}