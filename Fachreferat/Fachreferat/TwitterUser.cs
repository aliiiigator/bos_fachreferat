using System;
using System.Collections.Generic;

namespace DataMining
{
    public class TwitterUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Username { get; set; }
        public PublicMetricsUser Public_metrics { get; set; }
        public KMeansProperties KMeansProps { get; set; }
    }

    public class PublicMetricsUser
    {
        public int Followers_count { get; set; }
        public int Following_count { get; set; }
        public int Tweet_count { get; set; }
        public int Listed_count { get; set; }
    }

    public class KMeansProperties
    {
        public KMeansProperties(double x, double y, int centroidId)
        {
            X = x;
            Y = y;
            CentroidId = centroidId;
        }

        public double X { get; set; }
        public double Y { get; set; }
        public int CentroidId { get; set; }
    }

    public class TwitterUserDto
    {
        public List<TwitterUser> data { get; set; }
    }
}
