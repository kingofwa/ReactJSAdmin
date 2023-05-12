import { Button } from "antd";
import styles from "./custom-button.module.scss";

const CustomButton = ({ className = "", variant = "default", ...rest }) => {
  return (
    <Button
      className={`custom-button ${styles.btn} ${className} ${variant}`}
      {...rest}
    />
  );
};

export default CustomButton;
