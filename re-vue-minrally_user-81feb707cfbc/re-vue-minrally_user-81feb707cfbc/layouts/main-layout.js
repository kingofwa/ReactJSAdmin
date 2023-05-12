import Footer from "@components/common/footer";
import Header from "@components/common/header";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="default-container" id="scrollableDiv">
        <Header />
        <div className="default-body">
          <section className="default-container-content">{children}</section>
          <Footer />
        </div>
      </div>
      <div className="main-background" />
    </>
  );
};

export default MainLayout;
