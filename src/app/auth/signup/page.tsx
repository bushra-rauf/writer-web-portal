import Link from "next/link"
import SignupForm from "./SignupForm"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-center text-gray-600 mb-8">Join WriterHub today</p>

          <SignupForm />

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-semibold">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
