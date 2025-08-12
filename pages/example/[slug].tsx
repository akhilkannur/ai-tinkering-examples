import { GetStaticPaths, GetStaticProps } from 'next'
import Navbar from '../../components/Navbar'
import ExampleDetail from '../../components/ExampleDetail'
import { fetchExamples, fetchExampleBySlug, ExampleRecord } from '../../lib/airtable'

export default function ExamplePage({ example }:{example:ExampleRecord}){
  if(!example) return <div>Not found</div>
  return (
    <div>
      <Navbar />
      <ExampleDetail example={example} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const examples = await fetchExamples()
  const paths = examples.map(e => ({ params: { slug: e.slug } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const example = await fetchExampleBySlug(slug)
  if(!example) return { notFound: true }
  return { props: { example }, revalidate: 60 }
}
