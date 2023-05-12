import { HintButton } from "@components/common/buttons";
import styles from "./index.module.scss";

const Title = ({
  text,
  className,
  align = "left",
  hint = false,
  hintText = ""
}) => {
  return (
    <h3 className={`${styles.title} text-${align} ${className}`}>
      {text}
      {hint && <HintButton hintText={hintText} />}
    </h3>
  );
};

export default Title;
