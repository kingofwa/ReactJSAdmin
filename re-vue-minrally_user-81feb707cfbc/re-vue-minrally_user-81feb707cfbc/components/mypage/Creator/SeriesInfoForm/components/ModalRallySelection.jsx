import { Button, Checkbox, Col, Modal, Row } from "antd";
import { includes } from "lodash";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const ModalRallySelection = ({
  visible,
  closeModal,
  listGames,
  onSelectGames,
  gameSelect,
  selectGameStock = []
}) => {
  const [listSelect, setListSelect] = useState(gameSelect);
  const onAddGamesSelect = () => {
    onSelectGames(listSelect);
    closeModal();
  };

  const onChange = checkedValues => {
    setListSelect(checkedValues);
  };

  useEffect(() => {
    const gamesId = gameSelect.map(item => item.id);
    setListSelect(gamesId);
  }, [gameSelect, visible]);

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      className={styles.modalSelection}
      width="100%"
      closeIcon={
        <img
          src="/icons/ic-xmark-gray.png"
          alt="ic-xmark"
          className={styles.icClose}
        />
      }
      footer={null}
      // forceRender
    >
      <Row className={styles.title} justify="center">
        ラリー選択
      </Row>
      <Row>
        <Col span={24}>
          <Checkbox.Group
            value={listSelect}
            className={styles.checkboxGroup}
            onChange={onChange}
          >
            {listGames?.data?.map(item => {
              const isStock = includes(selectGameStock, item?.id);
              return (
                <Checkbox
                  value={item.id}
                  key={item.id}
                  className={isStock && styles.dNone}
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        </Col>
      </Row>
      <Row>
        <Button className={styles.btnSubmitModal} onClick={onAddGamesSelect}>
          確定
        </Button>
      </Row>
    </Modal>
  );
};

export default ModalRallySelection;
