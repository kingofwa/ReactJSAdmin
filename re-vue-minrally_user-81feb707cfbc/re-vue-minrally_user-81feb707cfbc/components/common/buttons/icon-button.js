import { Button } from 'antd';
import styles from './icon-button.module.scss';

const IconButton = ({ className, iconClassName, ...rest }) => {
  return (
    <Button className={`${styles.btn} ${className}`} {...rest}>
      <span className={`${styles.icon} ${iconClassName}`} />
    </Button>
  );
};

export default IconButton;
