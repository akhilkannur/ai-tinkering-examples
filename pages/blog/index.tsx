import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { getAllPosts, BlogPost } from '../../lib/blog';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface BlogIndexProps {
  posts: BlogPost[];
}

export default function BlogIndex({ posts }: BlogIndexProps) {
  const title = "The Operator Logbook | Real AI Examples";
  const description = "I document the exact steps I take to automate work as a non-technical builder. Read how I use AI to build scrapers, sales bots, and data tools without writing code from scratch.";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?mode=home`;

  return (
    <div className="min-h-screen bg-coffee-100 text-coffee-900 font-sans selection:bg-coffee-300 selection:text-coffee-900 flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={title} key="og:title" />
        <meta property="og:description" content={description} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta name="twitter:description" content={description} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />
      </Head>

      <Navbar />

      <main className="flex-grow pt-32 md:pt-40">
        <div className="bg-white border-b border-coffee-200 py-20 md:py-32 relative overflow-hidden mb-12 shadow-inner-soft">
           <div className="absolute top-0 right-0 w-96 h-96 bg-coffee-200/40 rounded-full blur-3xl pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-coffee-300/10 rounded-full blur-3xl pointer-events-none"></div>
           
           <div className="container mx-auto px-4 text-center relative z-10">
              <div className="inline-block bg-white text-coffee-600 px-5 py-2 rounded-full font-medium text-xs tracking-widest uppercase mb-8 border border-coffee-200 shadow-sm">
                Non-Technical Automation
              </div>
              <h1 className="text-5xl md:text-8xl font-display font-semibold text-coffee-900 mb-8 tracking-tight uppercase leading-[1.1]">
                The Operator <span className="text-coffee-500">Logs</span>
              </h1>
              <p className="text-xl md:text-2xl text-coffee-700 font-light max-w-2xl mx-auto leading-relaxed border-l-4 border-coffee-500 pl-8 py-4 bg-coffee-50/50 rounded-r-[2rem]">
                I document the exact steps I take to automate work as a non-technical builder. <br/>
                Read how I build scrapers, sales bots, and data tools from an AI-Native perspective.
              </p>
           </div>
        </div>

        <div className="container mx-auto px-6 py-16 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                <article className="bg-white rounded-[2rem] shadow-soft border border-coffee-100 hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="aspect-[16/9] overflow-hidden relative border-b border-coffee-100">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-coffee-900/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] text-coffee-400 mb-6 font-mono font-bold uppercase tracking-widest">
                      <span className="flex items-center gap-2 bg-coffee-50 px-2 py-1 rounded-full border border-coffee-100"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-2 bg-coffee-50 px-2 py-1 rounded-full border border-coffee-100"><User className="w-3 h-3" /> {post.author.name}</span>
                    </div>
                    
                    <h2 className="text-2xl font-display font-semibold mb-4 text-coffee-900 group-hover:text-coffee-600 transition-colors leading-tight uppercase">
                      {post.title}
                    </h2>
                    
                    <p className="text-coffee-700 text-sm font-light leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-coffee-100 flex items-center justify-between text-coffee-800 font-display text-xs uppercase tracking-widest">
                      <span className="group-hover:text-coffee-500 transition-colors">Read Guide</span>
                      <div className="w-10 h-10 rounded-full bg-coffee-50 flex items-center justify-center text-coffee-500 group-hover:bg-coffee-900 group-hover:text-white transition-colors">
                        <i className="ph ph-arrow-up-right text-lg"></i>
                      </div>
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
