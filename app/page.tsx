'use client';

import { useState } from 'react';
import VoiceAIWidget from '@/components/VoiceAIWidget';
import { Sparkles, Target, TrendingUp, Users, Code } from 'lucide-react';

export default function Home() {
  const [showWidget, setShowWidget] = useState(false);
  const [widgetMinimized, setWidgetMinimized] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Symmetri Growth</h1>
          </div>

          {/* Tagline */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Voice AI That Qualifies &
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Converts</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Meet your new AI-powered receptionist. Greets visitors, answers questions,
            and books meetings with your sales team—all through natural conversation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => {
                setShowWidget(true);
                setWidgetMinimized(false);
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Try Voice AI Now
            </button>
            <a
              href="#embed"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Code className="w-5 h-5" />
              Get Embed Code
            </a>
          </div>

          {/* Demo Video/Preview */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-16">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-pulse" />
                <p className="text-gray-400">Click "Try Voice AI Now" to see it in action</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Instant Engagement</h3>
            <p className="text-gray-400 text-sm">Greet every visitor within seconds with natural conversation</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Smart Qualification</h3>
            <p className="text-gray-400 text-sm">AI identifies high-intent visitors and their needs</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">More Meetings</h3>
            <p className="text-gray-400 text-sm">Convert 3x more visitors into booked sales calls</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">24/7 Availability</h3>
            <p className="text-gray-400 text-sm">Never miss a lead, even outside business hours</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="space-y-6">
            {[
              { step: 1, title: 'Visitor Arrives', description: 'AI greets them warmly and asks what brings them to your site' },
              { step: 2, title: 'Discovery', description: 'AI asks clarifying questions to understand their needs' },
              { step: 3, title: 'Brief Answer', description: 'Provides high-level information without overwhelming details' },
              { step: 4, title: 'Book Meeting', description: 'Guides them to schedule a call with your sales team' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embed Code Section */}
        <div id="embed" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Embed On Your Website</h2>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <p className="text-gray-300 mb-4">Add this code snippet to your website:</p>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{`<!-- Symmetri Growth Voice AI Widget -->
<script src="https://your-domain.com/widget.js"></script>
<script>
  SymmetriVoiceAI.init({
    apiKey: 'your-api-key',
    position: 'bottom-right'
  });
</script>`}</code>
              </pre>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              📝 See the README.md file for complete installation instructions
            </p>
          </div>
        </div>

        {/* About Symmetri Growth */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">About Symmetri Growth</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            We combine strategic GTM planning with AI-powered sales automation to help B2B companies
            generate more qualified leads and close more deals.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Our agentic AI platform personalizes outreach at scale, using intent data and intelligent
            automation to drive revenue growth.
          </p>
        </div>
      </div>

      {/* Voice AI Widget */}
      {showWidget && (
        <VoiceAIWidget
          onClose={() => setShowWidget(false)}
          minimized={widgetMinimized}
          onMinimize={() => setWidgetMinimized(!widgetMinimized)}
        />
      )}
    </main>
  );
}
