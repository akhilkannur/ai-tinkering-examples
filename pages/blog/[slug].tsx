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
        return <h2 key={index} className="text-3xl md:text-4xl font-display font-semibold mt-12 mb-6 text-coffee-900 uppercase">{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl md:text-3xl font-display font-semibold mt-10 mb-6 text-coffee-900 uppercase border-b border-coffee-200 pb-2">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl md:text-2xl font-display font-semibold mt-8 mb-4 text-coffee-900 uppercase">{line.replace('### ', '')}</h3>;
      }

      // Images ![alt](url)
      const imageMatch = trimmedLine.match(/^!\[(.*?)\]\s?\((.*?)\)$/);
      if (imageMatch) {
        return (
          <div key={index} className="my-10 rounded-[2rem] border border-coffee-200 shadow-soft overflow-hidden">
            <img src={imageMatch[2]} alt={imageMatch[1]} className="w-full h-auto" />
          </div>
        );
      }

      // Lists
      if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="ml-6 list-none text-coffee-700 font-light mb-4 pl-4 border-l-4 border-coffee-300 text-base leading-relaxed">
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
         return <div key={index} className="my-8 border border-coffee-200 p-6 bg-white rounded-[2rem] shadow-inner-soft" dangerouslySetInnerHTML={{ __html: line }} />;
      }

      // Paragraphs
      return (
        <p key={index} className="text-coffee-700 font-light leading-relaxed mb-6 text-lg">
          <span dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
        </p>
      );
    });
  };

  const parseInline = (text: string) => {
    // Bold
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="bg-coffee-200 px-2 py-0.5 rounded font-semibold text-coffee-900">$1</strong>');
    // Code
    parsed = parsed.replace(/`([^`]+)`/g, '<code class="bg-coffee-900 text-coffee-100 px-2 py-0.5 rounded font-mono text-sm">$1</code>');
    // Images inside text (less common but possible)
    parsed = parsed.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="inline-block max-w-full h-auto rounded-xl border border-coffee-200 my-2" />');
    // Links (Simple)
    parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-coffee-600 font-semibold underline decoration-coffee-300 underline-offset-4 hover:text-coffee-900 hover:bg-coffee-100 transition-colors">$1</a>');
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
    <div className="min-h-screen bg-coffee-100 text-coffee-900 font-sans flex flex-col selection:bg-coffee-300 selection:text-coffee-900">
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

      <main className="flex-grow container mx-auto px-6 pt-32 md:pt-40 pb-24 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-coffee-600 uppercase tracking-widest hover:text-coffee-900 hover:bg-coffee-100 px-3 py-1.5 rounded-full border border-coffee-200 mb-12 transition-all shadow-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Logs
        </Link>

        <article className="mb-24">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-semibold mb-8 leading-[1.1] text-coffee-900 uppercase">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[10px] text-coffee-400 font-mono font-bold uppercase tracking-widest border-b border-coffee-200 pb-8">
              <span className="flex items-center gap-2 bg-coffee-50 px-3 py-1.5 rounded-full border border-coffee-100"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2 bg-coffee-50 px-3 py-1.5 rounded-full border border-coffee-100"><User className="w-4 h-4" /> {post.author.name}</span>
            </div>
          </header>

          {post.coverImage && (
             <div className="mb-12 rounded-[2rem] border border-coffee-200 shadow-soft overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-auto" />
             </div>
          )}

          <div className="prose prose-slate max-w-none">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Related Recipes Section */}
        {relatedRecipes.length > 0 && (
          <div className="border-t border-coffee-200 pt-16">
            <h3 className="text-3xl font-display font-semibold mb-10 flex items-center gap-4 uppercase text-coffee-900">
              <Terminal className="w-8 h-8 text-coffee-500" />
              Blueprints Used
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedRecipes.map(recipe => {
                const CatIcon = categoryIcons[recipe.category] || Terminal;
                return (
                  <Link key={recipe.id} href={`/skills/${recipe.id}`} className="group h-full">
                    <div className="bg-white rounded-[2rem] border border-coffee-100 p-8 shadow-soft hover:shadow-soft-hover hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col overflow-hidden">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-coffee-900 flex items-center justify-center text-coffee-100 shadow-sm">
                          <CatIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold font-mono text-coffee-600 uppercase bg-coffee-100 px-3 py-1 rounded-full border border-coffee-200">
                          {recipe.category}
                        </span>
                      </div>
                      <h4 className="text-xl font-display font-semibold text-coffee-900 group-hover:text-coffee-600 transition-colors mb-4 uppercase leading-tight">
                        {recipe.title}
                      </h4>
                      <p className="text-xs text-coffee-600 mb-6 line-clamp-2 font-light leading-relaxed">
                        {recipe.tagline}
                      </p>
                      <div className="flex items-center justify-between text-coffee-500 font-display text-[10px] uppercase tracking-widest mt-auto pt-4 border-t border-coffee-100">
                        <span>Details</span>
                        <div className="w-8 h-8 rounded-full bg-coffee-50 flex items-center justify-center text-coffee-400 group-hover:bg-coffee-900 group-hover:text-white transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
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
