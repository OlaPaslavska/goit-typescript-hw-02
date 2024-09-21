import React from "react";
import { ColorRing } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <ColorRing height={80} width={80} />
    </div>
  );
};

export default Loader;
