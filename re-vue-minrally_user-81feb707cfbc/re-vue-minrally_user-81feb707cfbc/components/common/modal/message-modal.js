import { Modal } from "antd";
import { isEmpty, isArray } from "lodash";
import Title from "@components/common/title";
import Description from "@components/common/description";
import { useMessage } from "@contexts/message";
import styles from "./message-modal.module.scss";

const MessageModal = () => {
  const { message, setMessage } = useMessage({
    type: "",
    title: "",
    message: ""
  });
  const hideModal = () => {
    setMessage({ type: "", title: "", message: "" });
  };

  return (
    <Modal
      title={null}
      visible={!isEmpty(message.title)}
      closable={false}
      okText="閉じる"
      okType="link"
      onOk={hideModal}
      cancelButtonProps={{ className: "d-none" }}
      width={400}
    >
      <div className={styles.modalMessage}>
        {/* ? (()=>{message.message.map(m =>(<><div className={styles.message} dangerouslySetInnerHTML={{ __html: m }}/><br/></>))}) */}
        <Title
          align="center"
          text={message.title}
          className={
            message && message.type === "error"
              ? styles.messageErrorTitle
              : styles.messageSuccessTitle
          }
        />
        <Description className={styles.messageDescription}>
          {isArray(message.message) ? (
            // eslint-disable-next-line react/no-danger
            message.message.map(m => {
              return (
                <div
                  className={styles.message}
                  dangerouslySetInnerHTML={{ __html: m }}
                />
              );
            })
          ) : (
            // eslint-disable-next-line react/no-danger
            <div
              key={Math.random()}
              className={styles.message}
              dangerouslySetInnerHTML={{ __html: message.message }}
            />
          )}
        </Description>
      </div>
    </Modal>
  );
};

export default MessageModal;
