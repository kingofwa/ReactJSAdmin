import { CaretDownFilled } from "@ant-design/icons";
import TooltipModal from "@components/common/modal/TooltipModal";
import VersionModal from "@components/Rally/Modal/VersionModal";
import { Button, Select } from "antd";
import { useCallback, useState } from "react";
import styles from "./styles.module.scss";

const VERSION = [
  {
    id: 1,
    name: "Ver.1.0 ★"
  },
  {
    id: 2,
    name: "Ver.2.0 ★"
  },
  {
    id: 3,
    name: "Ver.3.0 ★"
  }
];

const DEFAULT_VERSION = VERSION[1].id;

const useSwitchVersion = () => {
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

  const renderSwitchVersion = useCallback(() => {
    return (
      <div className={styles.switchWrapper}>
        <div className={styles.switch}>
          <div className={styles.label}>
            バージョン
            <span onClick={() => setIsOpenTooltip(true)}>
              <img
                src="/icons/ic-info.svg"
                alt="ic-info"
                className={styles.icInfo}
              />
            </span>
          </div>
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
        <VersionModal
          visible={isOpenVersionModal}
          hideModal={() => setIsOpenVersionModal(false)}
        />
        <TooltipModal
          visible={isOpenTooltip}
          hideModal={() => setIsOpenTooltip(false)}
        >
          {/* <div className={styles.titleTooltip}>バージョン切り替えについて</div> */}
          <div className={styles.titleTooltip}>バージョン</div>
          <br />
          <br />
          過去のバージョンに切り替え、内容を確認することができます。過去のバージョンから参加しているプレイヤーは、チェックインすることもできます。
          {/* プルダウンメニューからバージョンを選択し、切り替えボタンを押すことで、別のバージョンの内容を確認することができます。
          <br />
          <br />
          ★のついたバージョンは、あなたが参加（チェックイン）したことのあるバージョンです。切り替えることでチェックインをすることができます。
          <br />
          <br />
          ★のついていないバージョンは、あなたが参加（チェックイン）したことのないバージョンです。切り替えてもチェックインすることはできませんが、内容を確認することはできます。 */}
        </TooltipModal>
      </div>
    );
  }, [
    isOpenVersionModal,
    setIsOpenVersionModal,
    isOpenTooltip,
    setIsOpenTooltip
  ]);

  return {
    renderSwitchVersion,
    version
  };
};

export default useSwitchVersion;
