import React from 'react';
import { TrendingUp, Shield, Zap, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';
import Ticker from '../Common/Ticker';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Smart Investments',
      description: 'AI-powered portfolio optimization with real-time market analysis'
    },
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'Military-grade encryption and secure wallet generation'
    },
    {
      icon: Zap,
      title: 'Instant Trading',
      description: 'Lightning-fast transactions with minimal fees'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 professional guidance from crypto specialists'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Entrepreneur',
      content: 'CryptoArmory transformed my investment strategy. The returns have been incredible!',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      role: 'Software Engineer',
      content: 'The platform is intuitive and the security features give me complete peace of mind.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Financial Advisor',
      content: 'Best crypto investment platform I\'ve used. The analytics are top-notch.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white">CryptoArmory</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-8 mb-8 rounded-xl overflow-hidden border border-gray-700/40">
            <Ticker />
          </div>
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Future of
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Crypto Investment</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of investors who trust CryptoArmory for professional cryptocurrency portfolio management. 
              Start building your digital wealth today with our AI-powered investment platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <span>Start Investing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">$2.4B+</div>
              <div className="text-gray-400">Assets Under Management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">150K+</div>
              <div className="text-gray-400">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">98.7%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose CryptoArmory?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of cryptocurrency investment with our cutting-edge platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-200 hover:transform hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Crypto Assets Preview */}
      <section className="py-20 bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Invest in Top Cryptocurrencies
            </h2>
            <p className="text-xl text-gray-400">
              Access the most promising digital assets with professional management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Bitcoin', symbol: 'BTC', price: '$65,420', change: '+2.45%', icon: '₿' },
              { name: 'Ethereum', symbol: 'ETH', price: '$3,240', change: '-1.23%', icon: 'Ξ' },
              { name: 'Solana', symbol: 'SOL', price: '$145', change: '+5.67%', icon: '◎' },
              { name: 'Cardano', symbol: 'ADA', price: '$0.58', change: '+3.21%', icon: '₳' }
            ].map((crypto, index) => (
              <div
                key={index}
                className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {crypto.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{crypto.symbol}</h3>
                    <p className="text-gray-400 text-sm">{crypto.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-white">{crypto.price}</p>
                  <p className={`text-sm font-medium ${
                    crypto.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {crypto.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products/Tools Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">Tier 1 Liquidity</h3>
              <p className="text-gray-400">Trade on deep, high-quality liquidity for minimal slippage.</p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">Safe and Secure</h3>
              <p className="text-gray-400">Insured custody and best-in-class security practices.</p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">Enhanced Tools</h3>
              <p className="text-gray-400">Cutting-edge research, analytics, and execution terminals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted by Investors Worldwide
            </h2>
            <p className="text-xl text-gray-400">
              See what our community has to say about their investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600/50 transition-all duration-200"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Crypto Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join CryptoArmory today and take control of your financial future with professional crypto investment management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Sign In
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>No hidden fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Instant withdrawals</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">CryptoArmory</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Professional cryptocurrency investment platform designed for modern investors. 
                Build your digital wealth with confidence and security.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/signup" className="hover:text-white transition-colors duration-200">Get Started</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors duration-200">Sign In</Link></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700/50 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 CryptoArmory. All rights reserved. | Professional crypto investment platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;