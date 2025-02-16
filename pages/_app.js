import Script from 'next/script';
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Bootstrap JS */}
      <Script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />

      {/* Your main.js script */}
      <Script src="/main.js" strategy="beforeInteractive" />

      <Component {...pageProps} />
    </>
  );
}
