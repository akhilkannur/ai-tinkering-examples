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
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-4 text-text-color">{line.replace('# ', '')}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-text-color border-b border-navy-dark pb-2">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-text-color">{line.replace('### ', '')}</h3>;
      }

      // Lists
      if (line.trim().startsWith('* ')) {
        return (
          <li key={index} className="ml-6 list-disc text-text-secondary mb-2 pl-2">
            <span dangerouslySetInnerHTML={{ __html: parseInline(line.replace('* ', '')) }} />
          </li>
        );
      }

      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-4"></div>;
      }

      // Paragraphs
      return (
        <p key={index} className="text-text-secondary leading-relaxed mb-4 text-lg">
          <span dangerouslySetInnerHTML={{ __html: parseInline(line) }} />
        </p>
      );
    });
  };

  const parseInline = (text: string) => {
    // Bold
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-color">$1</strong>');
    // Code
    parsed = parsed.replace(/`([^`]+)`/g, '<code class="bg-navy-dark px-1.5 py-0.5 rounded text-accent font-mono text-sm">$1</code>');
    // Links (Simple)
    parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent hover:underline">$1</a>');
    return parsed;
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://realaiexamples.com';
  const ogImage = `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&mode=blog`;

  return (
    <div className="min-h-screen bg-primary-bg text-text-color font-sans flex flex-col">
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
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-accent mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>

        <article className="mb-16">
          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold font-headline mb-6 leading-tight text-text-color">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-text-secondary font-mono border-b border-navy-dark pb-8">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author.name}</span>
            </div>
          </header>

          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Related Recipes Section */}
        {relatedRecipes.length > 0 && (
          <div className="border-t border-navy-dark pt-12">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-accent" />
              Blueprints Used in This Guide
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedRecipes.map(recipe => {
                const CatIcon = categoryIcons[recipe.category] || Terminal;
                return (
                  <Link key={recipe.id} href={`/blueprints/${recipe.id}`} className="group">
                    <div className="bg-secondary-bg border border-navy-dark p-6 rounded-xl hover:border-accent/50 transition-all duration-300 h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary-bg rounded-lg border border-navy-dark text-accent">
                          <CatIcon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-primary-bg text-text-secondary border border-navy-dark">
                          {recipe.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-text-color group-hover:text-accent transition-colors mb-2">
                        {recipe.title}
                      </h4>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                        {recipe.tagline}
                      </p>
                      <div className="flex items-center text-accent text-sm font-bold mt-auto">
                        View Blueprint <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
