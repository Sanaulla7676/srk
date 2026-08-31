import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Diagonal-split sign in / create account card. The tan accent panel and
 * the dark form panel swap sides on toggle — that slide is the signature
 * move from the reference animation.
 *
 * AuthAccentCopy/AuthFormFields are top-level components (not defined
 * inside AuthCard) on purpose: defining a component inside another
 * component's body gives it a new identity every render, which makes
 * React tear down and rebuild the whole subtree (losing input focus,
 * mid-typing) on every keystroke. Keeping them stable top-level
 * components is what actually fixes that.
 *
 * Pass `allowSignUp={false}` for admin-only contexts (no public signup).
 */

function AuthAccentCopy({ isSignUp, allowSignUp, onToggle }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isSignUp ? 'signup-copy' : 'signin-copy'}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="text-center px-6"
      >
        <h2 className="font-rkSans font-extrabold uppercase text-2xl sm:text-3xl text-rkNight leading-tight">
          {isSignUp ? (
            <>
              Start your
              <br />
              <span className="font-rkScript font-normal normal-case text-4xl sm:text-5xl">journey.</span>
            </>
          ) : (
            <>
              Welcome
              <br />
              <span className="font-rkScript font-normal normal-case text-4xl sm:text-5xl">back.</span>
            </>
          )}
        </h2>
        <p className="text-xs text-rkNight/70 mt-4 max-w-[220px] mx-auto">
          {isSignUp
            ? 'Create an account to track orders, save your wishlist, and check out faster.'
            : allowSignUp
            ? 'Sign in to view your orders, wishlist, and RK Insider points.'
            : 'Sign in to manage your store.'}
        </p>
        {allowSignUp && (
          <button
            type="button"
            onClick={onToggle}
            className="mt-6 inline-flex items-center gap-2 border border-rkNight/40 hover:border-rkNight text-rkNight text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full transition-colors"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function AuthFormFields({
  isSignUp,
  allowSignUp,
  brandLine,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  error,
  isSubmitting,
  onSubmit,
  onToggle
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.form
        key={isSignUp ? 'signup-form' : 'signin-form'}
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="w-full max-w-[280px] space-y-4"
      >
        <div>
          <p className="font-rkScript text-2xl text-rkTan leading-none mb-1">Shri</p>
          <h1 className="font-serif text-xl font-bold text-white">{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          <p className="text-[11px] text-white/40 mt-1">{brandLine}</p>
        </div>

        {isSignUp && (
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-rkTan rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors"
            />
          </div>
        )}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-rkTan rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-rkTan rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-colors"
          />
        </div>

        {error && <p className="text-red-400 text-xs font-medium">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-rkTan hover:bg-rkTanHover text-rkNight text-[11px] font-bold tracking-[0.15em] uppercase py-3 rounded-full transition-colors disabled:opacity-60"
        >
          {isSubmitting ? 'Please wait…' : isSignUp ? 'Create Account' : 'Sign In'}
        </button>

        {allowSignUp && (
          <p className="text-center text-[11px] text-white/40">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={onToggle} className="text-rkTan font-semibold hover:underline">
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        )}
      </motion.form>
    </AnimatePresence>
  );
}

export default function AuthCard({
  brandLine = 'Shri R.K. Fashions',
  allowSignUp = true,
  onSignIn,
  onSignUp
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = () => {
    setError('');
    setIsSignUp((v) => !v);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (isSignUp) await onSignUp(name, email, password);
      else await onSignIn(email, password);
    } catch (err) {
      setError(
        err?.code === 'auth/email-already-in-use'
          ? 'An account with that email already exists — try signing in instead.'
          : err?.code === 'auth/weak-password'
          ? 'Password should be at least 6 characters.'
          : 'Invalid email or password.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formProps = {
    isSignUp,
    allowSignUp,
    brandLine,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    onSubmit: handleSubmit,
    onToggle: handleToggle
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-rkNight" style={{ height: 560 }}>
      {/* Mobile: stacked, no diagonal */}
      <div className="sm:hidden h-full flex flex-col">
        <div className="bg-gradient-to-br from-rkTan to-rkGold flex items-center justify-center py-8">
          <AuthAccentCopy isSignUp={isSignUp} allowSignUp={allowSignUp} onToggle={handleToggle} />
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <AuthFormFields {...formProps} />
        </div>
      </div>

      {/* Desktop: diagonal split that swaps sides */}
      <div className="hidden sm:block relative w-full h-full">
        <motion.div
          className="absolute top-0 bottom-0 w-1/2 flex items-center justify-center"
          animate={{ left: isSignUp ? '50%' : '0%' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <AuthFormFields {...formProps} />
        </motion.div>

        <motion.div
          className="absolute top-0 bottom-0 w-[55%] bg-gradient-to-br from-rkTan to-rkGold flex items-center justify-center"
          animate={{ left: isSignUp ? '-5%' : '50%' }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            clipPath: isSignUp
              ? 'polygon(0 0, 88% 0, 100% 100%, 0 100%)'
              : 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)'
          }}
        >
          <AuthAccentCopy isSignUp={isSignUp} allowSignUp={allowSignUp} onToggle={handleToggle} />
        </motion.div>
      </div>
    </div>
  );
}
