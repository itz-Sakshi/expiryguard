// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add ArcGIS API for JavaScript as an asynchronous script */}
          <Script
            src="https://js.arcgis.com/4.24/"
            strategy="beforeInteractive" // This loads the script before the page is interactive
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
