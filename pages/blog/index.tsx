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
    <>
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

      <div>
        {/* Hero */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-32 pt-8 md:pt-12">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-8 leading-[0.9] text-white drop-shadow-md">
            The operator <br /><span className="font-instrument font-normal italic lowercase opacity-90">logbook.</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            Documenting the exact steps I take to automate work as a non-technical builder. Real workflows, no fluff.
          </p>
        </div>

        <div className="glass-sheet rounded-sm md:rounded-sm p-4 md:p-16 lg:p-24 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group h-full">
                <article className="card-micro h-full flex flex-col overflow-hidden bg-white border border-micro-layer-1 hover:shadow-micro transition-all duration-500 hover:-translate-y-2">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="aspect-[16/9] overflow-hidden relative border-b border-micro-layer-1">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5 md:p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] text-micro-muted mb-6 font-bold uppercase tracking-[0.2em]">
                      <span className="flex items-center gap-2 bg-micro-layer-1 px-3 py-1.5 rounded-sm">{post.date}</span>
                    </div>

                    <h2 className="text-2xl font-bold mb-6 text-micro-fg group-hover:underline decoration-2 underline-offset-8 transition-all leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-micro-muted text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-8 border-t border-micro-layer-1 flex items-center justify-between text-micro-fg font-bold text-[11px] uppercase tracking-[0.2em]">
                      <span className="group-hover:text-terminal-lime transition-colors">Read Guide</span>
                      <div className="w-12 h-12 rounded-sm bg-micro-layer-1 flex items-center justify-center text-micro-fg group-hover:bg-micro-fg group-hover:text-white transition-all shadow-sm">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
}
