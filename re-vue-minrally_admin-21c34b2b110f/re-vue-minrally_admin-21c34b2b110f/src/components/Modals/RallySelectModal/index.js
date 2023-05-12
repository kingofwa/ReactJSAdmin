import React, { useEffect, useState } from 'react';
import { Checkbox, Form, message, Modal } from 'antd';
import { getSingleGames } from '@api/series';
import { getOrphanGames } from '@api/business';
import CustomButton from '@components/buttons/custom-button';
import { get, keyBy, map, size } from 'lodash';
import './styles.scss';

const RallySelectModal = ({
  visible,
  onVisible,
  businessId,
  onChangeRallyList = () => {},
  handleUpdateRallyList = () => {},
  isBusiness
}) => {
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [selectGame, setSelectGame] = useState();

  const onSubmit = values => {
    const rallySelection = get(values, 'rallySelection', []);
    setSelectGame(rallySelection);
    const rallyKeyBy = keyBy(games, 'id');
    const rally = map(rallySelection, id => {
      return get(rallyKeyBy, id);
    });
    onChangeRallyList(rally);
    handleUpdateRallyList();
    onVisible();
  };

  const fetchSingleGames = async () => {
    try {
      setLoading(true);
      const response = await getSingleGames(businessId);
      setGames(response);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrphanGames = async () => {
    try {
      setLoading(true);
      const response = await getOrphanGames();
      setGames(response);
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (businessId && !isBusiness) {
      fetchSingleGames();
    }
    if (isBusiness) {
      fetchOrphanGames();
    }
    // eslint-disable-next-line
  }, [businessId, visible, isBusiness]);

  return (
    <>
      <Modal
        className="rally-select-modal"
        title="ラリー選択"
        closable={false}
        visible={visible}
        width={640}
        loading={loading}
      >
        <Form onFinish={onSubmit} name="rally-info-form">
          <p className="modal-title">
            {size(games) > 0
              ? 'グランドラリーに追加するラリーを選択してください。'
              : 'ラリーが登録されていません。'}
          </p>
          <div className="note">
            一度グランドラリーを設定すると解除することはできません。
          </div>
          <Form.Item name="rallySelection">
            <Checkbox.Group value={selectGame}>
              {games.map((rally, key) => (
                <Checkbox value={rally?.id} key={`rally-${key + 1}`}>
                  {rally.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <div className="rally-select-modal-actions">
            {size(games) > 0 && (
              <CustomButton htmlType="submit">追 加</CustomButton>
            )}
            <div className="btn-cancel">
              <CustomButton onClick={onVisible}>キャンセル</CustomButton>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default RallySelectModal;
