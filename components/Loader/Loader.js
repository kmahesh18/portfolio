import { useState, useEffect } from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  const [loadingText, setLoadingText] = useState("Loading...");

  useEffect(() => {
    const messages = [
      "Almost Ready...",
      "Welcome!",
    ];

    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(messages[index]);
      index = (index + 1) % messages.length;
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <div className={styles.loader}>
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className={styles.base}>
            <span />
            <div className={styles.face} />
          </div>
        </div>
        <div className={styles.progress} />
        <div className={styles.loadingText}>{loadingText}</div>
      </div>
    </div>
  );
};

export default Loader;
