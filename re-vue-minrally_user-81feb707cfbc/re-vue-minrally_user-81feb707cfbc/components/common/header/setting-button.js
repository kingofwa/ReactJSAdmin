import { useRouter } from "next/router";
import PATHS from "@config/paths";
import { IconButton } from "@components/common/buttons";
import styles from "./setting-button.module.scss";

const SettingButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(PATHS.account.setting.index);
  };

  return <IconButton iconClassName={styles.btnIcon} onClick={handleClick} />;
};

export default SettingButton;
