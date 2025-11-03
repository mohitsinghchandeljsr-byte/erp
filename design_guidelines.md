# Design Guidelines: MBA College ERP System

## Design Approach

**Selected Approach:** Design System (shadcn/ui Foundation)
**Rationale:** Educational ERP systems prioritize clarity, efficiency, and data density over visual experimentation. The shadcn/ui component library provides professional, accessible components optimized for information-heavy applications. This ensures consistency across Teacher and Student interfaces while maintaining distinct functional hierarchies.

**Core Principles:**
- **Clarity over creativity** - Information must be instantly scannable
- **Functional density** - Pack data efficiently without overwhelming users
- **Role-appropriate hierarchy** - Teacher dashboards emphasize control; Student dashboards emphasize consumption
- **Academic professionalism** - Clean, trustworthy, institutional aesthetic

---

## Typography System

**Font Stack:**
- Primary: `Inter` (Google Fonts) - exceptional readability for UI and data
- Monospace: `JetBrains Mono` - for student IDs, codes, timestamps

**Type Scale:**
- Hero/Page Titles: `text-4xl` (36px), `font-bold`
- Section Headers: `text-2xl` (24px), `font-semibold`
- Card Titles: `text-lg` (18px), `font-medium`
- Body Text: `text-base` (16px), `font-normal`
- Metadata/Labels: `text-sm` (14px), `font-medium`
- Captions/Timestamps: `text-xs` (12px), `font-normal`

**Line Height:**
- Headlines: `leading-tight` (1.25)
- Body text: `leading-relaxed` (1.625)
- Data tables: `leading-normal` (1.5)

---

## Layout System

**Spacing Primitives:**
Use Tailwind units of **2, 4, 6, 8, 12, 16** exclusively for consistency.
- Micro spacing (icons, badges): `gap-2`, `p-2`
- Component padding: `p-4` to `p-6`
- Section spacing: `mb-8`, `space-y-8`
- Page margins: `px-6 lg:px-12`, `py-8`

**Grid & Container Strategy:**
```
Desktop Container: max-w-7xl mx-auto px-6
Content Areas: max-w-6xl
Narrow Forms: max-w-2xl
Full-width Tables: w-full with horizontal scroll
```

**Layout Patterns by Screen:**

**Teacher Dashboard (Information Dense):**
- Two-column layout: Left sidebar (280px fixed) + Main content area
- Sidebar: Collapsible navigation with icons and labels
- Main area: 3-4 column metric cards at top, followed by data tables
- Card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`

**Student Dashboard (Consumption Focused):**
- Single-column primary flow with prominent cards
- Hero section: Upcoming exams/attendance summary (80vh max)
- Content sections: `max-w-4xl mx-auto` for comfortable reading
- Card layout: `grid grid-cols-1 md:grid-cols-2 gap-6`

**Data Tables:**
- Full-width with `overflow-x-auto`
- Fixed header on scroll
- Row height: `h-12` (compact) to `h-16` (comfortable)
- Alternating row treatment for scanability

---

## Component Library

### Navigation
**Top Header (Both Roles):**
- Height: `h-16`
- Structure: Logo (left) | Search bar (center-left) | Theme toggle + Notifications + User menu (right)
- Search: `w-96` on desktop, expandable icon on mobile
- Sticky: `sticky top-0 z-50`

**Sidebar Navigation (Teacher):**
- Width: `w-72`, collapsible to `w-16` (icon-only)
- Groups: Student Management, Academics, Resources, System
- Active state: Emphasized with border and icon treatment
- Compact icon + label layout with `gap-3`

**Bottom Nav (Student Mobile):**
- Fixed bottom with 4-5 core items
- Icon + label, `h-16`

### Cards & Containers
**Metric Cards (Dashboard):**
- Aspect ratio: Flexible height based on content
- Padding: `p-6`
- Structure: Large number/stat at top, label below, trend indicator (optional)
- Grid placement: 3-4 across on desktop

**Content Cards:**
- Padding: `p-6`
- Header with icon + title + action button
- Divider between header and content
- Footer for timestamps/metadata

**List Items (Attendance, Timetable):**
- Height: `min-h-20`
- Left: Icon or avatar (48px circle)
- Center: Title + subtitle stacked
- Right: Action buttons or status badge
- Gap: `gap-4` between items

### Forms & Inputs
**Form Layout:**
- Two-column on desktop (`grid grid-cols-2 gap-6`), single-column on mobile
- Full-width for text areas and rich editors
- Label above input: `mb-2 text-sm font-medium`
- Input height: `h-12` for comfortable touch targets
- Help text: `text-xs` below input with `mt-1`

**File Upload (E-books, Photos):**
- Drag-and-drop area: `min-h-32` with dashed border
- Preview thumbnails in grid below
- Progress bars for uploads

### Data Display
**Tables (Attendance, Marks, Student List):**
- Header: `h-12` with `font-medium`
- Row: `h-12` to `h-14`
- Pagination: Bottom-right, showing "1-20 of 234"
- Inline actions: Icon buttons on hover (Edit, Delete, View)
- Sortable columns with arrow indicators

**ID Card Generator:**
- Preview canvas: Fixed 3.5:2 ratio (standard ID card)
- Live preview updates as student fills form
- QR code: Bottom-right corner, 80px square
- Print button: Prominent, fixed at preview top-right

**E-book Viewer:**
- Full-screen mode option
- PDF viewer: Embedded with toolbar (zoom, page nav, download toggle)
- Sidebar: Table of contents (if available)
- Width: `max-w-4xl mx-auto` for comfortable reading

### Overlays & Modals
**Modal Dialogs:**
- Max width: `max-w-2xl` for forms, `max-w-4xl` for content
- Padding: `p-8`
- Header with title and close button
- Footer with action buttons aligned right

**Toast Notifications:**
- Position: Top-right, `fixed top-4 right-4`
- Auto-dismiss after 5 seconds
- Stack vertically with `gap-2`

**Bot Interface (Conversational Assistant):**
- Fixed bottom-right bubble trigger: `w-14 h-14` circle
- Expanded chat: `w-96 h-[600px]` panel sliding from bottom-right
- Message list with alternating alignment (user right, bot left)
- Input at bottom with `h-12`

### Status & Feedback
**Badges:**
- Height: `h-6`, padding: `px-3`
- Pill shape (fully rounded)
- Use cases: Active/Archived status, attendance percentage ranges, exam scores

**Progress Indicators:**
- Attendance percentage: Circular progress (80px diameter)
- File uploads: Linear bar with percentage
- Exam timer: Countdown with warning states

---

## Animations & Interactions

**Minimal Motion Philosophy:**
Use animations sparingly for academic professionalism.

**Allowed Animations:**
- Page transitions: Subtle fade (150ms)
- Card hover: Slight elevation increase (200ms ease)
- Dropdown menus: Slide down (200ms)
- Toast notifications: Slide in from right (300ms)
- Bot interface: Slide up from bottom (400ms ease-out)

**No Animations For:**
- Table row updates
- Form validation feedback (instant)
- Status changes (immediate visual update)

---

## Responsive Behavior

**Breakpoints:**
- Mobile: `< 768px` - Single column, bottom nav, compact cards
- Tablet: `768px - 1024px` - Two columns, sidebar toggleable
- Desktop: `> 1024px` - Full multi-column layout, fixed sidebar

**Mobile Adaptations:**
- Tables: Horizontal scroll with pinned first column OR card-based view for key tables
- Forms: Stack to single column
- Dashboard metrics: Single column with full-width cards
- Navigation: Bottom bar (Student), hamburger menu (Teacher)

---

## Images

**Required Images:**

1. **Dashboard Hero/Welcome Section (Students):**
   - Placement: Top of student dashboard
   - Description: Warm, professional image of college campus or study environment
   - Dimensions: Full-width, 400px height on desktop
   - Treatment: Subtle overlay for text readability
   - Content over image: "Welcome back, [Student Name]" + Quick stats

2. **Empty States:**
   - No attendance records: Simple illustration (400x300)
   - No e-books: Book stack illustration
   - No exams scheduled: Calendar illustration
   - Consistent illustration style throughout

3. **Student Profile/ID Photos:**
   - Square placeholder: 200x200 for profile, 120x120 for lists
   - Circular crop in most contexts

4. **Login/Auth Pages:**
   - Split-screen layout: Form (left 40%) + College campus image (right 60%)
   - Hero image showing students in professional setting

**No Hero Images For:**
- Teacher dashboard (data-first approach)
- Database management interface
- Forms and CRUD interfaces

---

## Role-Specific Design Distinctions

**Teacher Interface:**
- Dense information layouts with multiple columns
- Prominent action buttons (Create Student, Mark Attendance, Grade Exam)
- Advanced filters and bulk operations always visible
- Table-centric views with inline editing
- Database management dashboard with real-time metrics and backup status

**Student Interface:**
- Spacious card-based layouts
- Consumption-focused with limited actions (View, Download, Submit)
- Simplified navigation with 4-5 core sections
- Larger typography for comfort
- Friendly empty states and onboarding

---

## Accessibility & Quality

- All interactive elements: `min-h-12` for 48px touch target
- Focus states: Visible 2px outline on all focusable elements
- Contrast: Ensure WCAG AA minimum for all text
- Form labels: Always visible (never placeholder-only)
- Keyboard navigation: Full support for all CRUD operations
- Screen reader: Proper ARIA labels for data tables and dynamic content

---

This design system balances institutional professionalism with modern usability, ensuring both Teachers and Students have optimized experiences for their distinct workflows.