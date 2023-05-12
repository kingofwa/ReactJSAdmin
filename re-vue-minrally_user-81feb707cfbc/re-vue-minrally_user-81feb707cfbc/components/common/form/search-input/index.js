import { Form, Input } from "antd";
import styles from "./style.module.scss";

const SearchInput = ({ inputProps = {}, onSearch, ...rest }) => {
  return (
    <Form.Item initialValue="" {...rest} className={styles.search}>
      <Input {...inputProps} />
      <div onClick={onSearch}>
        <img
          src="/icons/ic-search-2.svg"
          alt="search"
          className={styles.searchIcon}
        />
      </div>
    </Form.Item>
  );
};

export default SearchInput;
