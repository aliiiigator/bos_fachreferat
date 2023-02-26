
import React, { useEffect, useState } from "react";
import { ITweet } from "../../model/Tweet";
import { TweetService } from "../../service/TweetService";
import styles from "./Cluster.module.css";
import _ from "lodash";
import { ICentroid } from "../../model/Centroid";
import { TwitterUserService } from "../../service/TwitterUserService";
import { List, Space } from "antd";
import { TwitterOutlined, TeamOutlined } from '@ant-design/icons';
import { creatClusterGraphProps, IClusterGraphProps, IKMeansProps, ITwitterUser } from "../../model/TwitterUser";
import { Scatter } from "@ant-design/plots";
import { Loading } from "../Loading/Loading";

export const Cluster: React.FC<{}> = ({ }) => {
    
    const [centroids, setcentroids] = useState([] as ICentroid[]);
    const [allUsers, setAllUsers] = useState([] as ITwitterUser[]);
    const [diagrammData, setDiagrammData] = useState([]as IClusterGraphProps[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      loadCetroids()
    }, []);

    const loadCetroids =  async () => {
        setLoading(true);
        var celebCluster = await TwitterUserService.getCelebCluster();
        var users = getAlUser(celebCluster);
        setcentroids(celebCluster);
        setAllUsers(users);
        mapUser(celebCluster)
        setLoading(false);
    }

   
    const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
    const getAlUser= (celebCluster: ICentroid[]):ITwitterUser[] => {
      var allUsers = [] as ITwitterUser[];
      celebCluster.forEach(cetroid => {
        allUsers = [...allUsers, ...cetroid.assignedUsers]
      })
      return allUsers.sort((a,b) => a.name > b.name ? 1: 0);
    }

    const mapUser = (centroids: ICentroid[]) => {
      var max 
      var data = [] as IClusterGraphProps[];
      centroids.forEach(cetroid => {
          var user = cetroid.assignedUsers.map(user => creatClusterGraphProps(user.name, user.kMeansProps.x, user.kMeansProps.y, user.kMeansProps.centroidId, false) );
          data = [...data, ...user]
          data.push(creatClusterGraphProps("Center", cetroid.x, cetroid.y, cetroid.id, true));
      });
      setDiagrammData(data);
    
    }

    
   
    const config = {
      appendPadding: 1,
      data : diagrammData,
      xField: 'x',
      yField: 'y',
      colorField: 'centroidId',
      shapeField: 'shape',
      shape:['circle', 'triangle'],
      color: ["#E8D2A6", "#ED8D8D","#4D4545"],      
      size: 7,
      yAxis: {
        nice: true,
        line: {
          style: {
            stroke: '#aaa',
          },
        },
        title: {
          text: "Tweets"
        }
      },
      xAxis: {
        grid: {
          line: {
            style: {
              stroke: '#eee',
            },
          },
        },
        line: {
          style: {
            stroke: '#eee',
          },
        },
        title: {
          text: "Follower"
        }
      },
      tooltip: {
        fields: ['name', "x", 'y'],
      }
    };
  


return (<>
  {
    loading ? 
    <Loading/>:
    <div className={styles.clusterWrapper}>  
    <div className={styles.graphWrapper}>
        <Scatter {...config} legend={false}/>
      </div>
    <div className={styles.tweeListWrapper}>
  <List
          itemLayout="vertical"     
          size="small"
          dataSource={allUsers}            
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText icon={TeamOutlined } text={`${item.public_metrics.followers_count}`}/>,
                <IconText icon={TwitterOutlined} text={`${item.public_metrics.tweet_count}`}/>,
              ]}                
            >
              <List.Item.Meta
                avatar={<TwitterOutlined />}
                title={<div className={styles.tweetListTitle}>{item.name}</div>}
                description={`@${item.username}`}
              />
            </List.Item>
          )}
        />
        </div>
  </div>} 
  </>)

}