
import React, { useEffect, useState } from "react";
import styles from "./Loading.module.css";
import { LoadingOutlined} from '@ant-design/icons';

export const Loading: React.FC<{}> = ({ }) => {
        
    return (
    <div className={styles.loadingWrapper}>  
        <LoadingOutlined color="#1677ff"/> 
    </div>)

}