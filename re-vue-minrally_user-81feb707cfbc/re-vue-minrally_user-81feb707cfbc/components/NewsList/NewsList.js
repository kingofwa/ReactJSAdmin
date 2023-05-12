import { map } from "lodash";
import styles from "./NewsList.module.scss";
import NewsItem from "./NewsItem";

const NewsList = ({ list, isUser = false }) => {
  return (
    <>
      <div className={styles.newsList}>
        {map(list, item => (
          <NewsItem item={item} key={item + Math.random()} isUser={isUser} />
        ))}
      </div>
    </>
  );
};

export default NewsList;
