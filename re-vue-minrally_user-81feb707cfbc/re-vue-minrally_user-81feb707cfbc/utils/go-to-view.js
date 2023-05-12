// eslint-disable-next-line import/prefer-default-export
export const goToView = id => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest"
  });
};
