# Guide for Claude - Security+ Study App

## Project Overview

This is a **CompTIA Security+ flashcard study application** built with Next.js 14, TypeScript, and Tailwind CSS. The MVP is complete and functional with 60 flashcards across Domains 4 and 5.

## Current Status (MVP Complete)

✅ **Implemented**:
- Full flashcard system with progressive 3-level disclosure
- Study sessions with keyboard shortcuts and animations
- Progress tracking (mastery, review flags) via localStorage
- Domain selection (Domains 4 & 5 available)
- Reference library with search and filtering
- Profile/settings page (theme, UI size, statistics)
- Responsive design (mobile and desktop)
- Dark mode support

🔜 **Not Yet Implemented**:
- Flashcards for Domains 1-3 (JSON files don't exist)
- Unit tests (Jest configured but no test files written)
- Quiz mode (mentioned in plan but not built)
- Touch gestures for mobile (swipe to navigate)

## Key Architecture Decisions

### Data Layer
- **JSON files** in `public/data/` for flashcard content
- **localStorage** for user progress and preferences
- **Repository pattern** for localStorage access (ProgressRepository, PreferencesRepository)
- **Service layer** for data access (FlashcardService, DomainService)
- **Zod schemas** for runtime validation

### Component Structure
- **Atoms**: Button, Badge, Icon (basic UI elements)
- **Molecules**: FlashcardFace (the card display with progressive disclosure)
- **Organisms**: FlashcardViewer (full study session with navigation)
- **Pages**: Dashboard, Study Selection, Study Session, Reference, Profile

### State Management
- **Custom hooks**: useFlashcards, useProgress, useKeyboard, usePreferences
- **No external state library** (React hooks + localStorage only)
- **Client-side only** (no server components for interactive features)

## Critical Files

**Must understand these to work on the app**:

1. **Types** (`src/types/`):
   - `flashcard.ts` - Flashcard schema with 3-level back content
   - `progress.ts` - UserProgress tracking
   - `domain.ts` - Domain metadata
   - `preferences.ts` - User settings

2. **Data Access**:
   - `lib/services/FlashcardService.ts` - Loads JSON, caches in memory
   - `lib/repositories/ProgressRepository.ts` - localStorage CRUD for progress

3. **Core Components**:
   - `components/molecules/FlashcardFace/FlashcardFace.tsx` - Displays card with levels
   - `components/organisms/FlashcardViewer/FlashcardViewer.tsx` - Full study session

4. **Pages**:
   - `app/page.tsx` - Dashboard
   - `app/study/[domainId]/page.tsx` - Dynamic study route
   - `app/study/all/page.tsx` - Study all domains

## Common Tasks

### Adding Flashcards to Existing Domains

Edit `public/data/flashcards_domain4.json` or `flashcards_domain5.json`:

```json
{
  "id": "d4-031",
  "domain": 4,
  "section": "Security Monitoring",
  "type": "acronym",
  "front": "IDS",
  "back": {
    "level1": "Intrusion Detection System",
    "level2": "Full definition and explanation...",
    "level3": "Exam tip: Remember that IDS only detects..."
  },
  "metadata": {
    "difficulty": "medium",
    "commonlyTested": true,
    "relatedTerms": ["IPS", "NIDS"]
  }
}
```

### Adding New Domains (1-3)

1. Create `public/data/flashcards_domain[1|2|3].json` following the schema
2. Update `FlashcardService.ts` line 16 to include new domain numbers
3. Update `app/study/page.tsx` to enable domain tiles (remove `available={false}`)

### Adding Unit Tests

Jest is configured. Create test files next to components:

```typescript
// src/components/atoms/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

Run: `npm test`

### Adding Touch Gestures

The plan called for swipe gestures but they're not implemented. To add:

1. Use Framer Motion's `drag` prop in `FlashcardViewer.tsx`
2. Detect `onDragEnd` with threshold (>50px)
3. Call `handleNext()` or `handlePrevious()` based on direction

### Changing Theme Colors

Edit `src/app/globals.css` CSS custom properties:

```css
:root {
  --primary: #2563eb; /* Change this */
}

[data-theme='dark'] {
  --primary: #3b82f6; /* And this */
}
```

## Known Limitations

1. **No Server-Side Rendering**: All pages use `'use client'` directive because they need browser APIs (localStorage)
2. **No Data Persistence Across Devices**: localStorage is per-browser
3. **No Quiz Mode**: Mentioned in plan but not implemented
4. **Limited Domains**: Only 4 and 5 have flashcards
5. **No Animation on Card Flip's "Show More"**: Only front/back flip animates

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Make changes**: Edit files, hot reload works
3. **Test manually**: Open http://localhost:3000
4. **Lint**: `npm run lint` (fix issues)
5. **Format**: `npm run format`

## Debugging Tips

**Flashcards not loading?**
- Check browser console for fetch errors
- Verify JSON file exists in `public/data/`
- Check FlashcardService cache

**Progress not saving?**
- Check localStorage in DevTools (Application tab)
- Look for `secplus_progress` key
- Verify ProgressRepository is being called

**Dark mode not working?**
- Check if `data-theme="dark"` is set on `<html>` element
- Verify CSS custom properties in `globals.css`

**Keyboard shortcuts not working?**
- Check `useKeyboard` hook is enabled
- Verify event listeners are attached
- Look for conflicting browser shortcuts

## Design Patterns Used

- **Repository Pattern**: ProgressRepository, PreferencesRepository abstract localStorage
- **Service Layer**: FlashcardService, DomainService handle data fetching
- **Custom Hooks**: Encapsulate reusable logic (useFlashcards, useProgress)
- **Compound Components**: FlashcardFace is composed into FlashcardViewer
- **Progressive Enhancement**: Basic functionality works without JS, enhanced with interactions

## Performance Considerations

- **Caching**: FlashcardService caches JSON in memory to avoid repeated fetches
- **Code Splitting**: Next.js automatically splits routes
- **Image Optimization**: Not applicable (no images in MVP)
- **Bundle Size**: ~200KB (Next.js + React + Framer Motion)

## Security Considerations

- **No Auth**: App is client-side only, no login required
- **XSS Prevention**: React escapes content by default
- **localStorage**: Limited to 5-10MB, cleared when user clears browser data
- **No API Calls**: All data is local JSON files

## Future Work Recommendations

1. **Complete Domains 1-3**: Add 30 flashcards each, following existing patterns
2. **Write Tests**: Add unit tests for critical components (FlashcardViewer, ProgressRepository)
3. **Quiz Mode**: New page with multiple-choice questions
4. **Spaced Repetition**: Implement SRS algorithm for optimal review timing
5. **Analytics**: Track study time, success rates, weak areas
6. **Export/Import**: Let users backup progress to JSON file
7. **Touch Gestures**: Add swipe navigation for mobile

## Questions to Ask User

When user asks for changes, consider:

- **New features**: Does it fit the MVP scope or is it future enhancement?
- **Data changes**: Adding flashcards vs. changing schema?
- **UI changes**: Just styling or functionality changes?
- **Performance**: Is optimization needed yet (MVP is fast)?

## Common User Requests

**"Add more flashcards"**: Edit JSON files in `public/data/`

**"Change colors"**: Edit Tailwind config or CSS custom properties

**"Add quiz mode"**: This is a future enhancement, not in MVP scope

**"Make it mobile-friendly"**: Already responsive! Test on mobile viewport

**"Export my progress"**: Not implemented. Would need new feature to download localStorage as JSON

## Final Notes

This is a **well-structured, functional MVP**. The code is clean, follows best practices, and is ready for extension. Focus on adding content (flashcards) before adding new features.

The user can now:
- Study 60 flashcards across 2 domains
- Track their progress
- Reference all content
- Customize their experience

**The app works and is ready to use for exam prep!** 🎯
