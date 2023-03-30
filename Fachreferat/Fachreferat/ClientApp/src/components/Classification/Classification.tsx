
import React, { useEffect, useState } from "react";
import { ITweet } from "../../model/Tweet";
import { TweetService } from "../../service/TweetService";
import styles from "./Classification.module.css";
import _ from "lodash";
import { Column } from "@ant-design/plots";
import { ColumnConfig } from "@ant-design/plots/es/interface";
import { TwitterOutlined, HeartOutlined, CommentOutlined, RetweetOutlined, MessageOutlined } from '@ant-design/icons';
import { List, Space } from "antd";
import ISO6391 from "iso-639-1";
import { Loading } from "../Loading/Loading";

export const Classification: React.FC<{}> = ({ }) => {
    
    const [tweets, setTweets] = useState([] as ITweet[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTweets()
        console.log()
    }, []);

    const loadTweets =  async () => {
        setLoading(true);
        var tweets = await TweetService.getRandomTweets();
        setTweets(tweets);
        setLoading(false);
    }

    const getFullLangName = (lang: string) => {
      return ISO6391.getName(lang) == "" ? lang: ISO6391.getName(lang);
    }

    const dataGraph =_.orderBy(( _.chain(tweets).groupBy("lang").map((tweets, key) => ({lang: getFullLangName(key), langCount: tweets.length}))).value(), "lang") ;

    const config = {
        data: dataGraph,
        loading: false,
        xField: 'lang',
        yField: 'langCount',
        color:"#ED8D8D",
        label: {
          position: 'middle',
          style: {
            fill: '#FFFFFF',
            opacity: 0.6,
          },
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        }  ,
        meta: {
          type: {
            alias: '类别',
          },
          sales: {
            alias: '销售额',
          },
        }     
      } as ColumnConfig
     

      const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
      );

    return (<>
    {
      loading ? 
      <Loading/>:
      <div className={styles.classificationWrapper}>  
      <div className={styles.graphWrapper}>
          <Column {...config} /> 
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
                  description={`Sprache: ${getFullLangName(item.lang)}`}
                />
              </List.Item>
            )}
          />
      </div>
    </div> } 
    </>)

}