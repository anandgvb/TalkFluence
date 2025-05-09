# TalkFluence
# AI Based Communication Improvement Tool

## Features

- 🎙️ Voice-based AI simulation practice
- 🤖 Real-time feedback and dynamic responses
- 📊 Performance tracking and analysis
- ⏯️ Simulation control (pause/resume)
- 🛡️ API rate limiting protection
- ♿ WCAG-compliant accessibility features


### Audio Interface

- Play/Pause controls for AI voice responses
- Visual indicators synchronized with audio playback
- Clear audio status feedback
- Alternative text for all audio controls


## Tech Stack
- **Framework**: Next.js 14
- **AI Services**: OpenAI GPT, Deepgram
- **State Management**: React Context
- **Frontend**: React, TailwindCSS
- **API Protection**: In-memory rate limiting
- **Styling**: TailwindCSS with custom animations

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/TalkFluence.git
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following:

   ```env
   OPENAI_API_KEY=your_openai_key
   DEEPGRAM_API_KEY=your_deepgram_key

   # Rate limiting configuration
   RATE_LIMIT_POINTS=10
   RATE_LIMIT_DURATION=1
   RATE_LIMIT_BLOCK_DURATION=60
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Rate Limiting

The application implements rate limiting to protect API endpoints:

- Default limit: 10 requests per second per client
- Block duration: 60 seconds when limit is exceeded
- Tracked by client IP address
- Applies to all API endpoints:
  - Speech-to-Text conversion
  - LLM response generation
  - Text-to-Speech synthesis

## Environment Variables

| Variable                    | Description                                   | Default  |
| --------------------------- | --------------------------------------------- | -------- |
| `OPENAI_API_KEY`            | OpenAI API key for LLM responses              | Required |
| `DEEPGRAM_API_KEY`          | Deepgram API key for voice features           | Required |
| `RATE_LIMIT_POINTS`         | Number of requests allowed per duration       | 10       |
| `RATE_LIMIT_DURATION`       | Time window in seconds                        | 1        |
| `RATE_LIMIT_BLOCK_DURATION` | Block duration in seconds when limit exceeded | 60       |
