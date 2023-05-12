import React from "react";
// import AcceptRally from "./components/AcceptRally";
import CheckinRally from "./components/CheckinRally";
import Companies from "./components/Companies";
import Guide from "./components/Guide";
import TopCoco from "./components/TopCoco";
import TopDefine from "./components/TopDefine";
import styles from "./style.module.scss";

const LandingPageComponent = () => {
  return (
    <div className={styles.container}>
      <TopDefine />
      <TopCoco />
      <Guide />
      <CheckinRally />
      {/* <AcceptRally /> */}
      <Companies />
    </div>
  );
};

export default LandingPageComponent;
