# 🌌 Neko

![Neko](./public/nekobinCover.jpg)

A modern, fast, and elegant pastebin service built with Next.js and Supabase. Share code snippets, text, and collaborate with others seamlessly.

🌐 **Live Demo:** (https://nekobin.kumarvikalp48.workers.dev/)

## ✨ Features

- 🎨 **Clean Interface** - Minimalist design inspired by modern code editors
- 🌙 **Dark/Light Theme** - Toggle between themes with persistent preferences
- 🚀 **Fast & Reliable** - Built on Next.js and Supabase for optimal performance
- 🔒 **No Registration** - Create and share pastes instantly without signing up
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎯 **Syntax Highlighting** - Support for 50+ programming languages
- ⌨️ **Keyboard Shortcuts** - Efficient workflow with hotkeys
- 🔗 **RESTful API** - Programmatic access for developers
- 📋 **Raw Text Access** - Direct access to paste content
- 🔍 **SEO Optimized** - Proper meta tags and Open Graph support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kumar-vikalp/Neko.git
   cd Neko
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase** (see detailed instructions below)

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/login
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - **Name**: `Neko` (or your preferred name)
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait for the project to be ready (2-3 minutes)

### Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API Key** → **anon public** (starts with `eyJ...`)

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 4: Run Database Migrations

The database schema will be automatically created when you first run the application. The migrations are located in `supabase/migrations/` and include:

- **Pastes table** with columns: id, slug, content, language, title, created_at
- **Row Level Security (RLS)** policies for public read/write access
- **Indexes** for optimal query performance

## 🎮 Usage

### Web Interface

1. **Create a Paste**
   - Visit (https://nekobin.kumarvikalp48.workers.dev/)
   - Paste your content in the text area
   - Press `Ctrl+S` to save
   - Share the generated URL

2. **Keyboard Shortcuts**
   - `Ctrl+S` - Save current paste
   - `Ctrl+N` - Create new paste

3. **Theme Toggle**
   - Click the moon/sun icon in the header
   - Your preference is saved automatically

### API Usage

The Neko API provides full CRUD operations for pastes.

**Base URL:** `https://nekobin.kumarvikalp48.workers.dev/api`

#### Create a Paste

```bash
curl -X POST https://nekobin.kumarvikalp48.workers.dev/api/pastes \
  -H "Content-Type: application/json" \
  -d '{
    "content": "console.log(\"Hello, World!\");",
    "language": "javascript",
    "title": "My First Paste"
  }'
```

**Response:**
```json
{
  "id": "uuid-here",
  "slug": "abc12345",
  "content": "console.log(\"Hello, World!\");",
  "language": "javascript",
  "title": "My First Paste",
  "created_at": "2024-01-01T12:00:00Z"
}
```

#### Get a Paste

```bash
curl https://nekobin.kumarvikalp48.workers.dev/api/pastes/abc12345
```

#### Get Raw Content

```bash
curl https://nekobin.kumarvikalp48.workers.dev/api/pastes/abc12345/raw
```

#### Update a Paste

```bash
curl -X PUT https://nekobin.kumarvikalp48.workers.dev/api/pastes/abc12345 \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated content here",
    "language": "javascript",
    "title": "Updated Title"
  }'
```

#### Delete a Paste

```bash
curl -X DELETE https://nekobin.kumarvikalp48.workers.dev/api/pastes/abc12345
```

### JavaScript/Node.js Example

```javascript
// Create a new paste
const createPaste = async () => {
  const response = await fetch('https://nekobin.kumarvikalp48.workers.dev/api/pastes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: 'function hello() {\n  return "Hello, World!";\n}',
      language: 'javascript',
      title: 'Hello Function'
    })
  });
  
  const paste = await response.json();
  console.log('Paste created:', paste);
  return paste;
};

// Get a paste
const getPaste = async (slug) => {
  const response = await fetch(`https://nekobin.kumarvikalp48.workers.dev/api/pastes/${slug}`);
  const paste = await response.json();
  console.log('Paste content:', paste);
  return paste;
};
```

### Python Example

```python
import requests
import json

# Create a paste
def create_paste(content, language='text', title=None):
    url = 'https://nekobin.kumarvikalp48.workers.dev/api/pastes'
    data = {
        'content': content,
        'language': language,
        'title': title
    }
    
    response = requests.post(url, json=data)
    return response.json()

# Get a paste
def get_paste(slug):
    url = f'https://nekobin.kumarvikalp48.workers.dev/api/pastes/{slug}'
    response = requests.get(url)
    return response.json()

# Example usage
paste = create_paste('print("Hello, World!")', 'python', 'Python Hello')
print(f"Created paste: {paste['slug']}")
```

## 🛠️ Development

### Project Structure

```
Neko/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── paste/[slug]/      # Dynamic paste pages
│   ├── about/             # About page
│   ├── docs/              # Documentation
│   └── api-docs/          # API documentation
├── components/            # React components
├── lib/                   # Utility libraries
├── supabase/             # Database migrations
├── actions/              # Server actions
└── public/               # Static assets
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run deploy       # Deploy to Cloudflare (if configured)
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | ✅ |

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy using Wrangler**
   ```bash
   npm run deploy
   ```

### Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Inspired by modern pastebin services

## 📞 Support

- 📚 **Documentation**: [https://nekobin.kumarvikalp48.workers.dev/docs](https://nekobin.kumarvikalp48.workers.dev/docs)
- 🔧 **API Docs**: [https://nekobin.kumarvikalp48.workers.dev/api-docs](https://nekobin.kumarvikalp48.workers.dev/api-docs)
- 🐛 **Issues**: [GitHub Issues](https://github.com/m0ansterr/Neko/issues)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/Kumar-vikalp">Vikalp</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
