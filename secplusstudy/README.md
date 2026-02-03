# CompTIA Security+ Study App

A modern flashcard study application for CompTIA Security+ (SY0-701) exam preparation, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Progressive Disclosure Flashcards**: 3-level reveal system (acronym → definition → exam tips)
- **60+ Flashcards**: Domains 4 (Security Operations) and 5 (Security Program Management)
- **Keyboard Shortcuts**: Space (flip), ← → (navigate), R (flag), Esc (exit)
- **Progress Tracking**: Mastery status, review flagging, study statistics
- **Reference Library**: Browse and search all flashcard content
- **Dark Mode**: Light/dark theme support
- **Responsive Design**: Works on mobile and desktop

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Validation**: Zod
- **State**: React Hooks + localStorage
- **Testing**: Jest + React Testing Library (configured)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or navigate to the repository:
```bash
cd secplusstudy
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## Project Structure

```
secplusstudy/
├── public/data/           # JSON data files
│   ├── domains.json
│   ├── flashcards_domain4.json
│   └── flashcards_domain5.json
├── src/
│   ├── app/              # Next.js pages
│   │   ├── page.tsx      # Dashboard
│   │   ├── study/        # Study routes
│   │   ├── reference/    # Reference library
│   │   └── profile/      # Settings
│   ├── components/       # React components
│   │   ├── atoms/        # Basic UI elements
│   │   ├── molecules/    # Composite components
│   │   └── organisms/    # Complex components
│   ├── lib/
│   │   ├── services/     # Data access
│   │   ├── repositories/ # localStorage access
│   │   ├── hooks/        # Custom React hooks
│   │   └── utils/        # Utilities
│   └── types/            # TypeScript types
└── [config files]
```

## Usage

### Studying Flashcards

1. **Select a Domain**: Choose Domain 4, Domain 5, or "Study All"
2. **Navigate Cards**: Use arrow keys (← →) or click Previous/Next
3. **Reveal Answer**: Press Space or click the card
4. **Show More Details**: Click "Show More" to reveal deeper content
5. **Flag for Review**: Press R to mark cards for later review
6. **Exit**: Press Esc or click "Exit"

### Keyboard Shortcuts

- **Space**: Flip card (front ↔ back)
- **←**: Previous card
- **→**: Next card
- **R**: Flag card for review
- **Esc**: Exit study session

### Reference Library

- Browse all flashcards organized by domain and section
- Search by term, acronym, or concept
- Filter by specific domain
- View full card content without studying

### Settings & Profile

- **Theme**: Toggle between light and dark mode
- **Text Size**: Choose cozy, normal, or large
- **Statistics**: View cards studied, mastered, and flagged for review
- **Clear Progress**: Reset all study data

## Data Storage

All user data (progress, preferences) is stored in browser localStorage. No server or database required.

## Exam Domains Covered

- ✅ **Domain 4**: Security Operations (28% of exam) - 30 flashcards
- ✅ **Domain 5**: Security Program Management and Oversight (20% of exam) - 30 flashcards
- 🔜 **Domain 1-3**: Coming in future updates

## Future Enhancements

- [ ] Complete flashcards for Domains 1-3
- [ ] Quiz mode with multiple choice
- [ ] Spaced repetition algorithm
- [ ] Study session analytics
- [ ] Export/import progress data
- [ ] Mobile app (React Native)

## Development

### Adding New Flashcards

1. Edit the appropriate JSON file in `public/data/`
2. Follow the schema defined in `src/types/flashcard.ts`
3. Ensure all required fields are present:
   - `id`: Unique identifier (e.g., "d4-031")
   - `domain`: Domain number (1-5)
   - `section`: Section name
   - `type`: "acronym", "concept", "tool", "process", "attack", or "standard"
   - `front`: The term/acronym
   - `back.level1`: Basic definition
   - `back.level2`: Detailed explanation
   - `back.level3`: Exam tips and context
   - `metadata`: Difficulty, commonlyTested, relatedTerms

### Code Style

- Use Prettier for formatting (`npm run format`)
- Follow ESLint rules (`npm run lint`)
- Write TypeScript with strict mode enabled
- Use Zod for runtime validation

## Contributing

This is a personal study project, but suggestions and improvements are welcome!

## License

ISC

## Acknowledgments

- CompTIA for the Security+ certification framework
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations

## Contact

Built for CompTIA Security+ exam preparation. Good luck with your studies! 🎯
