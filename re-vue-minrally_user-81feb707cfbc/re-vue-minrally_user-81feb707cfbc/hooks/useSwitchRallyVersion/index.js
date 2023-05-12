import { CaretDownFilled } from "@ant-design/icons";
import RallyVersionModal from "@components/common/modal/RallyVersionModal";
import { Button, Select } from "antd";
import { useCallback, useState } from "react";
import styles from "./styles.module.scss";

const VERSION = [
  {
    id: 1,
    name: "Ver.1.0"
  },
  {
    id: 2,
    name: "Ver.2.0"
  },
  {
    id: 3,
    name: "Ver.3.0"
  }
];

const DEFAULT_VERSION = VERSION[1].id;

const useSwitchRallyVersion = () => {
  const [version, setVersion] = useState(DEFAULT_VERSION);
  const [versionSelected, setVersionSelected] = useState(DEFAULT_VERSION);

  const [isOpenVersionModal, setIsOpenVersionModal] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const handleSelect = e => {
    setVersionSelected(e);
  };

  const submitVersion = () => {
    setVersion(versionSelected);
    setIsOpenVersionModal(true);
  };

  const renderSwitchRallyVersion = useCallback(() => {
    return (
      <div className={styles.switchWrapper}>
        <div className={styles.switch}>
          <div className={styles.label}>表示中のバージョン</div>
          <Select
            onSelect={handleSelect}
            className={styles.select}
            placeholder="選択してください"
            suffixIcon={<CaretDownFilled className={styles.iconSelect} />}
            defaultValue={DEFAULT_VERSION}
          >
            {VERSION.map(item => (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button onClick={submitVersion} className={styles.btnSubmit}>
            切り替える
          </Button>
        </div>
        <RallyVersionModal
          visible={isOpenVersionModal}
          hideModal={() => setIsOpenVersionModal(false)}
        />
      </div>
    );
  }, [
    isOpenVersionModal,
    setIsOpenVersionModal,
    isOpenTooltip,
    setIsOpenTooltip
  ]);

  return {
    renderSwitchRallyVersion,
    version
  };
};

export default useSwitchRallyVersion;
