import Link from "next/link";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to Task Tracker
        </h1>
        <div className="space-x-4">
          <Link
            href="/signin"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
