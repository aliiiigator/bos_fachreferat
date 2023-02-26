
import httpClient from "../httpClient";
import { ICentroid } from "../model/Centroid";

export abstract class TwitterUserService{
    
    public static async getCelebCluster(): Promise<ICentroid[]> {
      const respons = await httpClient.get<ICentroid[]>("/twitteruser/celb");
      return respons.data;
    }

}
