# 🎙️ ElevenLabs Ultra-Realistic Voice Setup

Your Growth Lab Voice AI now uses **ElevenLabs** for near-human voice quality! This is a MASSIVE upgrade from browser TTS.

## 🔥 Why ElevenLabs?

**Before (Browser TTS):**
- ❌ Robotic, monotone voice
- ❌ Unnatural pauses
- ❌ No emotion or personality
- ❌ Sounds like a computer

**After (ElevenLabs):**
- ✅ **Nearly indistinguishable from human**
- ✅ Natural rhythm and breathing
- ✅ Emotional range and inflection
- ✅ Professional broadcast quality
- ✅ Multiple voice options

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Free ElevenLabs API Key

1. **Go to** [elevenlabs.io](https://elevenlabs.io)
2. **Sign up** for a free account
3. **Go to** Profile → API Keys
4. **Create** a new API key
5. **Copy** the key (starts with something like `sk_...`)

**Free Tier Includes:**
- 10,000 characters per month (free forever!)
- Access to all voices
- Turbo v2.5 model (fastest & best)

### Step 2: Add API Key to Your Project

Edit your `.env.local` file:

```bash
ELEVENLABS_API_KEY=sk_your_actual_api_key_here
```

### Step 3: Test It!

```bash
npm run dev
```

Open http://localhost:3000 and try the voice AI. You'll hear the difference immediately!

---

## 🎭 Available Voices

Change the voice in `components/VoiceAIWidget.tsx` line 160:

### **Recommended Voices:**

#### **Rachel** (Default - Professional Female)
```typescript
voice: 'Rachel'
```
- ✅ Warm, professional
- ✅ Perfect for business/sales
- ✅ Clear and articulate
- **Best for:** Growth Lab, professional settings

#### **Drew** (Professional Male)
```typescript
voice: 'Drew'
```
- Confident, authoritative
- News anchor quality
- **Best for:** Executive/leadership voice

#### **Freya** (Enthusiastic Female)
```typescript
voice: 'Freya'
```
- Energetic, friendly
- Younger sounding
- **Best for:** Startup/tech companies

#### **Clyde** (Deep Male)
```typescript
voice: 'Clyde'
```
- Deep, resonant
- Trustworthy tone
- **Best for:** Financial/serious topics

### Full Voice Library

Explore all voices at: https://elevenlabs.io/voice-library

---

## ⚙️ Voice Settings (Advanced)

In `app/api/text-to-speech/route.ts`, customize these settings:

```typescript
voiceSettings: {
  stability: 0.5,        // 0-1: Higher = more consistent
  similarityBoost: 0.75, // 0-1: Voice similarity (keep high)
  style: 0.5,            // 0-1: Exaggeration (0.3-0.6 is natural)
  useSpeakerBoost: true, // Better clarity
}
```

**For Most Natural Sound:**
- Stability: `0.4 - 0.6`
- Similarity: `0.7 - 0.8`
- Style: `0.3 - 0.5`

**For More Expressive:**
- Stability: `0.3 - 0.4`
- Style: `0.6 - 0.8`

---

## 💰 Pricing & Limits

### Free Tier
- **10,000 characters/month**
- All voices included
- Commercial use allowed
- Perfect for testing/small sites

**Example Usage:**
- ~50-100 conversations per month
- Each greeting = ~50 characters
- Each response = ~100-200 characters

### Starter ($5/month)
- **30,000 characters**
- ~150-300 conversations

### Creator ($22/month)
- **100,000 characters**
- ~500-1000 conversations

### Pro ($99/month)
- **500,000 characters**
- ~2500-5000 conversations

**Calculate your needs:**
- Average conversation = 3-5 AI responses
- Average response = 150 characters
- Total per conversation = ~600 characters

---

## 🔄 Fallback Behavior

If ElevenLabs API key is not set or fails:
- ✅ Automatically falls back to browser TTS
- ✅ No errors or crashes
- ⚠️ Voice quality will be robotic again

This means you can test without an API key, but the voice won't sound human-like.

---

## 🎯 Testing Different Voices

To A/B test voices, try these in `VoiceAIWidget.tsx`:

```typescript
// Professional & Warm (Current)
voice: 'Rachel'

// Energetic & Friendly
voice: 'Freya'

// Authoritative Male
voice: 'Drew'

// Calm & Trustworthy
voice: 'Clyde'
```

Restart your dev server after each change.

---

## 🐛 Troubleshooting

### Voice Not Working?

1. **Check API key is set:**
   ```bash
   echo $ELEVENLABS_API_KEY
   ```

2. **Check console for errors:**
   - Open browser DevTools (F12)
   - Look for TTS API errors

3. **Verify API key is valid:**
   - Go to elevenlabs.io → Profile → API Keys
   - Make sure key isn't revoked

### Voice Sounds Off?

- Try adjusting voice settings
- Try a different voice
- Check your monthly quota isn't exceeded

### Slow Response Time?

- ElevenLabs is usually fast (~1-2 seconds)
- If slow, check your internet connection
- Turbo v2.5 model is the fastest

---

## 📊 Monitoring Usage

Track your usage at: https://elevenlabs.io/app/usage

- See characters used
- Monitor quota
- View cost breakdown

Set up alerts when you're close to limit!

---

## 🚀 Production Deployment

### For Replit:
1. Add `ELEVENLABS_API_KEY` to Secrets
2. Deploy as normal

### For Vercel:
1. Add environment variable in project settings
2. Redeploy

### For WordPress (iframe):
1. Deploy widget to Replit/Vercel with API key
2. Embed as normal (iframe will use your deployed API)

---

## 🎤 Voice Quality Comparison

### Browser TTS (Old):
```
"Hey, welcome to the Growth Lab, what brings you here?"
```
🤖 Sounds like GPS navigation

### ElevenLabs (New):
```
"Hey, welcome to the Growth Lab, what brings you here?"
```
👤 Sounds like a real person greeting you!

**The difference is night and day!**

---

## 💡 Pro Tips

1. **Test multiple voices** - each has unique personality
2. **Adjust stability** for your brand voice
3. **Monitor usage** to stay within limits
4. **Use shorter responses** to save characters
5. **Cache common phrases** (future optimization)

---

## 🔐 Security

- ⚠️ **Never commit** your API key to git
- ✅ Always use environment variables
- ✅ Keys are server-side only (not exposed to browser)
- ✅ ElevenLabs keys start with `sk_` - keep them secret!

---

## 📞 Support

**ElevenLabs Issues:**
- Discord: discord.gg/elevenlabs
- Email: support@elevenlabs.io
- Docs: docs.elevenlabs.io

**Voice AI Issues:**
- Check console for errors
- Verify all environment variables are set
- Try the fallback browser TTS to isolate issue

---

## 🎉 You're All Set!

Your voice AI now sounds **almost indistinguishable from a human**.

Visitors will be amazed! 🚀

Test it live and compare to the old browser voice - you'll never go back!
