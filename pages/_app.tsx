import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from '../components/Footer'
import NewsletterPopup from '../components/NewsletterPopup'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  const title = "AI Examples You Can Copy & Try";
  const description = "Curated AI workflows and prompts for non-technical tinkerers. No fluff, just actionable examples.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png`; // Make sure to have an og-image.png in your public folder

  return (
    <>
      {/* 
        Favicon setup for Google Search:
        - Google can take a few days to weeks to crawl and update the favicon.
        - The favicon is linked using multiple <link> tags for different resolutions and for Apple devices.
        - The favicon files (favicon.ico, favicon_canva.png) are located in the /public directory.
        - The robots.txt file allows crawling of the favicon files.
        - For more information, see: https://developers.google.com/search/docs/appearance/favicon-in-search
      */}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_canva.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_canva.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_canva.png" />
      </Head>
      <Component {...pageProps} />
      <Footer />
      <NewsletterPopup />
      {/* Google Analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-7V91K25TH0" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7V91K25TH0');
        `}
      </Script>
      {/* Meta Pixel Code */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '677750738702576');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=677750738702576&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  )
}
