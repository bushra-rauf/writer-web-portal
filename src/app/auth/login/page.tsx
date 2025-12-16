import Link from "next/link"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-center text-gray-600 mb-8">Log in to your account</p>

          <LoginForm />

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
