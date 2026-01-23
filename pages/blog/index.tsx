import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { getAllPosts, BlogPost } from '../../lib/blog';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <div className="min-h-screen bg-primary-bg text-text-color font-sans selection:bg-accent selection:text-white flex flex-col">
      <Head>
        <title>AI Blueprint Guides | Real AI Examples</title>
        <meta name="description" content="Learn how to chain AI recipes together to build autonomous workflows for Sales, Marketing, and Operations." />
      </Head>

      <Navbar />

      <main className="flex-grow">
        <div className="bg-secondary-bg border-b border-navy-dark py-20 relative overflow-hidden">
           <div className="absolute inset-0 bg-hero-gradient opacity-10 pointer-events-none"></div>
           <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 tracking-tight">
                Blueprint <span className="text-accent">Chains</span>
              </h1>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
                Atomic recipes are powerful. Chained recipes are autonomous. <br/>
                Learn how to link blueprints together to build complete AI agents.
              </p>
           </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-secondary-bg border border-navy-dark rounded-xl overflow-hidden hover:border-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Fallback Cover or Pattern */}
                  <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-secondary-bg to-transparent">
                     </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-4 font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author.name}</span>
                    </div>
                    
                    <h2 className="text-xl font-bold mb-3 text-text-color group-hover:text-accent transition-colors leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-navy-dark flex items-center justify-between text-accent font-bold text-sm">
                      <span>Read Guide</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
}
