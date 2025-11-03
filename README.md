# 🎓 Gaya College MBA ERP System

A comprehensive Enterprise Resource Planning (ERP) system designed specifically for the Gaya College MBA Department. This full-stack application provides role-based access for Teachers and Students with features including student management, attendance tracking, timetable management, online examinations, marks management, e-book library, and more.

## ✨ Features

### 👨‍🏫 For Teachers
- **Dashboard** - Overview of students, attendance rates, and performance metrics
- **Student Management** - Create, view, edit, and archive student records with audit trail
- **Attendance Tracking** - Mark attendance manually or bulk import via CSV with percentage calculations
- **Timetable Management** - Create and manage class schedules with event creation
- **Online Examinations** - Create MCQ/text-based exams with auto-grading capabilities
- **Marks Management** - Enter and manage student marks with grade calculation
- **E-Book Library** - Upload and manage educational resources
- **Event Management** - Schedule and manage academic events
- **Database Dashboard** - Real-time metrics and backup management
- **AI Chat Bot** - Conversational assistant for queries and insights

### 👨‍🎓 For Students
- **Personal Dashboard** - View attendance, upcoming exams, and performance
- **Attendance Records** - View personal attendance across all subjects
- **Timetable Access** - View class schedules and upcoming events
- **Online Exams** - Take examinations with time limits
- **Marks Viewing** - Access grades and performance analytics
- **E-Book Access** - Browse and read educational materials
- **Notes & Journal** - Personal note-taking system with tags and organization
- **ID Card** - Digital student ID card with QR code

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS + Radix UI
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Authentication**: JWT + Express Session
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Desktop**: Electron (for Windows/Mac/Linux native apps)

### Project Structure
```
.
├── client/                 # Frontend React application
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page components
│       ├── lib/            # Utilities and helpers
│       └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── routes/             # API route handlers
│   ├── middleware/         # Express middleware (auth, etc.)
│   └── index.ts            # Server entry point
├── shared/                 # Shared code between frontend and backend
│   └── schema.ts           # Database schema and types
├── electron/               # Electron desktop app configuration
│   ├── main.js             # Electron main process
│   └── icon.png            # Application icon
└── scripts/                # Build and deployment scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or Neon)
- npm or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/gaya-college-erp.git
   cd gaya-college-erp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/gaya_erp
   
   # Session Secret (generate a random string)
   SESSION_SECRET=your-super-secret-key-change-this-in-production
   
   # OpenAI (for chatbot - optional)
   OPENAI_API_KEY=sk-your-openai-api-key
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Web: http://localhost:5000
   - Default login credentials:
     - Teacher: `teacher@gaya.edu` / `password123`
     - Student: `student@gaya.edu` / `password123`

## 📦 Native Desktop Application

### Building for Windows 11

1. **Build the web application**
   ```bash
   npm run build
   ```

2. **Package for Windows**
   ```bash
   ./scripts/electron-build-win.sh
   ```

3. **Output files**
   - `electron-dist/GayaCollegeERP-Setup-1.0.0.exe` - Full installer
   - `electron-dist/GayaCollegeERP-Portable-1.0.0.exe` - Portable version

### Testing Native App in Development
```bash
# Terminal 1: Start web server
npm run dev

# Terminal 2: Launch Electron
./scripts/electron-dev.sh
```

### Distribution
Share the generated `.exe` files with users. The installer includes:
- Desktop shortcut creation
- Start Menu integration
- Native Windows 11 integration
- Offline capability
- Single-instance enforcement

## 🗄️ Database Schema

The system includes the following database tables:

- **users** - Authentication and user information
- **students** - Student profiles and enrollment details
- **subjects** - Subject/course information
- **attendance** - Attendance records
- **timetable** - Class schedules
- **exams** - Examination details
- **questions** - Exam questions and answers
- **exam_attempts** - Student exam submissions
- **marks** - Grade records
- **ebooks** - E-book library
- **notes** - Student notes and journals
- **syllabus** - Course syllabus
- **events** - Academic events and schedules
- **event_rsvps** - Event attendance tracking
- **audit_logs** - System audit trail

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Separate permissions for teachers and students
- **Password Hashing** - bcrypt for secure password storage
- **Session Management** - Secure session handling
- **CSRF Protection** - Cross-site request forgery protection
- **SQL Injection Prevention** - Parameterized queries via Drizzle ORM
- **XSS Protection** - Content sanitization
- **Audit Logging** - Track all critical actions

## 🎨 Design System

- **Color Scheme**: Professional green theme (hsl 142, 76%, 36%)
- **Components**: shadcn/ui with Radix UI primitives
- **Layout**: Responsive sidebar navigation with compact spacing
- **Dark Mode**: Full dark mode support
- **Typography**: System fonts with professional hierarchy
- **Icons**: Lucide React icons

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Students (Teachers only)
- `GET /api/students` - List all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Archive student

### Attendance
- `POST /api/attendance` - Mark attendance
- `POST /api/attendance/bulk` - Bulk import attendance
- `GET /api/attendance` - Get attendance records
- `GET /api/attendance/summary/:studentId` - Get student summary

### Subjects
- `GET /api/subjects` - List subjects
- `POST /api/subjects` - Create subject

## 🧪 Testing

```bash
# Run type checking
npm run check

# Build for production
npm run build
```

## 📊 Performance Optimizations

- **Code Splitting** - React.lazy for route-based splitting
- **Memoization** - useMemo and useCallback for expensive operations
- **Image Optimization** - Lazy loading and responsive images
- **Bundle Size** - Optimized production builds
- **Database Indexing** - Proper indexes on frequently queried columns

## 🔄 Future Enhancements

- [ ] Progressive Web App (PWA) support
- [ ] Auto-update system for native apps
- [ ] Push notifications
- [ ] Real-time collaboration features
- [ ] Advanced analytics dashboard
- [ ] Mobile apps (iOS/Android) via Capacitor
- [ ] Automated backup system
- [ ] Integration with third-party services
- [ ] Multi-language support
- [ ] Parent portal access

## 📝 Development Guidelines

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Consistent naming conventions
- Component-based architecture

### Git Workflow
1. Create feature branch from `main`
2. Make changes with clear commit messages
3. Test thoroughly
4. Create pull request
5. Code review and merge

### Database Migrations
```bash
# Push schema changes to database
npm run db:push

# Force push if needed
npm run db:push --force
```

## 🐛 Troubleshooting

### Common Issues

**Database connection fails**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify credentials and database exists

**Build errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist electron-dist`

**Native app won't start**
- Check for other instances running
- Run as Administrator
- Check Windows Event Viewer for errors

## 📄 License

Copyright © 2024-2025 Gaya College MBA Department. All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## 👥 Support

For issues, questions, or feature requests:
- Contact: Gaya College MBA IT Department
- Email: support@gayacollege.edu
- Internal Support Portal: [Link]

## 🙏 Acknowledgments

Built with modern web technologies and best practices for educational institutions.

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**Status**: Production Ready ✅
