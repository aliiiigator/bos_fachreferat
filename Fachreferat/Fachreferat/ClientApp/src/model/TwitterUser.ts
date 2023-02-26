export interface ITwitterUser{
    id: string;
    name: string;
    username: string;
    public_metrics: IPublicMetricsUser;
    kMeansProps: IKMeansProps;
}

export interface IPublicMetricsUser{

    followers_count: number;
    following_count: number;
    tweet_count : number;
    listed_count : number;

}

export interface IKMeansProps{
    x: number;
    y: number;
    centroidId: number;
}


export interface IClusterGraphProps{
    name: string
    x: number;
    y: number;
    centroidId: number;
    shape: number
}


export function creatClusterGraphProps(name: string, x: number, y: number, centroidId: number, isCenterOfCentroid :boolean = false ):IClusterGraphProps {
    return Object.assign(
        {
            name: name,
            x: x,
            y: y,
            centroidId: centroidId,
            shape: isCenterOfCentroid ? 1: 0
            
        }
    );
}