# Nuxt Blog & Productivity App

A modern, full-stack web application built with Nuxt 3, featuring a comprehensive blog system, todo list management, and real-time chat functionality. This application provides a complete productivity suite with user authentication, rich text editing, and responsive design.

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** with email verification
- **Secure Authentication** powered by Supabase
- **Protected Routes** with middleware
- **OAuth Integration** support
- **User Profile Management**

### 📝 Blog Management
- **Rich Text Editor** with TipTap integration
- **Create, Edit, Delete** blog posts
- **Blog Post Preview** in real-time
- **Slug-based URLs** for SEO optimization
- **Author Attribution** with timestamps
- **Responsive Blog Layout**
- **Blog Post Filtering** by author

### ✅ Todo List (Coming Soon)
- **Task Management** with CRUD operations
- **Task Categories** and priorities
- **Due Date Tracking**
- **Task Completion Status**
- **Progress Visualization**

### 💬 Chat System (Planned)
- **Real-time Messaging** between users
- **Group Chat Support**
- **Message History**
- **Online Status Indicators**
- **File Sharing Capabilities**

### 🎨 User Interface
- **Modern Design** with Nuxt UI components
- **Responsive Layout** for all devices
- **Collapsible Sidebar** navigation
- **Toast Notifications** for user feedback
- **Dark/Light Mode** support
- **Intuitive Navigation**

## 🛠️ Tech Stack

### Frontend
- **[Nuxt 3](https://nuxt.com/)** - Vue.js framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Nuxt UI](https://ui.nuxt.com/)** - Beautiful UI components
- **[TipTap](https://tiptap.dev/)** - Rich text editor
- **[Nuxt Image](https://image.nuxt.com/)** - Image optimization
- **[Vue Toastification](https://github.com/Maronato/vue-toastification)** - Toast notifications

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security (RLS)** - Data protection
- **Real-time subscriptions** - Live updates

### Development Tools
- **TypeScript** - Type safety
- **Vite** - Build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nuxt-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Create a new Supabase project
   - Set up the required tables (see Database Schema section)
   - Configure Row Level Security policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
nuxt-app/
├── assets/                 # Static assets
│   ├── css/               # Global styles
│   ├── icons/             # SVG icons
│   └── img/               # Images
├── components/            # Vue components
│   ├── blog-form.vue      # Blog creation/editing form
│   ├── blog-post.vue      # Blog post display
│   ├── confirm-dialog.vue # Confirmation dialogs
│   ├── navbar.vue         # Navigation bar
│   ├── sidebar.vue        # Sidebar navigation
│   └── tiptap-editor.vue  # Rich text editor
├── composables/           # Vue composables
│   ├── useAuth.ts         # Authentication logic
│   └── useSidebar.ts      # Sidebar state management
├── layouts/               # Layout components
│   ├── auth-layout.vue    # Authenticated user layout
│   └── default.vue        # Default layout
├── middleware/            # Route middleware
│   └── auth.ts            # Authentication middleware
├── pages/                 # Application pages
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog-related pages
│   └── todo/              # Todo list pages
├── plugins/               # Nuxt plugins
├── server/                # Server-side code
├── types/                 # TypeScript type definitions
├── nuxt.config.ts         # Nuxt configuration
└── package.json           # Project dependencies
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate` - Generate static site
- `npm run postinstall` - Prepare Nuxt

## 📝 Usage Guide

### Creating a Blog Post
1. Sign in to your account
2. Navigate to the "Post" section in the sidebar
3. Fill in the title and content using the rich text editor
4. Preview your post in real-time
5. Click "Post" to publish

### Managing Your Blogs
1. Go to "My Blogs" in the sidebar
2. View all your published posts
3. Edit or delete posts using the action buttons
4. Click "Read More" to view the full post

### Todo List (Coming Soon)
1. Navigate to "Todo List" in the sidebar
2. Add new tasks with priorities and due dates
3. Mark tasks as complete
4. Filter and sort your tasks

## 🔧 Configuration

### Supabase Configuration
The app uses Supabase for authentication and database operations. Configure your Supabase settings in `nuxt.config.ts`:

```typescript
supabase: {
  redirectOptions: {
    login: '/login',
    callback: '/auth/callback',
    exclude: ['/register', '/login', '/confirm-email'],
    include: ['/'],
  },
  url: process.env.SUPABASE_URL,
  key: process.env.SUPABASE_ANON_KEY,
}
```

### UI Configuration
The app uses Nuxt UI for styling. You can customize the theme and components as needed.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

### Phase 1: Core Features ✅
- [x] User authentication system
- [x] Blog creation and management
- [x] Rich text editor integration
- [x] Responsive design
- [x] Basic navigation

### Phase 2: Enhanced Features 🚧
- [ ] Complete todo list functionality
- [ ] Advanced blog features (tags, categories)
- [ ] User profiles and settings
- [ ] Search functionality
- [ ] Comment system

### Phase 3: Advanced Features 📅
- [ ] Real-time chat system
- [ ] File upload and management
- [ ] Advanced permissions
- [ ] Analytics dashboard
- [ ] Mobile app (PWA)

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) team for the amazing framework
- [Supabase](https://supabase.com/) for the excellent backend services
- [TipTap](https://tiptap.dev/) for the rich text editor
- [Nuxt UI](https://ui.nuxt.com/) for the beautiful components

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.