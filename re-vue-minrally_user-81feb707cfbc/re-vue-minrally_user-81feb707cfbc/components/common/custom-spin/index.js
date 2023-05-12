import { Spin } from 'antd';
import styles from './index.module.scss';

const CustomSpin = props => {
  return (
    <div className={styles.wrapper}>
      <Spin {...props} />
    </div>
  );
};

export default CustomSpin;
