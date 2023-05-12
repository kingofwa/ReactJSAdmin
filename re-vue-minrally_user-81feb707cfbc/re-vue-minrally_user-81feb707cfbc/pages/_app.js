import Head from "next/head";
import "@styles/globals.scss";
import { MainLayout } from "@layouts";
import { AuthProvider } from "@contexts/auth";
import { MessageProvider } from "@contexts/message";
import MessageModal from "@components/common/modal/message-modal";
import { LoaderProvider } from "@contexts/loader";
import { NotificationProvider } from "@contexts/notification";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.layout || MainLayout;

  const router = useRouter();
  const pathName = router?.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return (
    <AuthProvider>
      <MessageProvider>
        <Head>
          <title>みんラリ</title>
          <meta
            name="viewport"
            content="user-scalable=no,initial-scale=1,maximum-scale=1"
          />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          {/* font landing- page */}
          <link
            href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@400;700&display=swap"
            rel="stylesheet"
          />

          <link href="/fonts/style.css" rel="stylesheet" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="icon" href="/favicon.ico" />
          {/* <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          /> */}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <script type="text/javascript" src="/static/typekit.js" />
          <script type="text/javascript" src="/static/DragDropTouch.js" />
          <script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N4S4DSD');
              `
            }}
          />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N4S4DSD"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="GA"
            />
          </noscript>
        </Head>
        <LoaderProvider>
          <NotificationProvider>
            <Layout>
              <Component {...pageProps} />
              <MessageModal />
            </Layout>
          </NotificationProvider>
        </LoaderProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default MyApp;
