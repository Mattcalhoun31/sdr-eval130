# Symmetri Growth Voice AI Assistant 🎙️

An AI-powered voice assistant that greets website visitors, qualifies leads, and books sales meetings automatically. Built with Next.js, OpenAI, and the Web Speech API.

## ✨ Features

- **Voice Conversation**: Natural voice interaction using Web Speech API
- **AI-Powered**: Smart responses using OpenAI GPT-4
- **Lead Qualification**: Asks discovery questions to understand visitor needs
- **Meeting Booking**: Integrates with Calendly for seamless scheduling
- **Embeddable**: Easy-to-embed widget for any website
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Transcription**: See conversations as they happen

## 🎯 Perfect For

- B2B SaaS companies
- Marketing agencies
- Sales teams
- Any business that wants to convert more website visitors into qualified leads

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))
- Calendly account (optional, for meeting booking)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sdr-eval130.git
   cd sdr-eval130
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Add your OpenAI API key**

   Edit `.env.local` and add your API key:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/meeting
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Modify the AI Assistant Personality

Edit the system prompt in `app/api/chat/route.ts`:

```typescript
const SYSTEM_PROMPT = `You are a friendly and professional AI receptionist...`;
```

### Update Calendly Integration

Replace the Calendly URL in `components/VoiceAIWidget.tsx`:

```typescript
<iframe
  src="https://calendly.com/your-link-here"
  width="100%"
  height="100%"
/>
```

Or set it in your `.env.local`:

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/meeting
```

### Change Widget Styling

Modify the colors and design in `components/VoiceAIWidget.tsx`:

```typescript
className="bg-gradient-to-r from-blue-600 to-purple-600"
```

## 📦 Embedding on Your Website

### Option 1: Iframe Embed (Simple)

Add this code to your website where you want the widget to appear:

```html
<iframe
  src="https://your-domain.com"
  width="400"
  height="600"
  frameborder="0"
  style="position: fixed; bottom: 20px; right: 20px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);"
></iframe>
```

### Option 2: JavaScript Widget (Advanced)

1. **Deploy your Next.js app** to Vercel, Netlify, or your hosting provider

2. **Add the widget script** to your website's HTML (before `</body>`):

```html
<!-- Symmetri Growth Voice AI Widget -->
<script src="https://your-deployed-domain.com/widget.js"></script>
<script>
  SymmetriVoiceAI.init({
    apiKey: 'your-api-key',
    position: 'bottom-right'
  });
</script>
```

### Option 3: React Component (For React Apps)

Simply import and use the component:

```jsx
import VoiceAIWidget from './components/VoiceAIWidget';

function App() {
  return (
    <div>
      <YourContent />
      <VoiceAIWidget />
    </div>
  );
}
```

## 🎙️ Browser Compatibility

The voice features work best in:
- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Safari (limited support)
- ❌ Firefox (speech recognition not supported)

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `NEXT_PUBLIC_CALENDLY_URL` | Your Calendly booking link | Optional |
| `NEXT_PUBLIC_WIDGET_POSITION` | Widget position (bottom-right, bottom-left) | Optional |
| `NEXT_PUBLIC_PRIMARY_COLOR` | Widget primary color (hex) | Optional |

## 📊 Conversation Analytics (Coming Soon)

Track important metrics:
- Number of conversations started
- Average conversation length
- Meeting booking conversion rate
- Common visitor questions
- Intent signals detected

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI**: OpenAI GPT-4 via Vercel AI SDK
- **Voice**: Web Speech API (browser-native)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📝 API Routes

### POST `/api/chat`

Handles conversation with the AI assistant.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "What services do you offer?" }
  ]
}
```

**Response:** Streaming text response from OpenAI

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (OPENAI_API_KEY, etc.)
   - Deploy!

3. **Update widget.js**

   Replace `your-domain.com` with your actual Vercel domain

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any platform that supports Next.js

## 🔐 Security

- Never commit your `.env.local` file
- Keep your OpenAI API key secure
- Consider rate limiting the `/api/chat` endpoint
- Add authentication if needed for production use

## 🎯 Customization for Symmetri Growth

This widget is specifically designed for **Symmetri Growth** and focuses on:

1. **Lead Qualification**: Understanding visitor needs and intent
2. **GTM Strategy**: Positioning AI-powered sales automation
3. **Meeting Booking**: Converting qualified leads to sales calls
4. **Concise Communication**: Brief answers that drive action

To adapt for your business:
- Update company information in `app/api/chat/route.ts`
- Modify the greeting and conversation flow
- Adjust qualification questions for your target audience
- Update styling to match your brand colors

## 📞 Support

For questions or issues:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [OpenAI API docs](https://platform.openai.com/docs)
- Open an issue in this repository

## 📄 License

MIT License - feel free to use this for your own projects!

## 🎉 Get Started

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and click "Try Voice AI Now" to test the assistant!

---

Built with ❤️ for Symmetri Growth - Combining GTM Strategy + Agentic AI
