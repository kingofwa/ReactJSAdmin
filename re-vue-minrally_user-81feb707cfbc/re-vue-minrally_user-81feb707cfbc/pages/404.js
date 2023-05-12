/* eslint-disable import/no-unresolved */
import NotFound from "@components/error/404";
import HeaderMenu from "@components/common/header/HeaderMenu";
import { TOP_MENU } from "@config/constants";

const NotFoundPage = () => {
  return (
    <>
      <HeaderMenu menus={TOP_MENU} />
      <section className="home-section">
        <NotFound />
      </section>
    </>
  );
};

// NotFoundPage.layout = LayoutBlank;

export default NotFoundPage;
