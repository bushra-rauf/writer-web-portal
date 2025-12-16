# WriterHub - Writer Web Portal

A modern, responsive digital marketplace platform for independent writers to self-publish and sell books.

## Features

- **For Readers:**
  - Browse and search for books across multiple categories
  - View detailed book information and previews
  - Purchase books securely
  - Rate and review books
  - Filter books by category and sort by various criteria

- **For Writers:**
  - Create writer profiles
  - Upload and publish books
  - Manage published books
  - Track book performance
  - View reader ratings and reviews

- **Technical Features:**
  - Fully responsive design (mobile, tablet, desktop)
  - Secure authentication with Supabase
  - Real-time database updates
  - Professional UI with Tailwind CSS
  - Server-side rendering with Next.js

## Tech Stack

- **Frontend:** React 18, Next.js 14, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deployment:** Vercel (recommended)

## Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier available)
- Git

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd writer-web-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

   Fill in your Supabase credentials in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

4. **Set up Supabase Database:**

   In your Supabase dashboard, run the following SQL to create tables:

   ```sql
   -- Writers table
   CREATE TABLE writers (
     id UUID PRIMARY KEY REFERENCES auth.users(id),
     email TEXT UNIQUE NOT NULL,
     full_name TEXT,
     bio TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Books table
   CREATE TABLE books (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     writer_id UUID NOT NULL REFERENCES writers(id) ON DELETE CASCADE,
     writer_name TEXT NOT NULL,
     title TEXT NOT NULL,
     description TEXT,
     category TEXT,
     price DECIMAL(10, 2),
     content TEXT,
     cover_image TEXT,
     rating DECIMAL(3, 2),
     published BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Ratings table
   CREATE TABLE ratings (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     review TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Purchases table
   CREATE TABLE purchases (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     purchase_date TIMESTAMP DEFAULT NOW(),
     amount DECIMAL(10, 2)
   );

   -- Enable RLS (Row Level Security)
   ALTER TABLE writers ENABLE ROW LEVEL SECURITY;
   ALTER TABLE books ENABLE ROW LEVEL SECURITY;
   ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
   ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

   -- RLS Policies for books (public read)
   CREATE POLICY "Books are viewable by everyone" ON books
     FOR SELECT USING (true);

   CREATE POLICY "Writers can insert their own books" ON books
     FOR INSERT WITH CHECK (auth.uid() = writer_id);

   CREATE POLICY "Writers can update their own books" ON books
     FOR UPDATE USING (auth.uid() = writer_id);

   CREATE POLICY "Writers can delete their own books" ON books
     FOR DELETE USING (auth.uid() = writer_id);
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
writer-web-portal/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Home page
│   ├── books/
│   │   ├── page.jsx        # Books listing page
│   │   └── [id]/
│   │       └── page.jsx    # Individual book detail page
│   ├── dashboard/
│   │   └── page.jsx        # Writer dashboard
│   ├── login/
│   │   └── page.jsx        # Login page
│   └── signup/
│       └── page.jsx        # Signup page
├── components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── Footer.jsx          # Footer component
│   └── BookCard.jsx        # Book card component
├── lib/
│   └── supabase.js         # Supabase client & auth functions
├── styles/
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Key Features Explanation

### Authentication
- Secure user authentication using Supabase Auth
- Different user types (readers and writers)
- Protected routes for dashboard

### Book Management
- Writers can create, update, and delete books
- Books include title, description, category, price, and content
- Dynamic pricing support

### Search & Filtering
- Real-time search across book titles and authors
- Category-based filtering
- Multiple sorting options (newest, price, rating)

### Rating System
- Readers can rate and review books
- Average rating calculation
- Review display on book details page

### Responsive Design
- Mobile-first approach
- Tested on all device sizes
- Touch-friendly interface

## Development

### Code Style
- ESLint configured for consistent code style
- Tailwind CSS for styling
- Component-based architecture

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
vercel
```

## API Reference

All API calls are made through Supabase client. Key functions:

- `signUp(email, password)` - Register new user
- `signIn(email, password)` - Login user
- `signOut()` - Logout user
- `getSession()` - Get current user session
- `signUpWriter(email, password, userData)` - Register as writer

## Common Issues & Solutions

**Issue:** "Missing Supabase environment variables"
- **Solution:** Copy `.env.example` to `.env.local` and fill in your Supabase credentials

**Issue:** "Cannot read property 'user' of null"
- **Solution:** Ensure you're logged in before accessing user-specific features

**Issue:** "CORS errors"
- **Solution:** Check Supabase project settings → API → CORS configuration

## Future Enhancements

- Payment integration (Stripe/PayPal)
- Email notifications
- Advanced analytics dashboard
- Book recommendations algorithm
- Social sharing features
- Wishlist functionality
- Author follow system
- Reading progress tracking

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the repository.

## Author

Created as a full-stack web development project.

---

**Happy Publishing! 📚**
