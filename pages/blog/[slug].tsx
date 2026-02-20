import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import Navbar from '../../components/Navbar';
import { getAllPosts, getPostBySlug, BlogPost } from '../../lib/blog';
import { getAllRecipes } from '../../lib/recipes';
import { Recipe, categoryIcons } from '../../lib/cookbook-data';
import { ArrowLeft, User, Calendar, ArrowRight, Terminal } from 'lucide-react';
import React from 'react';

interface BlogPostPageProps {
  post: BlogPost;
  relatedRecipes: Recipe[];
}

export default function BlogPostPage({ post, relatedRecipes }: BlogPostPageProps) {
  // Simple Markdown Renderer
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();

      // Headers
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-3xl md:text-4xl font-display mt-12 mb-6 text-black uppercase decoration-wavy underline decoration-[#ccff00]">{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl md:text-3xl font-display mt-10 mb-6 text-black uppercase border-b-4 border-black pb-2">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl md:text-2xl font-display mt-8 mb-4 text-black uppercase">{line.replace('### ', '')}</h3>;
      }

      // Images ![alt](url)
      const imageMatch = trimmedLine.match(/^!\[(.*?)\]\s?\((.*?)\)$/);
      if (imageMatch) {
        return (
          <div key={index} className="my-10 border-4 border-black brutalist-shadow-sm overflow-hidden">
            <img src={imageMatch[2]} alt={imageMatch[1]} className="w-full h-auto grayscale-[30%] hover:grayscale-0 transition-all duration-500" />
          </div>
        );
      }

      // Lists
      if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="ml-6 list-none text-black font-black font-mono mb-4 pl-4 border-l-4 border-[#ff00ff] uppercase text-sm">
            <span dangerouslySetInnerHTML={{ __html: parseInline(line.replace('* ', '')) }} />
          </li>
        );
      }

      // Empty lines
      if (trimmedLine === '') {
        return <div key={index} className="h-4"></div>;
      }

      // Raw HTML (Video tags, Twitter embeds)
      if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
         return <div key={index} className="my-8 border-2 border-black p-4 bg-gray-50" dangerouslySetInnerHTML={{ __html: line }} />;
      }

      // Paragraphs
      return (
        <p key={index} className="text-black font-bold leading-relaxed mb-6 text-lg">
          <span dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
        </p>
      );
    });
  };

  const parseInline = (text: string) => {
    // Bold
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="bg-[#ccff00] px-1 border-b-2 border-black font-black">$1</strong>');
    // Code
    parsed = parsed.replace(/`([^`]+)`/g, '<code class="bg-black text-[#00ffff] px-2 py-0.5 font-mono text-sm border border-black">$1</code>');
    // Images inside text (less common but possible)
    parsed = parsed.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="inline-block max-w-full h-auto border-2 border-black my-2" />');
    // Links (Simple)
    parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#ff00ff] font-black underline decoration-2 underline-offset-4 hover:bg-[#ff00ff] hover:text-white transition-colors">$1</a>');
    // Handle HTML <b> tags from earlier rebrand
    parsed = parsed.replace(/<b>(.*?)<\/b>/g, '<strong class="bg-[#ccff00] px-1 border-b-2 border-black font-black">$1</strong>');
    return parsed;
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&mode=blog`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
      post.coverImage || ogImage
    ],
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": [{
        "@type": "Person",
        "name": post.author.name,
        "url": "https://realaiexamples.com"
      }]
  };

  return (
    <div className="min-h-screen bg-primary-bg text-black font-sans flex flex-col selection:bg-[#ff00ff] selection:text-white">
      <Head>
        <title>{post.title} | AI Blueprint Guide | Real AI Examples</title>
        <meta name="description" content={post.excerpt} key="description" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" key="og:type" />
        <meta property="og:title" content={`${post.title} | AI Blueprint Guide`} key="og:title" />
        <meta property="og:description" content={post.excerpt} key="og:description" />
        <meta property="og:image" content={ogImage} key="og:image" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:title" content={`${post.title} | AI Blueprint Guide`} key="twitter:title" />
        <meta name="twitter:description" content={post.excerpt} key="twitter:description" />
        <meta name="twitter:image" content={ogImage} key="twitter:image" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 pt-32 pb-24 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-black text-black uppercase tracking-widest hover:bg-[#ccff00] px-2 py-1 border border-black mb-12 transition-all">
          <ArrowLeft className="w-4 h-4 stroke-[3px]" /> Back to Logs
        </Link>

        <article className="mb-24">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-display mb-8 leading-tight text-black uppercase glitch-text" data-text={post.title.toUpperCase()}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] text-gray-500 font-mono font-black uppercase tracking-widest border-b-4 border-black pb-8">
              <span className="flex items-center gap-2 bg-gray-100 px-2 py-1 border border-black"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2 bg-gray-100 px-2 py-1 border border-black"><User className="w-4 h-4" /> {post.author.name}</span>
            </div>
          </header>

          {post.coverImage && (
             <div className="mb-12 border-4 border-black brutalist-shadow overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-auto grayscale-[30%]" />
             </div>
          )}

          <div className="prose prose-slate max-w-none">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Related Recipes Section */}
        {relatedRecipes.length > 0 && (
          <div className="border-t-4 border-black pt-16">
            <h3 className="text-3xl font-display mb-10 flex items-center gap-4 uppercase decoration-wavy underline decoration-[#00ffff]">
              <Terminal className="w-8 h-8 text-black stroke-[3px]" />
              Blueprints Used
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedRecipes.map(recipe => {
                const CatIcon = categoryIcons[recipe.category] || Terminal;
                return (
                  <Link key={recipe.id} href={`/skills/${recipe.id}`} className="group h-full">
                    <div className="bg-white border-4 border-black p-6 brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-300 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 bg-black flex items-center justify-center text-[#ccff00] border-2 border-black">
                          <CatIcon className="w-5 h-5 stroke-[3px]" />
                        </div>
                        <span className="text-[10px] font-black font-mono text-black uppercase bg-gray-100 px-2 py-1 border border-black">
                          {recipe.category}
                        </span>
                      </div>
                      <h4 className="text-xl font-display text-black group-hover:text-[#ff00ff] transition-colors mb-4 uppercase leading-tight">
                        {recipe.title}
                      </h4>
                      <p className="text-xs font-black font-mono text-black/60 mb-6 line-clamp-2 uppercase">
                        // {recipe.tagline}
                      </p>
                      <div className="flex items-center justify-between text-black font-display text-[10px] uppercase tracking-widest mt-auto pt-4 border-t-2 border-black/10">
                        <span>Details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3px]" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>

    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  
  if (!post) {
    return { notFound: true };
  }

  const allRecipes = getAllRecipes();
  // Filter recipes that match the IDs in relatedRecipes
  const relatedRecipes = allRecipes.filter(r => post.relatedRecipes?.includes(r.id));

  return {
    props: {
      post,
      relatedRecipes
    },
  };
};
