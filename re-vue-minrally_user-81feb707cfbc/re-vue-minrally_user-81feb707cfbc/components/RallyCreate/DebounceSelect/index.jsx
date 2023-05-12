import { Select } from "antd";
import React from "react";

const DebounceSelect = ({
  fetchOptions,
  // debounceTimeout = 300,
  onSelect,
  index,
  ...props
}) => {
  // TODO: wait gg map api key
  // const [fetching, setFetching] = useState(false);
  // const [options, setOptions] = useState([]);
  // const fetchRef = useRef(0);

  // const debounceFetcher = useMemo(() => {
  //   const loadOptions = value => {
  //     fetchRef.current += 1;
  //     const fetchId = fetchRef.current;
  //     setOptions([]);
  //     setFetching(true);
  //     fetchOptions(value)
  //       .then(newOptions => {
  //         if (fetchId !== fetchRef.current) {
  //           // for fetch callback order
  //           return;
  //         }
  //         setOptions(newOptions);
  //         setFetching(false);
  //       })
  //       .catch(err => console.error("err", err));
  //   };

  //   return debounce(loadOptions, debounceTimeout);
  // }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      {...props}
      onSelect={(_, option) => onSelect(index, option)}
      labelInValue
      filterOption={false}
      // onSearch={debounceFetcher}
      // notFoundContent={fetching ? <Spin size="small" /> : null}
      // options={options}
    />
  );
};

export default DebounceSelect;
