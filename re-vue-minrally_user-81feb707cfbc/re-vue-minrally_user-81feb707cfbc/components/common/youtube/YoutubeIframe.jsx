import React from "react";
import styles from "./styles.module.scss";

const YoutubeIframe = ({ embedId }) => (
  <div className={styles.video}>
    <iframe
      width="1280"
      height="720"
      src={`https://www.youtube.com/embed/${embedId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
);

export default YoutubeIframe;
