import HeaderMenu from "@components/common/header/HeaderMenu";
import { FAQ_MENU } from "@config/constants";
import styles from "./styles.module.scss";

const ContactLayout = ({ children }) => {
  return (
    <>
      <section className={styles.container}>
        <HeaderMenu menus={FAQ_MENU} />
        {children}
      </section>
    </>
  );
};

export default ContactLayout;
