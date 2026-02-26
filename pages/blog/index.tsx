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
    <div className="min-h-screen bg-primary-bg text-black font-sans selection:bg-[#ff00ff] selection:text-white flex flex-col">
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

      <main className="flex-grow pt-32">
        <div className="bg-white border-b-4 border-black py-20 relative overflow-hidden mb-12">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff00ff] opacity-10 blur-xl"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ccff00] opacity-10 blur-xl"></div>
           
           <div className="container mx-auto px-4 text-center relative z-10">
              <div className="inline-block bg-black text-[#ccff00] px-3 py-1 text-xs font-black uppercase tracking-[0.2em] mb-6 transform -rotate-1 border-2 border-black brutalist-shadow-sm">
                Non-Technical Automation
              </div>
              <h1 className="text-5xl md:text-7xl font-display mb-6 tracking-tight uppercase glitch-text" data-text="THE OPERATOR LOGS">
                The Operator <span className="text-[#ff00ff]">Logs</span>
              </h1>
              <p className="text-xl md:text-2xl text-black font-black max-w-2xl mx-auto leading-relaxed border-l-8 border-[#ccff00] pl-6 py-2 bg-gray-50 text-left">
                I document the exact steps I take to automate work as a non-technical builder. <br/>
                Read how I build scrapers, sales bots, and data tools from an AI-Native perspective.
              </p>
           </div>
        </div>

        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                <article className="bg-white border-4 border-black brutalist-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 h-full flex flex-col">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="h-48 overflow-hidden relative border-b-4 border-black">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4 font-mono font-black uppercase tracking-widest">
                      <span className="flex items-center gap-1 bg-gray-100 px-1 border border-black"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1 bg-gray-100 px-1 border border-black"><User className="w-3 h-3" /> {post.author.name}</span>
                    </div>
                    
                    <h2 className="text-2xl font-display mb-4 text-black group-hover:text-[#ff00ff] transition-colors leading-tight uppercase">
                      {post.title}
                    </h2>
                    
                    <p className="text-black text-sm font-black font-mono leading-relaxed mb-8 line-clamp-3 uppercase">
                      // {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t-2 border-black/10 flex items-center justify-between text-black font-display text-xs uppercase tracking-widest">
                      <span className="group-hover:bg-[#ccff00] transition-colors px-1 border border-black">Read Guide</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3px]" />
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
