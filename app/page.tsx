import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Task Track
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
        Organize your tasks, boost your productivity, and achieve your goals with our intuitive task management platform.
      </p>
      <div className="space-x-4">
        <Link
          href="/signin"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
