# 🎓 CompTIA Security+ SY0-701 Flashcard App — Design Document

**Version:** 1.0  
**Last Updated:** 2026-02-03  
**Purpose:** Complete technical specification for building a Security+ study application using Next.js, TypeScript, and Tailwind CSS

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Patterns](#architecture--patterns)
4. [Data Models](#data-models)
5. [Feature Specifications](#feature-specifications)
6. [UI/UX Design](#uiux-design)
7. [User Interactions](#user-interactions)
8. [Testing Strategy](#testing-strategy)
9. [File Structure](#file-structure)
10. [Development Workflow](#development-workflow)
11. [AI Prompt Templates](#ai-prompt-templates)

---

## 🎯 Project Overview

### Purpose
A mobile-first progressive web application for studying CompTIA Security+ SY0-701 certification, focusing on flashcard-based learning with domain-specific progress tracking.

### Core Philosophy
- **Mobile-first:** Touch, swipe, and tap interactions feel natural
- **Progressive disclosure:** Information revealed in layers (acronym → definition → context → reference)
- **Single-user focused:** All data stored in browser localStorage
- **Accessibility-first:** ARIA compliant, keyboard navigation, screen reader support

### Learning Phases
1. **Phase 1 (MVP):** Flashcards for acronyms across all 5 domains
2. **Phase 2 (Future):** Multiple-choice quizzes (A/B/C/D format)
3. **Phase 3 (Future):** Mixed domain shuffling, advanced spaced repetition

### Domain Priority Order
Study order based on exam weight:
1. **Domain 4:** Security Operations (28%)
2. **Domain 5:** Security Program Management (20%)
3. **Domain 2:** Threats, Vulnerabilities, and Mitigations (22%)
4. **Domain 3:** Security Architecture (18%)
5. **Domain 1:** General Security Concepts (12%)

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript 5+**

### Styling & UI
- **Tailwind CSS** (utility-first CSS)
- **CSS Modules** (component-scoped styles when needed)
- **Framer Motion** (animations and gestures)

### Data & Validation
- **Zod** (schema validation)
- **Axios** (HTTP client for future API integration)

### Testing
- **Jest** (test runner)
- **React Testing Library** (component testing)
- **@testing-library/jest-dom** (custom matchers)

### Storage
- **localStorage** (browser-based persistence)
- **JSON files** (initial static data source)

### Development Tools
- **ESLint** (linting)
- **Prettier** (code formatting)
- **Husky** (git hooks)

---

## 🏗️ Architecture & Patterns

### Design Patterns

#### Service Layer Pattern
All data access abstracted through service interfaces to allow easy swapping between:
- Static JSON files (Phase 1)
- API routes (Future)
- AI-generated content (Future)

```typescript
interface IFlashcardService {
  getAll(): Promise<Flashcard[]>
  getByDomain(domainId: number): Promise<Flashcard[]>
  getById(id: string): Promise<Flashcard | null>
}
```

#### Repository Pattern
Progress tracking and user preferences managed through localStorage repository:

```typescript
interface IProgressRepository {
  saveProgress(cardId: string, progress: UserProgress): void
  getProgress(cardId: string): UserProgress | null
  clearAllProgress(): void
}
```

#### Component Composition
- **Atoms:** Button, Icon, Card
- **Molecules:** FlashcardFace, ProgressIndicator, DomainTile
- **Organisms:** FlashcardViewer, DomainSelector, Navigation
- **Templates:** DashboardLayout, StudyLayout
- **Pages:** Dashboard, Study, Reference, Profile

### Folder Structure Philosophy
- **Feature-based** organization (not type-based)
- **Colocation** of related files (component + test + styles)
- **Separation of concerns** (data, logic, presentation)

---

## 📊 Data Models

### Flashcard Schema

```typescript
import { z } from 'zod'

const FlashcardSchema = z.object({
  id: z.string().uuid(),
  domain: z.number().min(1).max(5),
  section: z.string(), // e.g., "Incident Response", "SIEM Tools"
  type: z.enum(['acronym', 'concept', 'scenario']),
  front: z.string(), // The acronym or question
  back: z.object({
    level1: z.string(), // Full name/term
    level2: z.string(), // Definition
    level3: z.string(), // Exam context/tips
  }),
  metadata: z.object({
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    commonlyTested: z.boolean().default(false),
    relatedTerms: z.array(z.string()).optional(),
  }).optional(),
})

type Flashcard = z.infer<typeof FlashcardSchema>
```

### User Progress Schema

```typescript
const UserProgressSchema = z.object({
  cardId: z.string().uuid(),
  timesCorrect: z.number().default(0),
  timesMissed: z.number().default(0),
  lastSeen: z.date().nullable().default(null),
  mastered: z.boolean().default(false), // true when timesCorrect >= 3
  needsReview: z.boolean().default(false), // user can manually flag
})

type UserProgress = z.infer<typeof UserProgressSchema>
```

### User Preferences Schema

```typescript
const UserPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark']).default('dark'),
  uiSize: z.enum(['cozy', 'normal', 'large']).default('normal'),
  lastStudiedDomain: z.number().min(1).max(5).nullable().default(null),
})

type UserPreferences = z.infer<typeof UserPreferencesSchema>
```

### Domain Metadata

```typescript
const DomainSchema = z.object({
  id: z.number().min(1).max(5),
  name: z.string(),
  examPercentage: z.number(),
  description: z.string(),
  sections: z.array(z.string()),
})

const domains: Domain[] = [
  {
    id: 1,
    name: 'General Security Concepts',
    examPercentage: 12,
    description: 'Security controls, CIA Triad, cryptography fundamentals',
    sections: ['Security Controls', 'Change Management', 'Cryptography'],
  },
  {
    id: 2,
    name: 'Threats, Vulnerabilities, and Mitigations',
    examPercentage: 22,
    description: 'Threat actors, attack vectors, vulnerability management',
    sections: ['Threat Actors', 'Attack Techniques', 'Vulnerability Assessment'],
  },
  {
    id: 3,
    name: 'Security Architecture',
    examPercentage: 18,
    description: 'Enterprise architecture, cloud security, network design',
    sections: ['Enterprise Architecture', 'Cloud Security', 'Identity Management'],
  },
  {
    id: 4,
    name: 'Security Operations',
    examPercentage: 28,
    description: 'Monitoring, incident response, forensics, SOAR',
    sections: ['Security Monitoring', 'Incident Response', 'Digital Forensics'],
  },
  {
    id: 5,
    name: 'Security Program Management and Oversight',
    examPercentage: 20,
    description: 'GRC, policies, third-party risk, audits',
    sections: ['Governance', 'Risk Management', 'Compliance'],
  },
]
```

---

## ✨ Feature Specifications

### 1. Dashboard (Landing Page)

**Route:** `/`

**Purpose:** Main entry point showing study options and progress overview

**Components:**
- Welcome header with user greeting
- Study mode tiles:
  - **Flash Cards** (primary CTA)
  - **Quizzes** (disabled/grayed out for Phase 2)
  - **Reference Library** (link to knowledge base)
- Quick stats:
  - Total cards studied
  - Overall mastery percentage
  - Current streak (future)

**Interactions:**
- Click "Flash Cards" → Navigate to domain selection
- Click "Reference Library" → Navigate to `/reference`
- Click profile icon (top right) → Navigate to `/profile`

---

### 2. Domain Selection Screen

**Route:** `/study`

**Purpose:** Choose which domain(s) to study

**Layout:**
- Grid of 5 domain tiles (sorted by exam weight percentage)
- Each tile shows:
  - Domain number and name
  - Exam percentage badge
  - Progress bar (cards seen / total cards)
  - Mastery icons count (⭐ and ⚠️)

**Default Selection:**
- "Study All" button in bottom right (selected by default)
- Pressing Enter triggers study session

**Interactions:**
- Click domain tile → Study only that domain
- Click "Study All" → Study all domains in priority order
- ESC key → Return to dashboard

---

### 3. Flashcard Study Session

**Route:** `/study/[domainId]` or `/study/all`

**Layout:**

#### Desktop
- Side navigation (collapsible):
  - Domain list with progress
  - Session stats
  - Exit button
- Main content area:
  - Large centered flashcard
  - Previous/Next buttons
  - Progress indicator (e.g., "12 / 50")
  - Mastery status icons for current card

#### Mobile
- Top navigation (hamburger menu):
  - Same content as desktop side nav
- Full-screen flashcard
- Bottom toolbar:
  - Previous/Next buttons
  - Progress counter

**Card States:**

1. **Initial (Front Face):**
   - Shows acronym only (e.g., "IPsec")
   - Large, centered text
   - Domain badge in corner

2. **First Flip (Back Face - Level 1):**
   - Shows full term (e.g., "Internet Protocol Security")
   - "Show More" button appears at bottom

3. **Second Tap (Back Face - Level 2):**
   - Shows definition below full term
   - "Show More" button still visible

4. **Third Tap (Back Face - Level 3):**
   - Shows exam context/tips
   - "View in Reference" button appears
   - Clicking navigates to `/reference#[cardId]`

**Progress Tracking:**
- After viewing a card (any level), it's marked as "seen"
- User can mark card for review via:
  - Long press (mobile)
  - Flag button (desktop)

**Keyboard Navigation (Desktop):**
- `Space` → Flip card / advance to next level
- `←` → Previous card
- `→` → Next card
- `R` → Toggle "needs review" flag
- `ESC` → Exit study session

**Touch Gestures (Mobile):**
- **Tap card** → Flip / advance level
- **Swipe right** → Next card
- **Swipe left** → Previous card
- **Long press** → Toggle "needs review" flag

---

### 4. Reference Library (Knowledge Base)

**Route:** `/reference`

**Purpose:** Browse all flashcard content in a structured, readable format

**Layout:**

```
Domain 1: General Security Concepts (12%)
├── Security Controls
│   ├── IPsec - Internet Protocol Security
│   ├── AES - Advanced Encryption Standard
│   └── ...
├── Change Management
│   └── ...
└── Cryptography
    └── ...

Domain 2: Threats, Vulnerabilities, and Mitigations (22%)
├── Threat Actors
├── Attack Techniques
└── Vulnerability Assessment

... (continues for all domains)
```

**Features:**
- Collapsible sections (accordion-style)
- Search bar at top (filters by term/acronym)
- Click any term → expands to show all 3 levels of info
- Anchor links (e.g., `#ipsec`) for direct navigation

**Interactions:**
- Clicking a term shows full definition inline (no navigation)
- "Study This Domain" button at each domain header
- Export button (future: download as PDF/Markdown)

---

### 5. Profile / Settings

**Route:** `/profile`

**Sections:**

#### User Data Management
- **Delete All Progress** button
  - Shows confirmation modal:
    - "This will permanently delete all your progress and cannot be undone."
    - "Cancel" / "Delete Everything" buttons
  - Clears all localStorage data
  - Redirects to dashboard with fresh state

#### Appearance
- **Theme Toggle:** Light / Dark mode
- **UI Size:** Cozy / Normal / Large
  - Adjusts font sizes and spacing globally

#### Stats (Read-only)
- Total cards studied
- Cards mastered (⭐ count)
- Cards needing review (⚠️ count)
- Study streak (future)

---

## 🎨 UI/UX Design

### Design System

#### Color Palette (Inspired by Claude.ai)

**Dark Mode (Default):**
```css
--bg-primary: #1a1a1a
--bg-secondary: #2a2a2a
--bg-tertiary: #3a3a3a
--text-primary: #e0e0e0
--text-secondary: #a0a0a0
--accent: #f97316 (orange for CTAs)
--success: #22c55e (mastered status)
--warning: #eab308 (needs review)
--border: #404040
```

**Light Mode:**
```css
--bg-primary: #ffffff
--bg-secondary: #f5f5f5
--bg-tertiary: #e5e5e5
--text-primary: #1a1a1a
--text-secondary: #525252
--accent: #f97316
--success: #16a34a
--warning: #ca8a04
--border: #d4d4d4
```

#### Typography

**Font Sizes (Normal UI Size):**
- Heading 1: `2rem` (32px)
- Heading 2: `1.5rem` (24px)
- Body: `1rem` (16px)
- Small: `0.875rem` (14px)

**Flashcard Text Sizes:**
- Front (acronym): `3rem` (48px) on desktop, `2.5rem` (40px) on mobile
- Back Level 1: `2rem` (32px)
- Back Level 2/3: `1.125rem` (18px)

**UI Size Multipliers:**
- Cozy: `0.875x`
- Normal: `1x`
- Large: `1.25x`

#### Spacing
Use Tailwind's spacing scale:
- `xs`: `0.25rem` (4px)
- `sm`: `0.5rem` (8px)
- `md`: `1rem` (16px)
- `lg`: `1.5rem` (24px)
- `xl`: `2rem` (32px)

#### Component Styling

**Cards (Flashcard):**
- Border radius: `1rem` (16px)
- Shadow: `0 4px 6px rgba(0,0,0,0.1)`
- Padding: `2rem` (32px)
- Min height: `400px` (desktop), `300px` (mobile)
- Transition: `transform 0.3s ease-in-out` (flip animation)

**Buttons:**
- Primary: Orange background, white text, rounded-lg
- Secondary: Transparent background, border, rounded-lg
- Icon buttons: Circular, hover scale effect

**Navigation:**
- Desktop side nav: `240px` width, fixed position
- Mobile top nav: Full width, sticky position
- Collapse animation: `0.2s ease-in-out`

---

### Responsive Breakpoints

```css
/* Mobile-first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
```

**Layout Adjustments:**
- **< 768px:** Mobile layout (top nav, full-screen cards, swipe gestures)
- **≥ 768px:** Desktop layout (side nav, centered cards, keyboard shortcuts)

---

## 🖱️ User Interactions

### Flashcard Flip Animation

**Implementation:** CSS 3D transforms + Framer Motion

```typescript
// Pseudo-code
const variants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 },
}

<motion.div
  animate={isFlipped ? 'back' : 'front'}
  variants={variants}
  transition={{ duration: 0.3 }}
>
  {/* Card content */}
</motion.div>
```

**Progressive Disclosure Flow:**
1. User clicks card → Flip to back (level 1)
2. User clicks "Show More" → Expand to level 2 (no flip, just reveal)
3. User clicks "Show More" again → Expand to level 3
4. User clicks "View in Reference" → Navigate to reference page

**Visual Feedback:**
- Hover state: Slight scale up (`1.02`)
- Active state: Slight scale down (`0.98`)
- Flip: 3D rotation with backface visibility hidden

---

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Flip card / Show more |
| `→` | Next card |
| `←` | Previous card |
| `R` | Toggle "needs review" flag |
| `ESC` | Exit study session / Close modal |
| `Enter` | Confirm action / Start studying |
| `?` | Show keyboard shortcuts modal |

**Implementation:**
- Global keyboard listener in study layout
- Visual hint on first visit (tooltip showing `Space` to flip)

---

### Touch Gestures (Mobile)

**Swipe Detection:**
- Use Framer Motion's `drag` and `dragEnd` events
- Threshold: `50px` horizontal movement
- Velocity threshold: `500px/s` for quick swipes

**Gestures:**
- **Swipe right:** Previous card (with visual feedback)
- **Swipe left:** Next card (with visual feedback)
- **Tap:** Flip card / Show more
- **Long press (500ms):** Toggle "needs review" flag

**Visual Feedback:**
- Card follows finger during swipe
- Release triggers smooth animation to next/prev card
- Bounce back if swipe threshold not met

---

## 🧪 Testing Strategy

### Unit Tests (Required for All Components)

**Coverage Requirements:**
- All components must have at least one test file
- Minimum 80% code coverage

**Test Cases per Component:**
```typescript
// Example: FlashcardFace.test.tsx
describe('FlashcardFace', () => {
  it('renders front face with acronym', () => {})
  it('flips to back face on click', () => {})
  it('shows level 1 content after first flip', () => {})
  it('reveals level 2 on "Show More" click', () => {})
  it('reveals level 3 on second "Show More" click', () => {})
  it('shows "View in Reference" button on level 3', () => {})
})
```

**Naming Convention:**
- `ComponentName.test.tsx` (colocated with component)

---

### Integration Tests (High Priority Flows)

**Phase 1 Critical Paths:**
1. **Study Session Flow:**
   - Select domain → View flashcard → Flip card → Navigate next/prev → Exit session
2. **Progress Tracking:**
   - Study cards → Mark as mastered → Verify localStorage update
3. **Navigation Flow:**
   - Dashboard → Domain selection → Study → Reference → Profile → Dashboard

**Test Files:**
- `__tests__/integration/study-session.test.tsx`
- `__tests__/integration/progress-tracking.test.tsx`

---

### Accessibility Tests (Lower Priority, Phase 2)

**Tools:**
- `jest-axe` (automated a11y testing)
- Manual testing with screen readers (NVDA, VoiceOver)

**Focus Areas:**
- ARIA labels on interactive elements
- Keyboard navigation completeness
- Focus management (modals, navigation)
- Color contrast ratios (WCAG AA compliance)

---

### Test Commands

```json
// package.json scripts
{
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:integration": "jest --testPathPattern=integration"
}
```

---

## 📁 File Structure

```
security-plus-app/
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── .eslintrc.json
├── .prettierrc
│
├── public/
│   └── data/
│       ├── flashcards_domain4_example.json
│       ├── flashcards_domain5_example.json
│       └── domains.json
│
├── src/
│   ├── app/
│   │   ├── layout.tsx (root layout with theme provider)
│   │   ├── page.tsx (dashboard)
│   │   ├── study/
│   │   │   ├── page.tsx (domain selection)
│   │   │   ├── [domainId]/
│   │   │   │   └── page.tsx (study session)
│   │   │   └── all/
│   │   │       └── page.tsx (study all domains)
│   │   ├── reference/
│   │   │   └── page.tsx (knowledge base)
│   │   └── profile/
│   │       └── page.tsx (settings)
│   │
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── Button.module.css (if needed)
│   │   │   ├── Icon/
│   │   │   └── Badge/
│   │   │
│   │   ├── molecules/
│   │   │   ├── FlashcardFace/
│   │   │   │   ├── FlashcardFace.tsx
│   │   │   │   └── FlashcardFace.test.tsx
│   │   │   ├── DomainTile/
│   │   │   ├── ProgressBar/
│   │   │   └── MasteryIndicator/
│   │   │
│   │   ├── organisms/
│   │   │   ├── FlashcardViewer/
│   │   │   │   ├── FlashcardViewer.tsx
│   │   │   │   └── FlashcardViewer.test.tsx
│   │   │   ├── DomainSelector/
│   │   │   ├── Navigation/
│   │   │   │   ├── SideNav.tsx
│   │   │   │   └── TopNav.tsx
│   │   │   └── ReferenceTree/
│   │   │
│   │   └── templates/
│   │       ├── DashboardLayout.tsx
│   │       └── StudyLayout.tsx
│   │
│   ├── lib/
│   │   ├── services/
│   │   │   ├── FlashcardService.ts (interface + implementation)
│   │   │   └── FlashcardService.test.ts
│   │   ├── repositories/
│   │   │   ├── ProgressRepository.ts
│   │   │   └── PreferencesRepository.ts
│   │   ├── hooks/
│   │   │   ├── useFlashcards.ts
│   │   │   ├── useProgress.ts
│   │   │   └── useKeyboard.ts
│   │   └── utils/
│   │       ├── localStorage.ts
│   │       └── analytics.ts (future)
│   │
│   ├── types/
│   │   ├── flashcard.ts (Zod schemas + types)
│   │   ├── progress.ts
│   │   └── domain.ts
│   │
│   ├── styles/
│   │   └── globals.css (Tailwind imports + custom CSS)
│   │
│   └── __tests__/
│       ├── integration/
│       │   ├── study-session.test.tsx
│       │   └── progress-tracking.test.tsx
│       └── setup.ts (Jest configuration)
│
└── docs/
    ├── DESIGN.md (this document)
    ├── API.md (future: API documentation)
    └── CONTRIBUTING.md (future)
```

---

## 🚀 Development Workflow

### Phase 1: Foundation (Week 1)

**Goal:** Core flashcard functionality with Domain 4 & 5 data

**Tasks:**
1. ✅ Initialize Next.js project with TypeScript + Tailwind
2. ✅ Set up testing infrastructure (Jest + RTL)
3. ✅ Create data models (Zod schemas)
4. ✅ Build service layer with example JSON data
5. ✅ Implement localStorage repositories
6. ✅ Create basic component library (atoms)
7. ✅ Build dashboard layout + routing
8. ✅ Implement flashcard viewer with flip animation
9. ✅ Add keyboard + touch gesture support
10. ✅ Write unit tests for core components

---

### Phase 2: Progress Tracking (Week 2)

**Goal:** Mastery status, progress indicators, domain selection

**Tasks:**
1. ✅ Implement progress tracking logic
2. ✅ Build domain selection screen
3. ✅ Add mastery indicators (⭐ / ⚠️)
4. ✅ Create progress bars and counters
5. ✅ Add "needs review" flag functionality
6. ✅ Write integration tests for study flow
7. ✅ Implement profile page with settings
8. ✅ Add theme toggle (light/dark mode)
9. ✅ Add UI size settings (cozy/normal/large)

---

### Phase 3: Reference Library (Week 3)

**Goal:** Knowledge base browser with search

**Tasks:**
1. ✅ Build reference page layout (accordion tree)
2. ✅ Implement search/filter functionality
3. ✅ Add anchor links for direct navigation
4. ✅ Connect flashcard "View in Reference" button
5. ✅ Add export functionality (future: PDF/Markdown)
6. ✅ Polish responsive design
7. ✅ Write accessibility tests

---

### Phase 4: Data Expansion (Ongoing)

**Goal:** Populate all 5 domains with comprehensive content

**Tasks:**
1. ✅ Use AI prompts to generate flashcard JSON
2. ✅ Validate data against Zod schemas
3. ✅ Organize by domain + section
4. ✅ Add metadata (difficulty, commonly tested)
5. ✅ Review and refine content for accuracy

---

### Future Enhancements (Phase 5+)

- Multiple-choice quizzes
- Mixed domain study mode
- Spaced repetition algorithm
- Study streak tracking
- Export progress reports
- PWA support (offline mode)
- API integration for dynamic content

---

## 📝 AI Prompt Templates

### Prompt 1: Generate Flashcard JSON

```markdown
Generate 30 flashcards for CompTIA Security+ SY0-701 Domain 4 (Security Operations) in the following JSON format:

{
  "id": "[UUID]",
  "domain": 4,
  "section": "[Section name, e.g., 'Incident Response']",
  "type": "acronym",
  "front": "[Acronym only, e.g., 'SIEM']",
  "back": {
    "level1": "[Full term, e.g., 'Security Information and Event Management']",
    "level2": "[Definition in 1-2 sentences]",
    "level3": "[Exam context: why it matters, common test scenarios, related concepts]"
  },
  "metadata": {
    "difficulty": "medium",
    "commonlyTested": true,
    "relatedTerms": ["SOAR", "IDS", "IPS"]
  }
}

Focus on high-yield acronyms and concepts that appear frequently on the exam. Include:
- SIEM tools and use cases
- Incident response phases (NIST framework)
- Digital forensics procedures
- Security monitoring concepts
- SOAR automation

Ensure level3 includes practical exam tips and real-world application examples.
```

---

### Prompt 2: Validate Flashcard Content

```markdown
Review the following flashcard JSON for accuracy and completeness against the SY0-701 exam objectives:

[Paste JSON here]

Check for:
1. Technical accuracy (definitions, acronym expansions)
2. Exam relevance (is this actually tested?)
3. Clarity (can a beginner understand level2?)
4. Exam tips quality (does level3 provide actionable study advice?)
5. Related terms accuracy (are they truly related?)

Provide corrections or enhancements for any issues found.
```

---

### Prompt 3: Generate Domain Sections

```markdown
For CompTIA Security+ SY0-701 Domain [X], list all major sections and subsections that should be covered.

Format as a hierarchical outline:

Domain [X]: [Name]
├── Section A: [Name]
│   ├── Subsection A.1: [Topic]
│   └── Subsection A.2: [Topic]
├── Section B: [Name]
└── Section C: [Name]

This will be used to organize flashcards in the reference library. Be comprehensive but focus on exam-relevant topics.
```

---

## 📖 README.md Structure

```markdown
# 🎓 CompTIA Security+ SY0-701 Flashcard App

A mobile-first progressive web app for studying the CompTIA Security+ certification exam.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone [repo-url]
cd security-plus-app
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 🎯 Purpose

This app helps you master the Security+ SY0-701 exam through:
- **Flashcards:** Acronyms, concepts, and scenarios across all 5 domains
- **Progress Tracking:** Know which topics you've mastered
- **Reference Library:** Searchable knowledge base
- **Mobile-Friendly:** Study anywhere, anytime

## 🏗️ Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Zod (validation)
- Jest + React Testing Library

## 📂 Project Structure

See [DESIGN.md](./docs/DESIGN.md) for complete technical documentation.

## 🧪 Testing

All components have unit tests. Run `npm test` to validate.

## 🤝 Contributing

This is a personal study tool, but feedback is welcome! Open an issue if you find bugs or have suggestions.

## 📄 License

MIT
```

---

## ✅ Definition of Done

A feature is considered complete when:

1. ✅ **Functionality:** Works as specified in this document
2. ✅ **Responsive:** Functions correctly on mobile + desktop
3. ✅ **Tested:** Has unit tests with passing coverage
4. ✅ **Accessible:** Keyboard navigable, ARIA compliant
5. ✅ **Documented:** Code comments + README updates (if needed)
6. ✅ **Linted:** Passes ESLint + Prettier checks

---

## 🎯 Success Metrics

### MVP Success Criteria:
- ✅ User can study all
5 domains via flashcards
- ✅ Progress persists in localStorage
- ✅ Mastery status (⭐) appears after 3 correct views
- ✅ App works smoothly on mobile (iOS Safari, Android Chrome)
- ✅ Keyboard navigation fully functional
- ✅ Reference library allows browsing all content

### Future Goals:
- 500+ flashcards across all domains
- Multiple-choice quiz mode with 200+ questions
- Spaced repetition algorithm implementation
- 90%+ test coverage
- PWA installability

---

## 📞 Support & Feedback

For questions or issues during development, refer to:
- This design document
- Component test files (examples of usage)
- Next.js documentation
- Tailwind CSS documentation

---

---

## 🔧 Recent Updates & Fixes

### February 3, 2026 - Theme & Layout Improvements

**Issue #1: Theme and UI Size Settings Not Working**
- **Problem**: Theme toggle (light/dark) and text size settings in the profile page were not being applied to the application
- **Root Cause**: The root layout was a server component without access to localStorage preferences, and no mechanism existed to apply the theme/UI size classes to the DOM
- **Solution**:
  - Created `PreferencesProvider` component (`src/components/providers/PreferencesProvider.tsx`)
  - Provider reads preferences directly from `PreferencesRepository` on mount
  - Automatically applies `data-theme` attribute to `<html>` element
  - Automatically applies UI size class (`ui-cozy`, `ui-normal`, `ui-large`) to `<body>` element
  - Added custom event listener for same-tab preference updates
  - Modified `PreferencesRepository` to dispatch `preferences-updated` event when preferences change
  - Integrated provider into root layout to wrap all pages
- **Result**: Theme and text size settings now work correctly and update instantly across the entire application

**Issue #2: Page Centering Issues**
- **Problem**: Profile and reference pages appeared off-center with more space on the right side
- **Root Cause**: Pages were not using the same flexbox centering approach as the dashboard page
- **Solution**:
  - Adopted dashboard's centering pattern: `flex items-center justify-center` on parent container
  - Profile page: Added `flex items-center justify-center` to outer div
  - Reference page: Added `flex items-start justify-center` to outer div (items-start for scrollable content)
  - Both pages use `w-full max-w-5xl mx-auto px-6 py-16` for consistent width and spacing
- **Files Updated**:
  - `src/app/profile/page.tsx` - Updated to use flexbox centering pattern
  - `src/app/reference/page.tsx` - Updated to use flexbox centering pattern
- **Result**: Both pages now properly centered with equal spacing on left and right sides, matching dashboard layout

**Technical Implementation Details**:
- PreferencesProvider uses React's `useEffect` to apply preferences on component mount
- Theme changes trigger `document.documentElement.setAttribute('data-theme', theme)`
- UI size changes update body classList: `document.body.classList.add('ui-${size}')`
- Custom event system ensures instant updates when preferences change in the same browser tab
- CSS custom properties in `globals.css` respond to `[data-theme='dark']` selector
- Tailwind CSS 4 configured with custom `@variant dark` to use `[data-theme="dark"]` selector
- Flexbox centering (`flex items-center justify-center`) provides true horizontal centering
- `w-full` ensures content spans full width of parent while `max-w-5xl` constrains maximum width

**Additional Fix - Tailwind Dark Mode Configuration**:
- Added `@variant dark ([data-theme="dark"] &);` to globals.css
- This configures Tailwind's `dark:` variant to use the data-theme attribute instead of media queries
- Enables all `dark:` classes throughout the app to respond to theme changes

---

**End of Design Document**

*Version 1.1 | Last Updated: 2026-02-03*
