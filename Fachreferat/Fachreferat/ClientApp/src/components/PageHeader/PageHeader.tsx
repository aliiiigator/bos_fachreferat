import React from "react";
import styles from "./PageHeader.module.css";

export const PageHeader: React.FC<{}> = ({ }) => {

    
    return (
        <div className={styles.pageHeaderWrapper}>     
            <div className={styles.title}>
                Fachreferat
            </div>  
            <div className={styles.subTitle}>
                "Data Minig Beipsiele" von Alessandra Schiffl (BT12v)
            </div>   
        </div>)

}