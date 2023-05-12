// import { DATE_DOT } from "@utils/date";
import { size } from "lodash";
// import moment from "moment-timezone";
import styles from "./RallyPrecautions.module.scss";

const RallyPrecautions = ({ note, creator }) => {
  return (
    <>
      <div className={styles.RallyPrecautions}>
        <div className={styles.rowTitle}>
          <p className={styles.title}>注意事項</p>
        </div>
        <div className={styles.content}>
          ・参加費は無料です。
          <br />
          ・ラリーの開催期間は原則無制限としますが、予告なく中止・変更する場合がございます。
          <br />
          ・写真・イラストはイメージです。
          <br />
          ・歩きながら、運転しながらのスマートフォンのご使用は危険ですのでおやめください。
          <br />
          ・体調が優れない方は外出を控えるようにお願いします。
          <br />
          ・手洗いや手指消毒を行うとともに、マスクの着用にご協力をお願いします。公共のルールを守りましょう。
          <br />
          ・交通ルールをはじめ、公共のルールをしっかり守りましょう。 <br />
          ・私有地や建物など、許可なく立ち入ってはいけない場所には入らないでください。
          <br />
          ・公共の場でのマナーを忘れずに。公園や公共施設などの公共の場や、人が多く集まる場所では、周囲の環境や周りの人々への配慮を心がけましょう。
          <br />
          ・ラリー参加中には周りの人々や周辺の住民の方々に迷惑をかけないよう、大きな声を出したり、騒いだりすることはやめましょう。
        </div>

        {size(note) > 0 && (
          <>
            <div className={styles.rowDescription}>
              <p className={styles.description}>
                {creator ? `${creator}さん` : "ラリーマスター"}からの注意事項
              </p>
              {/* {noteUpdate && (
                <span className={styles.date}>
                  追記: {moment(noteUpdate).tz("Asia/Tokyo").format(DATE_DOT)}
                </span>
              )} */}
            </div>
            <div className={styles.content}>{note}</div>
          </>
        )}
      </div>
    </>
  );
};

export default RallyPrecautions;
