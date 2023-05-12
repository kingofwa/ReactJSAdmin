/* eslint-disable camelcase */
import { CaretDownFilled } from "@ant-design/icons";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { getUserInfo, updateUserInfo } from "@services/user/info";
import { PROVINCES } from "@utils/constants";
import { generateFormData } from "@utils/form";
import { isInOneWeek } from "@utils/helper";
import { beforeUpload, getBase64, srcToFile } from "@utils/image";
import { ERROR_MESSAGES } from "@utils/message-validate";
import { setUserIsRegister } from "@utils/storage/user";
// import { REGEX_DISPLAY_NAME_DEFAULT } from "@utils/validate";
import {
  Avatar,
  Button,
  Form,
  Input,
  message,
  Radio,
  Select,
  Upload
} from "antd";
import { map, omit } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

const DEFAULT_YEAR_OF_BIRTH = 2000;

const UserInfo = ({ isRegister }) => {
  const { Option } = Select;
  const [avatarUrl, setAvatarUrl] = useState();

  const router = useRouter();
  const auth = useAuth();
  const [form] = Form.useForm();
  const { sns_oauth_and_registered } = router.query;

  const [isScroll, setIsScroll] = useState(true);

  const getInfo = async () => {
    try {
      const user = await getUserInfo();
      const avatar = await srcToFile(user?.avatar_url);

      form.setFieldsValue({
        avatar: { file: avatar },
        user_name: user?.user_name,
        sex: user?.sex,
        year_of_birth: user?.year_of_birth
          ? moment(user?.year_of_birth)
          : moment(DEFAULT_YEAR_OF_BIRTH),
        prefecture: user?.prefecture
      });
      setAvatarUrl(user.avatar_url);
    } catch (error) {
      message.error(error?.message);
    }
  };
  useEffect(() => {
    if (sns_oauth_and_registered === "true") {
      router.push(PATHS.home);
    } else if (router.query.uid) {
      getInfo();
    }
  }, [router.query]);

  useEffect(() => {
    if (!isScroll) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isScroll]);

  const triggerChangeImg = file => {
    getBase64(file.file.originFileObj).then(res => setAvatarUrl(res));
  };

  useEffect(() => {
    form.setFieldsValue({
      year_of_birth: 1990
    });
  }, []);

  const onFinish = async values => {
    try {
      let params = {
        ...values,
        user_name: values?.user_name.trim(),
        year_of_birth: values.year_of_birth || 1990
      };
      params = omit(params, ["avatar"]);
      if (values?.avatar) {
        params.avatar = values.avatar?.file?.originFileObj;
      }

      const payload = generateFormData(params);
      const res = await updateUserInfo(payload);
      setUserIsRegister(true);
      auth.updateUserInfo(res?.data);
      router.push(PATHS.home);
    } catch (error) {
      message.error(error);
      //
    } finally {
      //
    }
  };

  const onDropdownVisibleChange = () => {
    setIsScroll(!isScroll);
  };

  const year = Array.from({ length: 103 }, (_, i) => i + 1920)
    .slice()
    .reverse();

  const birthDayOptions = map(year, item => {
    return { value: item, label: item };
  });

  const renderOptions = birthDayOptions.map(item => (
    <Option value={item.value} label={item.label}>
      {item.label}
    </Option>
  ));

  return (
    <div className={styles.userInfo}>
      <Form
        form={form}
        colon={false}
        labelCol={{ span: 6 }}
        labelAlign="left"
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Form.Item name="avatar" wrapperCol={{ span: 24 }}>
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            className={styles.upload}
            onChange={triggerChangeImg}
            beforeUpload={beforeUpload}
            accept="image/png, image/jpeg, image/gif"
          >
            <Avatar
              className={styles.avatar}
              src={
                avatarUrl ||
                auth?.user?.avatar_url ||
                "/img/mypage/avatar-holder.png"
              }
            />
            <Button className={styles.btnImage}>変更</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="user_name"
          wrapperCol={24}
          className={styles.formItem}
          required
          rules={[
            { required: true, message: ERROR_MESSAGES.empty },
            {
              max: 15,
              message: ERROR_MESSAGES.maxLength.replace(/:count/, 15)
            }
          ]}
        >
          <Input
            placeholder="ユーザー名"
            className={styles.inputName}
            disabled={
              !isRegister && isInOneWeek(auth?.user?.user_name_updated_at)
            }
          />
        </Form.Item>
        <div className={styles.description}>
          ※アイコンはいつでも変更可能です。
          <br />
          ※ユーザー名は1週間に1回のみ変更可能です。
        </div>
        <Form.Item
          name="sex"
          label="性別"
          required
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
          className={styles.formItemDefaultCustom}
        >
          <Radio.Group className={styles.radioGroup}>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
            <Radio value="other">その他</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="year_of_birth"
          label="生年"
          className={styles.formItemDefaultCustom}
          required
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
        >
          <Select
            placeholder="選択してください"
            defaultValue={1990}
            suffixIcon={<CaretDownFilled className="ant-select-suffix" />}
          >
            {renderOptions}
          </Select>
        </Form.Item>
        <Form.Item
          name="prefecture"
          label="都道府県"
          className={styles.formItemDefaultCustom}
          required
          rules={[{ required: true, message: ERROR_MESSAGES.empty }]}
        >
          <Select
            placeholder="選択してください"
            suffixIcon={<CaretDownFilled className="ant-select-suffix" />}
            onDropdownVisibleChange={onDropdownVisibleChange}
          >
            {PROVINCES.map(item => (
              <Select.Option value={item.name} key={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className={styles.btnSubmit} htmlType="submit">
            みんラリを始める！
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserInfo;
