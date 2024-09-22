'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { useSearchParams, useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'

type ViewType = 'login' | 'signup' | 'forgot'

interface FormProps {
  setView: (view: ViewType) => void
}

const AuthPage = () => {
  const [view, setView] = useState<ViewType>('login')
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, error, isLoading } = useUser()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  useEffect(() => {
    const viewParam = searchParams.get('view') as ViewType
    if (viewParam && ['login', 'signup', 'forgot'].includes(viewParam)) {
      setView(viewParam)
    }
  }, [searchParams])

  const handleSetView = (newView: ViewType) => {
    setView(newView)
    router.push(`/auth?view=${newView}`, { scroll: false })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const slideVariants = {
    enterLeft: { x: '-100%', opacity: 0 },
    enterRight: { x: '100%', opacity: 0 },
    center: { x: '0%', opacity: 1 },
    exitLeft: { x: '-100%', opacity: 0 },
    exitRight: { x: '100%', opacity: 0 },
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-white dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB]">
      <AnimatePresence initial={false} mode="wait">
        {view === 'signup' ? (
          <>
            <motion.div
              key="signup-form"
              variants={slideVariants}
              initial="enterLeft"
              animate="center"
              exit="exitLeft"
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 flex items-center justify-center bg-[#F0F4F8] dark:bg-[#1E3A8A] absolute md:relative left-0 top-0 bottom-0 z-10"
            >
              <SignupForm setView={handleSetView} />
            </motion.div>
            <motion.div
              key="signup-image"
              className="hidden md:block w-1/2 relative"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[#3B82F6] dark:bg-[#60A5FA] opacity-100" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F97316] rounded-full" />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              key="login-image"
              className="hidden md:block w-1/2 relative"
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-[#3B82F6] dark:bg-[#60A5FA] opacity-100" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F97316] rounded-full" />
            </motion.div>
            <motion.div
              key="login-form"
              variants={slideVariants}
              initial="enterRight"
              animate="center"
              exit="exitRight"
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 flex items-center justify-center bg-[#F0F4F8] dark:bg-[#1E3A8A] absolute md:relative right-0 top-0 bottom-0 z-10"
            >
              {view === 'login' && <LoginForm setView={handleSetView} />}
              {view === 'forgot' && <ForgotPasswordForm setView={handleSetView} />}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile background image */}
      <div className="md:hidden fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#3B82F6] dark:bg-[#60A5FA] opacity-70" />
      </div>
    </div>
  )
}

const LoginForm: React.FC<FormProps> = ({ setView }) => (
  <div className="w-full max-w-md space-y-4 p-8">
    <h2 className="text-2xl font-bold text-center text-[#1E3A8A] dark:text-white">Log In</h2>
    <Button className="w-full bg-white dark:bg-[#3B82F6] text-[#4B5563] dark:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#60A5FA]" variant="outline" onClick={() => window.location.href = '/api/auth/login?connection=google-oauth2'}>
      <FaGoogle className="mr-2" /> Continue with Google
    </Button>
    <Button className="w-full bg-white dark:bg-[#3B82F6] text-[#4B5563] dark:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#60A5FA]" variant="outline" onClick={() => window.location.href = '/api/auth/login?connection=github'}>
      <FaGithub className="mr-2" /> Continue with GitHub
    </Button>
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-[#4B5563] dark:border-[#E5E7EB]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[#F0F4F8] dark:bg-[#1E3A8A] px-2 text-[#4B5563] dark:text-[#E5E7EB]">Or continue with</span>
      </div>
    </div>
    <form action="/api/auth/login" method="POST">
      <Input type="email" name="email" placeholder="Email" className="bg-white dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB] mb-4" required />
      <Input type="password" name="password" placeholder="Password" className="bg-white dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB] mb-4" required />
      <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white">Log In</Button>
    </form>
    <div className="text-center">
      <button onClick={() => setView('forgot')} className="text-sm text-[#3B82F6] dark:text-[#60A5FA] hover:underline">
        Forgot password?
      </button>
    </div>
    <div className="text-center">
      <span className="text-sm">Don't have an account? </span>
      <button onClick={() => setView('signup')} className="text-sm text-[#3B82F6] dark:text-[#60A5FA] hover:underline">
        Sign up
      </button>
    </div>
  </div>
)

const SignupForm: React.FC<FormProps> = ({ setView }) => (
  <div className="w-full max-w-md space-y-4 p-8">
    <h2 className="text-2xl font-bold text-center text-[#1E3A8A] dark:text-white">Sign Up</h2>
    <Button className="w-full bg-white dark:bg-[#3B82F6] text-[#4B5563] dark:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#60A5FA]" variant="outline" onClick={() => window.location.href = '/api/auth/login?connection=google-oauth2'}>
      <FaGoogle className="mr-2" /> Continue with Google
    </Button>
    <Button className="w-full bg-white dark:bg-[#3B82F6] text-[#4B5563] dark:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#60A5FA]" variant="outline" onClick={() => window.location.href = '/api/auth/login?connection=github'}>
      <FaGithub className="mr-2" /> Continue with GitHub
    </Button>
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-[#4B5563] dark:border-[#E5E7EB]" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[#F0F4F8] dark:bg-[#1E3A8A] px-2 text-[#4B5563] dark:text-[#E5E7EB]">Or continue with</span>
      </div>
    </div>
    <form action="/api/auth/signup" method="POST">
      <Input type="text" name="name" placeholder="Full Name" className="bg-white dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB] mb-4" required />
      <Input type="email" name="email" placeholder="Email" className="bg-white dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB] mb-4" required />
      <Input type="password" name="password" placeholder="Password" className="bg-white dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB] mb-4" required />
      <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white">Sign Up</Button>
    </form>
    <div className="text-center">
      <span className="text-sm">Already have an account? </span>
      <button onClick={() => setView('login')} className="text-sm text-[#3B82F6] dark:text-[#60A5FA] hover:underline">
        Log in
      </button>
    </div>
  </div>
)

const ForgotPasswordForm: React.FC<FormProps> = ({ setView }) => (
  <div className="w-full max-w-md space-y-4 p-8">
    <h2 className="text-2xl font-bold text-center text-[#1E3A8A] dark:text-white">Forgot Password</h2>
    <p className="text-center text-sm text-[#4B5563] dark:text-[#E5E7EB]">
      Enter your email address and we'll send you a link to reset your password.
    </p>
    <form action="/api/auth/forgot-password" method="POST">
      <Input type="email" name="email" placeholder="Email" className="bg-white dark:bg-[#0A1930] text-[#4B5563] dark:text-[#E5E7EB] mb-4" required />
      <Button type="submit" className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white">Send Reset Link</Button>
    </form>
    <div className="text-center">
      <button onClick={() => setView('login')} className="text-sm text-[#3B82F6] dark:text-[#60A5FA] hover:underline">
        Back to Log In
      </button>
    </div>
  </div>
)

export default AuthPage