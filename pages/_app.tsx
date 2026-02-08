import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import { Inter, DM_Sans, Space_Mono } from 'next/font/google'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { trackEvent } from '../utils/analytics'

// Optimize fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const spaceMono = Space_Mono({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-space-mono' 
})

// Lazy load non-critical components
const NewsletterPopup = dynamic(() => import('../components/NewsletterPopup'), { ssr: false })
const NewsletterToast = dynamic(() => import('../components/NewsletterToast'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const title = "AI Examples You Can Copy & Try";
  const description = "Curated AI workflows and prompts for non-technical tinkerers. No fluff, just actionable examples.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?mode=home`;
  
  let cleanPath = router.asPath.split('?')[0];
  if (cleanPath === '/index') cleanPath = '/';
  
  const canonicalUrl = cleanPath === '/' 
    ? baseUrl 
    : baseUrl + cleanPath.replace(/\/$/, '');

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.includes('dodopayments.com')) {
        trackEvent('click_dodo_payment', {
          event_category: 'engagement',
          event_label: anchor.href,
          destination: anchor.href
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className={`${inter.variable} ${dmSans.variable} ${spaceMono.variable} font-sans`}>
      <div className="texture-overlay"></div>
      <Head>
        <title>AI Examples You Can Copy & Try</title>
        <meta name="description" content={description} key="description" />
        {/* ... existing meta tags ... */}
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:url" content={canonicalUrl} key="og:url" />
        <meta property="og:image" content={ogImage} key="og:image" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content="@realaiexamples" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} key="canonical" />
        <link rel="shortcut icon" href={`${baseUrl}/favicon.ico`} />
        <link rel="icon" href={`${baseUrl}/favicon.ico`} type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="16x16" href={`${baseUrl}/favicon_transparent.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${baseUrl}/favicon_transparent.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${baseUrl}/favicon_transparent.png`} />
      </Head>
      <Component {...pageProps} />
      <Footer />
      <NewsletterPopup />
      <NewsletterToast />
      
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script 
            async 
            src="https://www.googletagmanager.com/gtag/js?id=G-7V91K25TH0" 
            strategy="lazyOnload" 
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7V91K25TH0');
            `}
          </Script>
          <Script id="meta-pixel" strategy="lazyOnload">
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
          <Script 
            src="https://heyo.so/embed/script?projectId=6985864ddca7d420787131e7"
            strategy="lazyOnload"
          />
        </>
      )}
    </div>
  )
}
