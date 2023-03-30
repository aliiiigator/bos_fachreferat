import { Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { routes } from "../Routes";
import styles from "./Navigation.module.css";

export const Navigation: React.FC<{}> = ({ }) => {
  const getCurrentNavigation = () => {{
    const sub = window.location.pathname.substring(1)
    return sub == "" ? routes.classification : sub
  }}
  
    const [current, setCurrent] = useState(getCurrentNavigation());
  
    const items: MenuProps['items'] = [
        {
          label: 'Klassifizierung & Charakterisierung',
          key: routes.classification,
        },
        {
            label: 'Regression',
            key: routes.regression,
        },
        {
            label: 'Formeln & Mathematische Gesetzmäßigkeiten',
            key: routes.formula,
        },
        {
            label: 'Cluster',
            key: routes.cluster,
        }       
        
      ];
      
      const onClick = (e:any) => {
        window.open(e.key, '_self')
        setCurrent(e.key)
      }
    
    return (
    <div className={styles.historyWrapper}>     
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </div>)

}