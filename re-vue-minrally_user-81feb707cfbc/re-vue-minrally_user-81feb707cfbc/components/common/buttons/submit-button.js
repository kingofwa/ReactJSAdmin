import CustomButton from "@components/common/buttons/custom-button";
import styles from "./submit-button.module.scss";

const SubmitButton = ({ text, ...rest }) => {
  return (
    <CustomButton
      type="primary"
      htmlType="submit"
      size="large"
      className={styles.btn}
      {...rest}
    >
      {text}
    </CustomButton>
  );
};

export default SubmitButton;
