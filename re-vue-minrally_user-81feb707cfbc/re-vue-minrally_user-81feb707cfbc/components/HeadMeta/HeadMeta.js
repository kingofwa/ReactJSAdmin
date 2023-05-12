import Head from "next/head";

const defaultImgUrl = `${process.env.NEXT_PUBLIC_APP_HOST}/img/default-OGP.png`;

const HeadMeta = ({ title = "", description = "", imgUrl }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="user-scalable=no,initial-scale=1,maximum-scale=1"
      />
      <meta property="og:title" content={title} key="title" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl || defaultImgUrl} />

      <meta property="og:description" content={description} />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@fogsnail" />
      <meta name="twitter:image" content={imgUrl || defaultImgUrl} />
      <meta name="twitter:creator" content="@fogsnail" />
    </Head>
  );
};

export default HeadMeta;
