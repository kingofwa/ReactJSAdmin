import HeaderBack from "@components/common/header/HeaderBack";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { useMessage } from "@contexts/message";
import { logout } from "@services/session";
import { getUserInfo, updateUser } from "@services/user/info";
import { MESSAGE_DURATION, STATUS_RESPONSE } from "@utils/constants";
import { Form, message } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { MESSAGES } from "@config/messages";
import { LoaderContext } from "@contexts/loader";
import SettingPlayer from "./settings";

const ProfilePlayerSetting = () => {
  const { setMessage } = useMessage();
  const [form] = Form.useForm();
  const [info, setInfo] = useState();
  const auth = useAuth();
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchUserInfo = async () => {
    try {
      showLoadingAnim();
      const res = await getUserInfo();
      setInfo(res);
      form.setFieldsValue({
        ...res,
        year_of_birth: res?.year_of_birth ? moment(res?.year_of_birth) : ""
      });
    } catch (error) {
      // console.log(error);
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (auth?.isLoggedIn) {
      fetchUserInfo();
    }
  }, [auth?.isLoggedIn]);

  const handleLogout = async () => {
    try {
      await logout();
      auth.logUserOut();
    } catch (error) {
      setMessage({
        type: "error",
        title: error,
        message: ""
      });
    } finally {
      router.push(PATHS.home);
      setMessage({
        type: "success",
        title: "ログアウトしました。",
        message: ""
      });
    }
  };

  const onFinish = values => {
    const payload = {
      // user_name: values.user_name.trim(),
      prefecture: values.prefecture,
      email: values.email,
      profession: values.profession
      // year_of_birth: values.year_of_birth
      //   ? moment(values.year_of_birth).year()
      //   : ""
    };

    if (values.year_of_birth) {
      payload.year_of_birth = values.year_of_birth;
    }

    updateUser(payload).then(res => {
      if (res && res.status === STATUS_RESPONSE.success) {
        message.success({
          content: MESSAGES.saveSuccessfully,
          duration: MESSAGE_DURATION
        });
        auth.updateUserInfo(res.data);
        router.push(PATHS.home);
      }
    });
  };

  return (
    <>
      <HeaderBack title="設定（非公開情報)" hasMenu />
      <SettingPlayer
        form={form}
        handleLogout={handleLogout}
        onFinish={onFinish}
        info={info}
        isSettingPage
      />
    </>
  );
};

export default ProfilePlayerSetting;
