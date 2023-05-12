/* eslint-disable import/no-unresolved */
import { SendOutlined } from "@ant-design/icons";
import HeaderBack from "@components/common/header/HeaderBack";
import ReviewItem from "@components/ReviewItem";
import PATHS from "@config/paths";
// import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import {
  getCommentDetail,
  getReplyComment,
  postReplyComment
} from "@services/game";
import { updateComment } from "@services/user/info";
import {
  COMMENT_TYPE,
  ParentType,
  ROW_INPUT_REPLY_CMT
} from "@utils/constants";
import { Button, Input, List, message } from "antd";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./ReplyCommentContainer.module.scss";

const PAGE_SIZE_CMT = 5;

const ReplyCommentContainer = () => {
  const auth = useAuth();

  const [comment, setComment] = useState();
  const [replies, setReplies] = useState();
  const [valueReply, setValueReply] = useState({ body: "" });
  const [parentData, setParentData] = useState();

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const router = useRouter();
  const commentID = router.query.id;
  const isSpot = parentData?.type === ParentType.SPOT;

  const fetchCommentDetail = useCallback(async () => {
    if (commentID) {
      showLoadingAnim();
      try {
        const resp = await getCommentDetail(commentID);
        setComment(resp?.data);
        setParentData(resp?.extra?.parent_object);
      } catch (error) {
        message.error(error?.message);
      } finally {
        hideLoadingAnim();
      }
    }
  }, [commentID]);

  const handleChangeReply = e => {
    setValueReply({ ...valueReply, body: e.target.value });
  };

  const setValueComment = item => {
    setValueReply(item);
  };

  const fetchReplyComment = useCallback(async () => {
    try {
      showLoadingAnim();
      const resp = await getReplyComment(commentID);
      setReplies(resp?.data);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim();
    }
  }, [commentID]);

  useEffect(() => {
    if (commentID) {
      fetchCommentDetail();
    }
  }, [fetchCommentDetail]);

  useEffect(() => {
    if (commentID) {
      fetchReplyComment();
    }
  }, [fetchReplyComment]);

  const addReplyComment = async () => {
    try {
      showLoadingAnim();
      if (valueReply.id) {
        await updateComment(valueReply?.id, valueReply);
      } else {
        await postReplyComment(commentID, valueReply);
      }
      setValueReply("");
      fetchReplyComment();
    } catch (error) {
      message.error(error);
    } finally {
      hideLoadingAnim();
    }
  };

  const backUrl = () => {
    if (parentData?.type === ParentType.SPOT) {
      return `${PATHS.rallyMypageSpotDetail}/${parentData?.id}`;
    }
    if (parentData?.type === ParentType.GAME) {
      return `${PATHS.rallyReview}/${parentData?.id}`;
    }
    if (parentData?.type === ParentType.SERIE) {
      return PATHS.seriReview.replace(/\[id\]/, parentData?.id);
    }
    return null;
  };

  return (
    <div>
      <HeaderBack
        title={isSpot ? "スポットメモリー詳細" : "レビュー詳細"}
        backUrl={backUrl()}
      />
      <div className={styles.commentMain}>
        {comment && (
          <ReviewItem
            item={comment}
            onSuccess={fetchCommentDetail}
            type={COMMENT_TYPE.EDIT}
            showCountComment
            isDetail
          />
        )}
      </div>

      <div className={styles.content}>
        {auth.isLoggedIn && (
          <div className={styles.formComment}>
            <p className={styles.label}>返信</p>
            <div className={styles.formItem}>
              <Input.TextArea
                autoSize={{
                  minRows: ROW_INPUT_REPLY_CMT.min,
                  maxRows: ROW_INPUT_REPLY_CMT.max
                }}
                placeholder="返信を追加する"
                className={styles.inputReply}
                value={valueReply?.body}
                onChange={handleChangeReply}
              />
              <Button
                disabled={!valueReply?.body}
                className={styles.btnSend}
                onClick={addReplyComment}
              >
                <SendOutlined
                  className={`${styles.iconSend} ${
                    !!valueReply?.body && styles.active
                  }`}
                />
              </Button>
            </div>
          </div>
        )}
        <List
          // className={styles.list}
          className={size(replies) > 0 ? styles.list : styles.listNoData}
          itemLayout="vertical"
          pagination={{
            pageSize: PAGE_SIZE_CMT
          }}
          dataSource={replies}
          renderItem={(item, index) => (
            <ReviewItem
              item={item}
              key={index}
              onSuccess={fetchReplyComment}
              showCountComment
              editReply={setValueComment}
            />
          )}
          locale={{ emptyText: "データがありません。" }}
        />
      </div>
    </div>
  );
};

export default ReplyCommentContainer;
