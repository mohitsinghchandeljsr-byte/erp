# Design Guidelines: Clean ERP Interface

## Design Approach

**Inspiration:** ERPNext-style clean, minimal ERP interface
**Philosophy:** Clarity and simplicity over visual decoration. Professional, institutional aesthetic with focus on usability and information accessibility.

**Core Principles:**
- **Clean and minimal** - Remove unnecessary visual noise
- **Professional neutrals** - Subtle colors, clean backgrounds
- **Information hierarchy** - Clear organization with sections and cards
- **Welcoming experience** - Onboarding guides and helpful shortcuts
- **Consistent spacing** - Predictable, comfortable layout

---

## Color Palette

### Neutral Foundation
- **Background**: Clean white `#FFFFFF`
- **Surface**: Very light gray `#F9FAFB` (for cards and panels)
- **Border**: Subtle gray `#E5E7EB`
- **Text Primary**: Dark gray `#111827`
- **Text Secondary**: Medium gray `#6B7280`
- **Text Tertiary**: Light gray `#9CA3AF`

### Accent Colors (Minimal Use)
- **Primary**: Soft blue `#3B82F6` (links, primary actions)
- **Success**: Green `#10B981` (positive status, confirmations)
- **Warning**: Amber `#F59E0B` (alerts, warnings)
- **Danger**: Red `#EF4444` (errors, destructive actions)

### Interactive States
- **Hover**: Light background `#F3F4F6`
- **Active/Selected**: Subtle blue background `#EFF6FF` with blue border
- **Focus**: 2px blue ring `#3B82F6`

---

## Typography

**Font Stack:**
- Primary: `Inter` - Clean, readable sans-serif
- Monospace: `JetBrains Mono` - For codes and IDs

**Type Scale (Regular Case - No Uppercase):**
- Page Title: `text-2xl` (24px), `font-semibold`
- Section Header: `text-lg` (18px), `font-medium`
- Card Title: `text-base` (16px), `font-medium`
- Body Text: `text-sm` (14px), `font-normal`
- Labels: `text-sm` (14px), `font-medium`
- Captions: `text-xs` (12px), `font-normal`

**Text Colors:**
- Primary text: Default foreground
- Secondary text: Muted foreground (60% opacity)
- Tertiary text: Muted foreground (40% opacity)

---

## Layout System

**Spacing:**
- Extra small: `2` (8px)
- Small: `3` (12px)
- Medium: `4` (16px)
- Large: `6` (24px)
- Extra large: `8` (32px)

**Container Width:**
- Max width: `max-w-7xl` for main content
- Centered: `mx-auto px-6`

**Grid System:**
- Metric cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`
- Content cards: `grid grid-cols-1 lg:grid-cols-2 gap-6`
- Full-width: Tables and lists

---

## Component Library

### Navigation

**Sidebar:**
- Width: `280px` (fixed), collapsible to `64px` (icons only)
- Background: Default background (white/dark)
- **Collapsible Sections**: Group navigation items under collapsible headers
- **Section Labels**: Small, uppercase, muted text
- **Menu Items**: Regular text (not uppercase), icon + label, clean hover state
- **Active State**: Subtle background color, no bold styling
- **Icon Size**: `h-4 w-4` for consistency

**Top Header:**
- Height: `64px`
- Structure: Logo/Menu (left) | Search bar (center) | Notifications + Help + User (right)
- Background: White with subtle bottom border
- Sticky: Yes, with shadow on scroll

**Search Bar:**
- Width: `400px` on desktop
- Placeholder: "Search or type a command (Ctrl + @)"
- Icon: Search icon on left
- Rounded corners, subtle border

### Cards

**Welcome/Onboarding Card:**
- Background: White with subtle border
- Padding: `p-6`
- Dismissible with X button top-right
- Contains: Title, description, checklist items, dismiss action

**Metric Cards (Simple Style):**
- Background: White
- Border: Subtle `border border-border`
- Padding: `p-6`
- Layout: Icon (left) + Value + Label (stacked)
- **No gradients** - Clean, minimal design
- Hover: Subtle elevation with `hover-elevate`

**Content Cards:**
- Border: `border border-border`
- Shadow: Very subtle `shadow-sm`
- Padding: `p-6`
- Rounded: `rounded-lg`

**Shortcut Cards:**
- Simple boxes with icon + text
- Click to navigate
- Grid layout: 4-5 per row on desktop
- Minimal styling, clean borders

### Forms & Inputs

**Input Fields:**
- Height: `h-10`
- Border: `border border-input`
- Rounded: `rounded-md`
- Focus: Blue ring
- Background: White

**Buttons:**
- Primary: Blue background, white text
- Secondary: White background, border, gray text
- Ghost: No background, hover shows background
- Sizes: `default` (h-10), `sm` (h-9), `lg` (h-11)

**Labels:**
- Position: Above input with small margin
- Font: `text-sm font-medium`
- Color: Primary text

### Data Display

**Tables:**
- Background: White
- Border: All around table
- Header: Light gray background `bg-muted/50`
- Rows: Alternating hover state
- Cell padding: `p-3`
- Font size: `text-sm`

**Lists:**
- Clean separator lines between items
- Hover: Light background
- Padding: `p-3 md:p-4`
- Icon + Text layout

**Badges:**
- Rounded: `rounded-full`
- Padding: `px-3 py-1`
- Font: `text-xs font-medium`
- Variants: Default, Success, Warning, Destructive

### Sections

**Reports & Masters Section:**
- Grid of category cards
- Each card has title and icon
- Click to view related items
- Clean, organized layout

**Shortcuts Section:**
- Quick access links to common actions
- Grid layout with icons
- Minimal design

---

## Page Layouts

### Dashboard (Both Roles)

**Structure:**
1. Welcome card (dismissible) at top
2. Metric cards in grid (4 columns)
3. Shortcuts section with quick links
4. Reports & Masters section
5. Recent activity/data tables

**Welcome Card Contains:**
- Greeting message
- Onboarding checklist (if new user)
- Quick start guide
- Dismiss button

### Navigation Pages (Students, Attendance, etc.)

**Structure:**
1. Page header with title and breadcrumb
2. Filter/search toolbar
3. Main content (table or cards)
4. Pagination at bottom

---

## Interactions

**Hover States:**
- Cards: Very subtle elevation
- Buttons: Slight darkening of background
- List items: Light gray background
- Links: Underline appears

**Active States:**
- Selected sidebar item: Light blue background
- Active tab: Blue underline + darker text
- Pressed button: Slightly darker

**Animations:**
- Keep minimal and fast (150-200ms)
- Fade in for toasts
- Slide down for dropdowns
- No unnecessary motion

---

## Dark Mode

**Support:** Yes, with proper color tokens
- Background inverts to dark gray
- Borders remain subtle
- Text adjusts for contrast
- Cards have darker background than page

---

## Accessibility

- **Contrast**: WCAG AA minimum for all text
- **Focus**: Visible focus ring on all interactive elements
- **Touch Targets**: Minimum 44x44px
- **Keyboard**: Full keyboard navigation support
- **ARIA**: Proper labels for dynamic content

---

## Mobile Responsive

**Breakpoints:**
- Mobile: `< 768px` - Stack cards, hide sidebar, show mobile menu
- Tablet: `768px - 1024px` - 2 columns, toggleable sidebar
- Desktop: `> 1024px` - Full layout

**Mobile Adaptations:**
- Bottom navigation for students
- Hamburger menu for teachers
- Cards stack to single column
- Tables scroll horizontally or convert to cards

---

## Visual Examples

### Sidebar Menu Item
```
[Icon] Dashboard
[Icon] Students
[Icon] Attendance
```

### Metric Card
```
┌─────────────────┐
│ [Icon]  Total   │
│         Students│
│         42      │
└─────────────────┘
```

### Welcome Card
```
┌──────────────────────────────────────┐
│ Let's begin your journey with ERP  [X]│
│                                       │
│ ○ Create your first student          │
│ ○ Mark attendance                     │
│ ○ Set up timetable                    │
│                                       │
│ [Show More] [Dismiss]                 │
└──────────────────────────────────────┘
```

---

This design system prioritizes clarity, simplicity, and professional aesthetics suitable for an educational ERP system.
