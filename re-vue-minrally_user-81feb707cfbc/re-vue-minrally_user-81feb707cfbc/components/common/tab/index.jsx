import { head, includes } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const Tab = ({ tabs, id, className }) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <div>
      <div className={`${styles.tab} ${className}`}>
        {tabs?.map(tab => {
          const mainPath = head(tab.path);
          const redirectPath = id ? mainPath.replace(/\[id\]/, id) : mainPath;

          const isActive = includes(tab.path, path);

          return (
            <Link href={redirectPath} key={tab.id}>
              <a className={isActive ? styles.active : ""}>{tab.title}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tab;
