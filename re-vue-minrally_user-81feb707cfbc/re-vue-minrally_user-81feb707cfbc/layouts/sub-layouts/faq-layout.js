import HeaderMenu from "@components/common/header/HeaderMenu";
import { FAQ_MENU } from "@config/constants";

const FaqLayout = ({ children }) => {
  return (
    <>
      <section className="only-footer-section">
        <HeaderMenu menus={FAQ_MENU} />
        {children}
      </section>
    </>
  );
};

export default FaqLayout;
