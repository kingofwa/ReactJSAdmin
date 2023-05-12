// import HeadMeta from "@components/HeadMeta";
import HeadMeta from "@components/HeadMeta";
import CertificationContainer from "@containers/CertificationContainer";
import { LayoutBlank } from "@layouts";
import { getCertificationDetail } from "@services/game";

const CertificationDetail = ({ certificate }) => {
  return (
    <>
      <HeadMeta
        title={`${certificate?.fromable_name || "ラリー名"}_表彰状 | みんラリ`}
        description={`${certificate?.fromable_description || "ラリー説明"}`}
        imgUrl={certificate?.image_url}
      />
      <CertificationContainer certificate={certificate} />
    </>
  );
};

CertificationDetail.layout = LayoutBlank;

CertificationDetail.getInitialProps = async context => {
  const id = context?.query?.id;
  const response = await getCertificationDetail(id);
  return { certificate: response };
};

export default CertificationDetail;
