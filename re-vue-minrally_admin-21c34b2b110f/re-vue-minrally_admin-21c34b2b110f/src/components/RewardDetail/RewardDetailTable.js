import React, { useEffect, useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Col, Table, Form, Input } from 'antd';
import { PATHS } from '@config/paths';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { DATE_DEFAULT } from '@utils/date';
import Pager from '@components/Pager';
import './styles.scss';

const formName = 'search-recommendation-rally';
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

const RewardDetailTable = ({
  columns,
  data,
  onPageChange,
  pagination,
  loading
}) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const pageSize = 5;
  moment.tz.setDefault('Asia/Tokyo');

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

  const generateRender = (row, index) => {
    return row => row?.items[index];
  };

  const generateColumns = data => {
    var cols = [];
    data.map((item, index) => {
      let newColumn = {
        title: item.title,
        render: generateRender(item, index)
      };
      cols.push(newColumn);
    });

    return cols;
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="reward-list-info">
        <div className="reward-list-info-title mt-30">応募フォーム分析</div>
        <div className="reward-list-info-body">
          <div className="reward-table-toolbar">
            <p>応募回数</p>
            <Input
              style={{
                width: '86px',
                height: '50px'
              }}
              defaultValue={10}
            ></Input>
          </div>
          <div className="business-info-row">
            <Col span={24}>
              <Table
                columns={generateColumns(columns)}
                dataSource={data}
                size={'small'}
                pagination={false}
                rowKey="id"
                className="custom-table table-no-background"
                loading={loading}
                scroll={{ x: 'max-content' }}
              />
            </Col>
          </div>
          <Pager {...pagination} onChange={onPageChange} pageSize={pageSize} />
        </div>
      </div>
    </>
  );
};

export default RewardDetailTable;
