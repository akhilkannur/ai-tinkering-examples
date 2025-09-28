import type {ExampleRecord} from '../lib/airtable'
import { Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { useState } from 'react'

export default function ExampleDetail({example}:{example:ExampleRecord}){
  const imgs = example.screenshots || []
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: example.title,
        text: example.summary,
        url: url,
      })
    } else {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = example.title;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold">{example.title}</h1>
      <p className="text-slate-600 mt-2">{example.summary}</p>
      <div className="mt-6 flex flex-col gap-4">
        {imgs.map((s, i)=> (
          <img key={i} src={s.url} alt={example.title} className="rounded-xl w-full object-cover" />
        ))}
      </div>

      {example.workflow_steps && (
        <section className="mt-6 p-4 border rounded-lg bg-slate-50">
          <h2 className="text-xl font-semibold">How to replicate</h2>
          <pre className="whitespace-pre-wrap text-sm mt-2">{example.workflow_steps}</pre>
        </section>
      )}

      {example.tags && example.tags.length > 0 && (
        <section className="mt-6">
          <div className="flex flex-wrap gap-2">
            {example.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  index % 2 === 0 ? 'bg-accent text-white' : 'bg-navy-light text-text-color'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="mt-6 flex flex-wrap gap-4 items-center">
        {example.original_link && <a href={example.original_link} target="_blank" rel="noreferrer" className="text-sm underline">View original</a>}
        {example.author_link && <a href={example.author_link} target="_blank" rel="noreferrer" className="text-sm">By {example.author_name}</a>}
        <button onClick={handleShare} className="text-sm flex items-center gap-1">
          <Share2 size={14} />
          <span>{copied ? 'Copied!' : 'Share'}</span>
        </button>

        <div className="flex gap-2">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Facebook size={16} />
          </a>
          <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
            <Twitter size={16} />
          </a>
          <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors">
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </article>
  )
}
