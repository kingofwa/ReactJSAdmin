import Footer from "@components/common/footer";
import protectedCreator from "@routes/protectedCreator";
import styles from "./styles.module.scss";

const CreateRallyLayout = ({ children }) => {
  return (
    <>
      <div className="default-container" id="scrollableDiv">
        <div className="create-rally-body">
          <section className={styles.CreateContainer}>{children}</section>
          <Footer />
        </div>
      </div>
      <div className="main-background" />
    </>
  );
};

export default protectedCreator(CreateRallyLayout);
