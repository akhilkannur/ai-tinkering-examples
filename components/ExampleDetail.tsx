import type {ExampleRecord} from '../lib/airtable'

export default function ExampleDetail({example}:{example:ExampleRecord}){
  const imgs = example.screenshots || []
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold">{example.title}</h1>
      <p className="text-slate-600 mt-2">{example.summary}</p>
      <div className="mt-6 flex flex-col gap-4">
        {imgs.map((s, i)=> (
          <img key={i} src={s.url} alt={`${example.title} screenshot ${i+1}`} className="rounded-xl w-full object-cover" />
        ))}
      </div>

      {example.workflow_steps && (
        <section className="mt-6 p-4 border rounded-lg bg-slate-50">
          <h2 className="text-xl font-semibold">How to replicate</h2>
          <pre className="whitespace-pre-wrap text-sm mt-2">{example.workflow_steps}</pre>
        </section>
      )}

      <div className="mt-6 flex gap-3">
        {example.original_link && <a href={example.original_link} target="_blank" rel="noreferrer" className="text-sm underline">View original</a>}
        {example.author_link && <a href={example.author_link} target="_blank" rel="noreferrer" className="text-sm">By {example.author_name}</a>}
      </div>
    </article>
  )
}
