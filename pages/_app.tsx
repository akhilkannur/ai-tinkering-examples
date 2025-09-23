import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Footer from '../components/Footer'
import NewsletterPopup from '../components/NewsletterPopup'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  const title = "AI Examples You Can Copy & Try";
  const description = "Curated AI workflows and prompts for non-technical tinkerers. No fluff, just actionable examples.";
  const ogImage = "/Gemini_Generated_Image_b3hv6cb3hv6cb3hv.png"; // Make sure to have an og-image.png in your public folder

  return (
    <>
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
        <link rel="icon" href="/logo.png" sizes="any" />
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
    </>
  )
}
