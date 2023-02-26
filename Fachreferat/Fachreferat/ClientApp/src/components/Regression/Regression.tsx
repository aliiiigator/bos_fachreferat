
import React, { useEffect, useState } from "react";
import { ITweet } from "../../model/Tweet";
import { TweetService } from "../../service/TweetService";
import styles from "./Regression.module.css";
import _ from "lodash";
import { Column, Scatter } from "@ant-design/plots";
import { ColumnConfig } from "@ant-design/plots/es/interface";
import { TwitterOutlined, HeartOutlined, CommentOutlined, RetweetOutlined, MessageOutlined } from '@ant-design/icons';
import { List, Space } from "antd";
import ISO6391 from "iso-639-1";
import { Loading } from "../Loading/Loading";

export const Regression: React.FC<{}> = ({ }) => {
    
    const [tweets, setTweets] = useState([] as ITweet[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTweets()
    }, []);

    const loadTweets =  async () => {
      setLoading(true);
        var tweets = await TweetService.getElonTweets();
        setTweets(tweets);
        setLoading(false);
    }

    const config = {
      data: tweets.map(tweet => tweet.public_metrics),
      xField: 'like_count',
      yField: 'retweet_count',
      color: "#ED8D8D",
      xAxis: {
        title: {
          text: "Likes"
        }
      },
      yAxis: {
        title: {
          text: "Retweets"
        }
      },
      size: 4,
      pointStyle: {
        stroke: '#ED8D8D',
        lineWidth: 1,
        fill: '#ED8D8D',
      },
      regressionLine: {
        type: 'linear'
      }
    };

      const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      )

  
    return (<>
      {
        loading ? 
        <Loading/>:
        <div className={styles.classificationWrapper}>  
        
          <div className={styles.graphWrapper}>
            <Scatter {...config} />
          </div>
          <div className={styles.tweeListWrapper}>
              <List
                itemLayout="vertical"     
                size="small"
                dataSource={tweets}            
                renderItem={(item) => (
                  <List.Item
                    key={item.text}
                    actions={[
                      <IconText icon={HeartOutlined} text={`${item.public_metrics?.like_count}`}/>,
                      <IconText icon={RetweetOutlined} text={`${item.public_metrics?.retweet_count}`}/>,
                      <IconText icon={CommentOutlined} text={`${item.public_metrics?.reply_count}`}/>,
                      <IconText icon={MessageOutlined} text={`${item.public_metrics?.quote_count}`}/>,
                    ]}                
                  >
                    <List.Item.Meta
                      avatar={<TwitterOutlined />}
                      title={<div className={styles.tweetListTitle}>{item.text}</div>}
                    />
                  </List.Item>
                )}
              />
          </div>
            
        </div> } 
      </>)
}