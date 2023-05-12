import Link from "next/link";
import PATHS from "@config/paths";
import styles from "./reference-list.module.scss";

const REFERENCES = [
  {
    text: "利用規約",
    path: PATHS.termsOfService
  },
  {
    text: "プライバシーポリシー",
    path: PATHS.privacyPolicy
  },
  {
    text: "特定商取引に関する表記",
    path: PATHS.commercialLaw
  }
];

const ReferenceList = () => {
  const references = REFERENCES.map(item => (
    <li key={item.text} className={styles.referenceLi}>
      <Link href={item.path}>
        <a>{item.text}</a>
      </Link>
    </li>
  ));
  return <ul className={styles.reference}>{references}</ul>;
};

export default ReferenceList;
