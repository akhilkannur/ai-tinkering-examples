import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                AI Examples
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/ai-examples"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname.startsWith('/ai-examples')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Examples
              </Link>
              <Link
                href="/tools"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname.startsWith('/tools')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Tools
              </Link>
              <Link
                href="/jobs"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname.startsWith('/jobs')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Jobs
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <a
              href="https://airtable.com/appUo7R0la4VUzOoT/shrk9A6i9TF4UjTfo"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Submit an Example
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}