namespace DataMining
{
    public class TwitterUserClustering
    {
        public static List<Centroid> KMeansCluster(IEnumerable<TwitterUser> users)
        {
            var random = new Random();

            var k = 3;

            var centroids = new Centroid[k];
            for (int i = 0; i< centroids.Length; i++)
            {
                var x = (double)1 / (k * 2) + (double)1 / (k * 2) * (2* i);
                var y = (double)1 / (k * 2) + (double)1 / (k * 2) * (2* i);
                centroids[i] = new Centroid(i, x, y);
            }

            var maxFollowerCount = users.Max(u => u.Public_metrics.Followers_count);
            var maxTweetCount = users.Max(u => u.Public_metrics.Tweet_count);

            foreach(var user in users)
            {
                double x = (double)user.Public_metrics.Followers_count / maxFollowerCount;
                double y = (double)user.Public_metrics.Tweet_count / maxTweetCount;

                var closest = centroids.Aggregate((firstCentroid, secondCentroid) => (Math.Abs(firstCentroid.X- x) + Math.Abs(firstCentroid.Y - y)) < (Math.Abs(secondCentroid.X - x) + Math.Abs(secondCentroid.Y - y)) ? firstCentroid : secondCentroid);

                var props = new KMeansProperties(x, y, closest.Id);
                user.KMeansProps= props;

                closest.AddUser(user);
                closest.UpdateCenter(maxFollowerCount, maxTweetCount);

            }
            return centroids.ToList();

        }       


        public class Centroid
        {
            public Centroid(int k, double x, double y)
            {
                Id = k;
                X = x;
                Y = y;
                AssignedUsers = new List<TwitterUser>();
            }

            public int Id { get; set; }
            public double X { get; set; }
            public double Y { get; set; }
            public List<TwitterUser> AssignedUsers { get; set; }

            public void AddUser(TwitterUser user)
            {
                AssignedUsers.Add(user);
            }

            public void UpdateCenter(int maxFollowerCount, int maxTweetCount)
            {
                if(AssignedUsers.Count > 0)
                {
                    var averageX = AssignedUsers.Average(user => (double)user.Public_metrics.Followers_count / maxFollowerCount);
                    var averageY = AssignedUsers.Average(user => (double)user.Public_metrics.Tweet_count / maxTweetCount);

                    X = averageX;
                    Y = averageY;
                }                  
            }
        }
    }

    

}
