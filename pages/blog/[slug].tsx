import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
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
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();

      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-3xl md:text-5xl font-bold mt-16 mb-8 text-micro-fg tracking-tight">{line.replace('# ', '')}</h2>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl md:text-4xl font-bold mt-12 mb-6 text-micro-fg tracking-tight border-b border-micro-layer-1 pb-4">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl md:text-3xl font-bold mt-10 mb-5 text-micro-fg tracking-tight">{line.replace('### ', '')}</h3>;
      }

      const imageMatch = trimmedLine.match(/^!\[(.*?)\]\s?\((.*?)\)$/);
      if (imageMatch) {
        return (
          <div key={index} className="my-12 rounded-[40px] border border-micro-layer-1 shadow-soft overflow-hidden">
            <img src={imageMatch[2]} alt={imageMatch[1]} className="w-full h-auto" />
          </div>
        );
      }

      if (trimmedLine.startsWith('* ')) {
        return (
          <li key={index} className="ml-8 list-none text-micro-muted font-medium mb-5 pl-6 border-l-4 border-micro-layer-2 text-lg leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: parseInline(line.replace('* ', '')) }} />
          </li>
        );
      }

      if (trimmedLine === '') {
        return <div key={index} className="h-6"></div>;
      }

      if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
         return <div key={index} className="my-10 border border-micro-layer-1 p-10 bg-micro-layer-1/30 rounded-[40px] shadow-inner-soft" dangerouslySetInnerHTML={{ __html: line }} />;
      }

      return (
        <p key={index} className="text-micro-muted font-medium leading-relaxed mb-8 text-xl">
          <span dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
        </p>
      );
    });
  };

  const parseInline = (text: string) => {
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-micro-fg font-bold">$1</strong>');
    parsed = parsed.replace(/`([^`]+)`/g, '<code class="bg-micro-layer-1 text-micro-fg px-2 py-0.5 rounded font-mono text-base">$1</code>');
    parsed = parsed.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="inline-block max-w-full h-auto rounded-3xl border border-micro-layer-1 my-4" />');
    parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-micro-fg font-bold underline decoration-2 underline-offset-4 hover:text-terminal-lime transition-colors">$1</a>');
    return parsed;
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&mode=blog`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.coverImage || ogImage],
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": [{ "@type": "Person", "name": post.author.name, "url": "https://realaiexamples.com" }]
  };

  return (
    <>
      <Head>
        <title>{post.title} | AI Blueprint Guide | Real AI Examples</title>
        <meta name="description" content={post.excerpt} key="description" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <div className="max-w-4xl mx-auto px-6">
        <Link href="/blog" className="inline-flex items-center gap-3 text-[11px] font-bold text-micro-fg uppercase tracking-[0.2em] hover:text-terminal-lime mb-16 transition-all">
          <ArrowLeft className="w-5 h-5" /> Back to Logs
        </Link>

        <article className="mb-32">
          <header className="mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-10 leading-[0.95] text-micro-fg tracking-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-[11px] text-micro-muted font-bold uppercase tracking-[0.2em] border-b border-micro-layer-1 pb-10">
              <span className="flex items-center gap-3 bg-micro-layer-1 px-4 py-2 rounded-full"><Calendar className="w-4 h-4 text-micro-fg/50" /> {post.date}</span>
              <span className="flex items-center gap-3 bg-micro-layer-1 px-4 py-2 rounded-full"><User className="w-4 h-4 text-micro-fg/50" /> {post.author.name}</span>
            </div>
          </header>

          {post.coverImage && (
             <div className="mb-16 rounded-[48px] border border-micro-layer-1 shadow-micro overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-auto" />
             </div>
          )}

          <div className="prose prose-slate max-w-none">
            {renderContent(post.content)}
          </div>
        </article>

        {relatedRecipes.length > 0 && (
          <div className="border-t border-micro-layer-1 pt-24">
            <h3 className="text-3xl font-bold mb-12 flex items-center gap-5 text-micro-fg tracking-tight">
              <Terminal className="w-10 h-10 text-terminal-lime" />
              Blueprints Used
            </h3>
            <div className="grid md:grid-cols-2 gap-10">
              {relatedRecipes.map(recipe => {
                const CatIcon = categoryIcons[recipe.category] || Terminal;
                return (
                  <Link key={recipe.id} href={`/skills/${recipe.id}`} className="group h-full">
                    <div className="card-micro p-10 h-full flex flex-col overflow-hidden bg-white border border-micro-layer-1 hover:shadow-micro transition-all duration-500 hover:-translate-y-2">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-micro-layer-1 flex items-center justify-center text-micro-fg shadow-sm group-hover:bg-micro-fg group-hover:text-white transition-all">
                          <CatIcon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold text-micro-muted uppercase tracking-[0.2em] bg-micro-layer-1 px-3 py-1.5 rounded-lg border border-micro-layer-1">
                          {recipe.category}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-micro-fg group-hover:underline decoration-2 underline-offset-4 mb-6 leading-tight">
                        {recipe.title}
                      </h4>
                      <p className="text-sm text-micro-muted mb-8 line-clamp-2 font-medium leading-relaxed">
                        {recipe.tagline}
                      </p>
                      <div className="flex items-center justify-between text-micro-fg font-bold text-[11px] uppercase tracking-[0.2em] mt-auto pt-8 border-t border-micro-layer-1">
                        <span>Details</span>
                        <div className="w-10 h-10 rounded-full bg-micro-layer-1 flex items-center justify-center text-micro-fg group-hover:bg-micro-fg group-hover:text-white transition-all shadow-sm">
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
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  if (!post) return { notFound: true };
  const allRecipes = getAllRecipes();
  const relatedRecipes = allRecipes.filter(r => post.relatedRecipes?.includes(r.id));
  return { props: { post, relatedRecipes } };
};
