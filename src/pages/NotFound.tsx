import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="pt-16">
      <section className="bg-white py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-blue-500">404</h1>
          <p className="mt-4 text-xl text-green-700">This page has run dry.</p>
          <p className="mt-4 text-gray-600">
            The page you were looking for doesn't exist or has moved.
          </p>
          <Link
            to="/"
            className="inline-block mt-8 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  )
}
