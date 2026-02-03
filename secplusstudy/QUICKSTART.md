# Quick Start Guide

## Get Running in 30 Seconds

```bash
# You're already in the right directory!
npm run dev
```

Then open: **http://localhost:3000**

## First-Time Study Session

1. **Homepage** loads → Click **"Flash Cards"**
2. **Domain Selection** → Click **"Domain 4"** or **"Domain 5"**
3. **Study Session**:
   - Read the acronym (e.g., "SIEM")
   - Press **Space** to flip
   - See Level 1 definition
   - Click **"Show More"** for Level 2
   - Click **"Show More"** again for Level 3 (Exam Tips)
   - Press **→** for next card
   - Press **←** for previous card
   - Press **R** to flag for review
   - Press **Esc** to exit

## Keyboard Shortcuts (Study Mode)

| Key | Action |
|-----|--------|
| `Space` | Flip card (front ↔ back) |
| `←` | Previous card |
| `→` | Next card |
| `R` | Flag for review |
| `Esc` | Exit study session |

## Main Navigation

- **Dashboard** (`/`) - Start here
- **Flash Cards** (`/study`) - Study mode
- **Reference Library** (`/reference`) - Browse all content
- **Settings** (`/profile`) - Theme, stats, clear data

## Features at a Glance

### Study Mode
- **60 flashcards** (30 in Domain 4, 30 in Domain 5)
- **Progressive disclosure** (3 levels of detail)
- **Flip animation** (smooth Framer Motion)
- **Progress tracking** (stored in browser localStorage)
- **Mastery system** (auto-marks after 3 correct views)

### Reference Library
- **Search** by term, acronym, or concept
- **Filter** by domain
- **Browse** all content organized by section

### Settings
- **Dark/Light theme** toggle
- **Text size** (cozy, normal, large)
- **Statistics** (cards studied, mastered, flagged)
- **Clear progress** (reset all data)

## Sample Flashcards

**Domain 4: Security Operations**
- SIEM, SOAR, IDS, IPS, EDR, XDR
- Incident Response, Digital Forensics
- NIST IR Lifecycle, Order of Volatility
- Vulnerability Management (CVE, CVSS)

**Domain 5: Security Program Management**
- Risk Management, Governance
- GDPR, HIPAA, PCI DSS, SOX, SOC 2
- Security Policies, Data Classification
- BIA, Risk Response Strategies

## Data Storage

All your progress is saved in **browser localStorage**:
- No account required
- No internet connection needed (after first load)
- Data persists until you clear browser data
- Not synced across devices

## Customize Your Experience

### Change Theme
1. Go to **Settings** (bottom of homepage)
2. Click **☀️ Light** or **🌙 Dark**

### Adjust Text Size
1. Go to **Settings**
2. Choose **Cozy** (smaller) / **Normal** / **Large**

### View Statistics
1. Go to **Settings**
2. See:
   - Cards Studied
   - Mastered (3+ correct)
   - Needs Review (flagged)

## Studying Tips

1. **Start with Domain 4** (28% of exam weight)
2. **Read all 3 levels** - exam tips are crucial
3. **Flag unfamiliar terms** with R key
4. **Review flagged cards** daily
5. **Use reference library** to browse related concepts

## Project Structure (For Developers)

```
secplusstudy/
├── public/data/          # Flashcard JSON files
├── src/
│   ├── app/             # Pages (Next.js App Router)
│   ├── components/      # UI components
│   ├── lib/
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # Data services
│   │   └── repositories/# localStorage access
│   └── types/           # TypeScript definitions
└── [config files]
```

## Troubleshooting

**App won't start?**
```bash
npm install  # Make sure dependencies are installed
npm run dev  # Try starting again
```

**Cards not loading?**
- Check browser console for errors
- Verify files exist in `public/data/`
- Clear browser cache and reload

**Progress not saving?**
- Check localStorage isn't disabled
- Make sure you're not in incognito/private mode
- Check browser console for errors

**Dark mode not working?**
- Go to Settings and toggle theme manually
- Check if browser is forcing light/dark mode

## Next Steps

1. ✅ **Study Domain 4** (30 flashcards)
2. ✅ **Study Domain 5** (30 flashcards)
3. ⏳ **Wait for Domains 1-3** (coming soon)
4. ⏳ **Take practice quizzes** (planned feature)

## Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run lint         # Check code quality
npm run format       # Format code
npm test             # Run tests (when added)
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `CLAUDE.md` for architecture details
- Check `IMPLEMENTATION_SUMMARY.md` for what's implemented
- Open browser DevTools console for debug info

---

**You're ready to start studying! Good luck with your Security+ exam! 🎯**
