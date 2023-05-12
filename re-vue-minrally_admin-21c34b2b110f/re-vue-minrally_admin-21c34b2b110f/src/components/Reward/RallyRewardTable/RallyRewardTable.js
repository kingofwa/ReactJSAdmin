import React, { useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Col, Space, Table, AutoComplete, Form, message, Button } from 'antd';
import CustomButton from '@components/buttons/custom-button';
import { PATHS } from '@config/paths';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import Pager from '@components/Pager';
import { STATUS_ENUM } from '@config/constants';
import { CustomForm } from '@components/form';
import './styles.scss';

const formName = 'search-recommendation-rally';
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const RallyRewardTable = ({
  data,
  onPageChange,
  pagination,
  loading,
  businessId,
  isBusiness,
  isCoupon,
  onChangeTab
}) => {
  const history = useHistory();
  const pageSize = 5;
  const [showModal, setShowModal] = useState(false);
  const [delId, setDelId] = useState();
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  moment.tz.setDefault('Asia/Tokyo');

  const columns = [
    {
      title: 'クーポン名',
      dataIndex: 'coupon_name',
      key: 'coupon_name'
    },
    {
      title: isCoupon ? 'ラリー名' : 'スポット数',
      dataIndex: isCoupon ? 'rally_name' : 'number_of_spots',
      key: isCoupon ? 'spot_name' : 'number_of_spots',
      render: spot_name => spot_name || '-'
    },
    {
      title: isCoupon ? '利用期限' : '申込期限',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      render: expiration_date => expiration_date || '-'
    },
    {
      title: '完走者数',
      dataIndex: 'number_of_finishers',
      key: 'number_of_finishers',
      render: number_of_finishers => number_of_finishers || '-'
    },
    {
      title: isCoupon ? '利用回数' : '応募者数',
      dataIndex: 'number_of_uses',
      key: 'number_of_uses',
      render: number_of_uses => number_of_uses || '-'
    },
    {
      title: '発行回数',
      dataIndex: 'number_of_issues',
      key: 'number_of_issues',
      render: number_of_issues => number_of_issues || '-'
    },
    {
      title: 'メニュー',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle" className="cursor-pointer">
          <Button type="text" onClick={() => onClickDetail(record)}>
            詳細確認
          </Button>
        </Space>
      )
    }
  ];

  const onMenuClick = item => {
    const url = PATHS.business.rewardManagementDetail;
    history.push(`${url}?id=${item?.id}`);
  };

  const handleSelected = keyword => {
    setKeyword(keyword);
  };

  const handleSearchRally = async searchText => {
    // setKeyword(searchText);
    // let dataSearch;
    // let options = [];
    // const searchParams = {
    //   q: searchText,
    //   is_recommended: false,
    //   type: 'rally'
    // };
    // try {
    //   const response = await getRecommendations(searchParams);
    //   dataSearch = response?.data;
    //   Object.keys(dataSearch).forEach(function (key) {
    //     options.push({
    //       id: dataSearch[key]?.id,
    //       value: dataSearch[key]?.name
    //     });
    //   });
    //   setSearchOptions(options);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleSetRecommend = async () => {
    try {
      // const params = {
      //   type: 'rally',
      //   add_recommend: keyword
      // };
      // const payload = await generateFormData(params);
      // await updateRecommended(payload);
      // setReload(true);
    } catch (error) {
      message.error(error);
    }
  };

  const onClickDetail = item => {
    const url = PATHS.business.rewardManagementDetail;
    history.push(`${url}?id=${item?.id}`);
  };

  return (
    <>
      <div className="reward-list-info">
        <div className="reward-list-info-title mt-30">ラリーの完走報酬管理</div>
        <div className="reward-list-info-body">
          <div className="recommendation-management-detail-actions">
            <CustomButton
              onClick={() => onChangeTab()}
              className={`${isCoupon && 'btn-no-select'}`}
            >
              クーポン
            </CustomButton>
            <CustomButton
              className={`${!isCoupon && 'btn-no-select'} ml-10`}
              onClick={() => onChangeTab()}
            >
              応募フォーム
            </CustomButton>
          </div>
          <div>
            <CustomForm
              name={formName}
              autoComplete="off"
              form={form}
              {...formItemLayout}
            >
              <div className="featured-management-search">
                <Form.Item name="key" label="クーポン名">
                  <AutoComplete
                    autoComplete={'off'}
                    onSearch={handleSearchRally}
                    onSelect={handleSelected}
                    style={{
                      width: 270
                    }}
                    options={searchOptions}
                    placeholder="東急電鉄ラリー"
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                  {searchOptions.length === 0 && keyword.length !== 0 && (
                    <div className="ant-form-item-explain-error">
                      このラリーが存在しません。
                    </div>
                  )}
                </Form.Item>
                <CustomButton onClick={() => handleSetRecommend()}>
                  追加
                </CustomButton>
              </div>
            </CustomForm>
          </div>
          <div className="business-info-row">
            <Col span={18}>
              <Table
                columns={columns}
                dataSource={data}
                size={'small'}
                pagination={false}
                rowKey="id"
                className="custom-table table-no-background"
                loading={loading}
              />
            </Col>
          </div>
          <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
        </div>
      </div>
    </>
  );
};

export default RallyRewardTable;
