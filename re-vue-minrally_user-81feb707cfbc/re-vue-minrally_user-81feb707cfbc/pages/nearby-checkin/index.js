import NearbyCheckin from "@components/NearbyCheckin";
import HeadMeta from "@components/HeadMeta";
// import withPrivateRoute from "@routes/withPrivaterRoute";

const NearbyCheckinPage = () => {
  return (
    <>
      <HeadMeta
        title="チェックイン | みんラリ"
        description="「みんラリ」の現在地からチェックインできるラリーにチェックイン！"
      />
      <NearbyCheckin />
    </>
  );
};

export default NearbyCheckinPage;
