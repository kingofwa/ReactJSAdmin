import styles from "./description.module.scss";

const Description = ({ children, align = "center", className}) => {
  return <p className={`${styles.description} text-${align} ${className}`} > {children}</p>;
};

export default Description;
