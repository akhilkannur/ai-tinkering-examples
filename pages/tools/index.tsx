import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ToolsRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/blueprints');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Head>
        <title>Redirecting...</title>
      </Head>
      <div className="text-center">
        <p className="text-gray-500 mb-2">Redirecting to the Terminal Cookbook...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default ToolsRedirect;
