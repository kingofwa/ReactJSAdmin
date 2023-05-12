import Link from "next/link";
import CustomButton from "./custom-button";
import styles from "./link-button.module.scss";

const LinkButton = ({ text, href, className, btnClassName, targetBlank = false , ...rest }) => {
  return (
    <Link href={href}>
      <a className={`${styles.link} ${className}`} target={targetBlank ? "_blank" : ""}>
        <CustomButton className={`${styles.btn} ${btnClassName}`} {...rest}>
          {text}
        </CustomButton>
      </a>
    </Link>
  );
};

export default LinkButton;
