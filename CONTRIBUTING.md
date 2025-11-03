# 🤝 Contributing to Gaya College ERP System

Thank you for your interest in contributing to the Gaya College ERP System! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

- Be respectful and professional
- Focus on constructive feedback
- Help maintain code quality
- Document your changes clearly
- Test thoroughly before submitting

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 14 or higher
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/gaya-college-erp.git
   cd gaya-college-erp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
gaya-college-erp/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── pages/             # Page components
│   │   │   ├── teacher/       # Teacher-specific pages
│   │   │   └── student/       # Student-specific pages
│   │   ├── lib/               # Utilities and helpers
│   │   └── hooks/             # Custom React hooks
├── server/                    # Backend Express application
│   ├── routes/                # API route handlers
│   ├── services/              # Business logic services
│   ├── middleware/            # Express middleware
│   └── index.ts               # Server entry point
├── shared/                    # Shared types and schemas
│   └── schema.ts              # Database schema (Drizzle ORM)
└── electron/                  # Desktop app configuration
```

## 💻 Coding Standards

### TypeScript

- **Always use TypeScript** - No plain JavaScript files
- **Enable strict mode** - All type checking must pass
- **Use interfaces for objects** - Define clear type contracts
- **Avoid `any` type** - Use proper typing or `unknown`

Example:
```typescript
// ✅ Good
interface StudentData {
  name: string;
  email: string;
  batch: string;
}

function createStudent(data: StudentData): Promise<Student> {
  // Implementation
}

// ❌ Bad
function createStudent(data: any) {
  // Implementation
}
```

### React Components

- **Use functional components** - No class components
- **Use TypeScript for props** - Always type component props
- **Follow naming conventions**:
  - Components: `PascalCase` (e.g., `StudentList`)
  - Files: `kebab-case.tsx` (e.g., `student-list.tsx`)
  - Hooks: `useCamelCase` (e.g., `useStudentData`)

Example:
```typescript
// ✅ Good
interface StudentCardProps {
  student: Student;
  onEdit: (id: string) => void;
}

export function StudentCard({ student, onEdit }: StudentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}

// ❌ Bad
export function StudentCard(props: any) {
  return <div>{props.student.name}</div>;
}
```

### Styling

- **Use Tailwind CSS classes** - Avoid inline styles
- **Use shadcn/ui components** - Don't create custom components for common UI elements
- **Follow design system** - Use consistent spacing, colors, and typography
- **Add data-testid attributes** - For all interactive elements

Example:
```typescript
// ✅ Good
<Button 
  data-testid="button-save-student"
  variant="default" 
  onClick={handleSave}
>
  Save Student
</Button>

// ❌ Bad
<button style={{ backgroundColor: 'blue' }} onClick={handleSave}>
  Save
</button>
```

### Backend Development

- **Use services layer** - Keep routes thin, business logic in services
- **Validate all inputs** - Use Zod schemas for validation
- **Use middleware properly** - Authentication and authorization checks
- **Handle errors gracefully** - Return appropriate status codes

Example:
```typescript
// ✅ Good
router.post("/students", requireRole("teacher"), async (req: AuthRequest, res) => {
  try {
    const data = insertStudentSchema.parse(req.body);
    const student = await studentService.create(data, req.user!.id);
    res.status(201).json(student);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Validation error", errors: error.errors });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

// ❌ Bad
router.post("/students", async (req, res) => {
  const student = await db.insert(students).values(req.body);
  res.json(student);
});
```

### Database

- **Use Drizzle ORM** - No raw SQL queries
- **Define schemas in shared/schema.ts** - Keep all table definitions together
- **Use proper data types** - Choose appropriate column types
- **Add validation** - Use Zod schemas for insert/update validation

Example:
```typescript
// shared/schema.ts

// ✅ Good
export const students = pgTable("students", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  status: statusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
});

// ❌ Bad - Missing validation, poor types
export const students = pgTable("students", {
  id: text("id"),
  name: text("name"),
  // No other fields defined
});
```

## 🔄 Making Changes

### Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, documented code
   - Follow coding standards
   - Add data-testid attributes

3. **Test your changes**
   - Test manually in browser
   - Verify both teacher and student views
   - Check responsive design

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add student bulk import feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create pull request**
   - Provide clear description
   - Reference any related issues
   - Add screenshots if UI changes

## 📝 Commit Guidelines

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commits
git commit -m "feat(attendance): add bulk CSV import"
git commit -m "fix(marks): correct percentage calculation"
git commit -m "docs(readme): update installation instructions"

# Bad commits
git commit -m "fixed stuff"
git commit -m "WIP"
git commit -m "updates"
```

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test:

- [ ] Login as teacher
- [ ] Login as student
- [ ] All CRUD operations work
- [ ] Forms validate correctly
- [ ] Error messages display properly
- [ ] Responsive design on mobile
- [ ] Dark mode works correctly
- [ ] No console errors
- [ ] No TypeScript errors

### Testing Commands

```bash
# Type checking
npm run check

# Build (catches build errors)
npm run build
```

## 🔍 Pull Request Process

1. **Ensure your PR**:
   - Has a clear, descriptive title
   - Includes a detailed description
   - References related issues
   - Follows coding standards
   - Passes type checking
   - Is tested manually

2. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   
   ## Testing
   - [ ] Tested as teacher
   - [ ] Tested as student
   - [ ] No TypeScript errors
   - [ ] No console errors
   
   ## Screenshots (if applicable)
   [Add screenshots here]
   
   ## Related Issues
   Fixes #123
   ```

3. **Review Process**:
   - Code review by maintainer
   - Address feedback
   - Ensure CI passes
   - Squash commits if needed
   - Merge when approved

## 🎯 Common Tasks

### Adding a New Page

1. Create page component in appropriate folder:
   ```typescript
   // client/src/pages/teacher/new-feature.tsx
   export default function NewFeature() {
     return <div data-testid="page-new-feature">New Feature</div>;
   }
   ```

2. Register route in App.tsx:
   ```typescript
   import NewFeature from "@/pages/teacher/new-feature";
   
   <Route path="/teacher/new-feature" component={NewFeature} />
   ```

3. Add to sidebar menu:
   ```typescript
   // client/src/components/app-sidebar.tsx
   {
     title: "New Feature",
     url: "/teacher/new-feature",
     icon: IconName,
     group: "Management"
   }
   ```

### Adding a New API Endpoint

1. Define schema in shared/schema.ts (if needed)
2. Create service in server/services/
3. Create route in server/routes/
4. Register route in server/routes.ts
5. Add authentication and authorization middleware

### Adding a Database Table

1. Define table in shared/schema.ts:
   ```typescript
   export const myTable = pgTable("my_table", {
     id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
     // ... other columns
   });
   
   export const insertMyTableSchema = createInsertSchema(myTable).omit({
     id: true,
     createdAt: true,
   });
   ```

2. Push to database:
   ```bash
   npm run db:push
   ```

## 📚 Resources

- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## ❓ Questions?

If you have questions:
- Check existing documentation
- Search closed issues
- Ask in team chat
- Contact maintainers

## 🙏 Thank You!

Your contributions help make this ERP system better for everyone at Gaya College MBA Department!

---

**Happy Coding!** 💻✨
