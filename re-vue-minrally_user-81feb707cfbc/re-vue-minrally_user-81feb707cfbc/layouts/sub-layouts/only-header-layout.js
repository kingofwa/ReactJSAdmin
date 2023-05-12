import Header from "@components/common/header";

const OnlyHeaderLayout = ({ children }) => {
  return (
    <>
      <Header />
      <section className="container-only-header">{children}</section>
    </>
  );
};

export default OnlyHeaderLayout;
