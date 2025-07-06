# Tablify - Smart Spreadsheet Application

A modern, responsive spreadsheet application built with React, TypeScript, and Tailwind CSS. Tablify provides an intuitive interface for data management with real-time editing, multiple sheets, and advanced features.

## 🌐 Live Demo
[Live URL: https://tabliffy.netlify.app/](https://tabliffy.netlify.app/)

## 🚀 Features

### Core Functionality
- **Multi-Sheet Support**: Create and manage multiple spreadsheet tabs
- **Real-time Editing**: Inline cell editing with instant updates
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Data Types**: Support for text, numbers, dates, status, and priority fields
- **Add/Remove Rows & Columns**: Dynamic spreadsheet expansion

### Advanced Features
- **Search & Filter**: Find data quickly across all sheets
- **Sort Functionality**: Sort data by any column (A-Z, Z-A)
- **Column Resizing**: Drag to resize columns with auto-fit option
- **Row Resizing**: Adjust row heights as needed
- **Import/Export**: Support for CSV, Excel, and JSON formats
- **Status & Priority Badges**: Visual indicators for task management

### UI/UX Features
- **Modern Interface**: Clean, professional design with smooth animations
- **Mobile-First**: Touch-friendly interface for mobile devices
- **Keyboard Navigation**: Full keyboard support for power users
- **Visual Feedback**: Hover states, loading indicators, and toast notifications

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Components
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone https://github.com/shivamudipelly/tablify.git
cd tablify

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Setup
No environment variables required - the application runs entirely on the client-side.

## 🏗️ Project Structure

```
tablify/
├── client/
│   ├── components/
│   │   ├── spreadsheet/     # Core spreadsheet components
│   │   └── ui/             # Reusable UI components
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── public/                 # Static assets
├── dist/                   # Build output
└── netlify.toml           # Netlify configuration
```

## 🎯 Key Components

### SpreadsheetView
The main spreadsheet component handling:
- Data management and state
- Cell editing and validation
- Row/column operations
- Search and filtering

### Toolbar
Responsive toolbar with:
- Search functionality
- Import/export options
- View toggles (grid/list)
- Sort and filter controls

### TabNavigation
Multi-sheet management with:
- Scrollable tab navigation
- Add/remove sheets
- Sheet renaming
- Mobile-friendly design

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Collapsible menu, touch-optimized
- **Tablet**: 768px - 1024px - Adaptive layout
- **Desktop**: > 1024px - Full feature set

### Mobile Optimizations
- Horizontal scrolling for wide tables
- Touch-friendly buttons and controls
- Optimized spacing and typography
- Collapsible search and menu

## 🔧 Configuration

### Netlify Deployment
The project includes:
- `netlify.toml` - Build configuration
- `public/_redirects` - SPA routing support
- Optimized build output in `dist/spa/`

### Build Optimization
- Tree shaking for unused code
- CSS minification
- JavaScript bundling and compression
- Asset optimization

## ⚖️ Trade-offs & Decisions

### Technical Trade-offs

1. **Client-Side Only**
   - ✅ **Pros**: Fast, no server costs, simple deployment
   - ❌ **Cons**: No data persistence, limited collaboration

2. **No Backend Database**
   - ✅ **Pros**: Zero backend complexity, instant setup
   - ❌ **Cons**: Data lost on refresh, no user accounts

3. **File-Based Data Management**
   - ✅ **Pros**: Familiar import/export workflow
   - ❌ **Cons**: No real-time sync, manual save required

### UI/UX Trade-offs

1. **Mobile-First Design**
   - ✅ **Pros**: Works on all devices, touch-friendly
   - ❌ **Cons**: Some features limited on mobile

2. **Single Page Application**
   - ✅ **Pros**: Fast navigation, smooth transitions
   - ❌ **Cons**: Requires proper routing configuration

3. **Inline Editing**
   - ✅ **Pros**: Intuitive, Excel-like experience
   - ❌ **Cons**: Can be challenging on mobile keyboards

### Performance Trade-offs

1. **Large Dataset Handling**
   - ✅ **Pros**: Simple implementation, works for typical use cases
   - ❌ **Cons**: May struggle with very large datasets (>10k rows)

2. **Real-time Updates**
   - ✅ **Pros**: Instant feedback, responsive UI
   - ❌ **Cons**: No undo/redo functionality

## 🚀 Future Enhancements

### Planned Features
- [ ] Data persistence with localStorage
- [ ] Undo/redo functionality
- [ ] Formula support
- [ ] Cell formatting options
- [ ] Collaborative editing
- [ ] Advanced filtering
- [ ] Chart generation
- [ ] Template library

### Technical Improvements
- [ ] Virtual scrolling for large datasets
- [ ] Service worker for offline support
- [ ] Progressive Web App (PWA) features
- [ ] Performance optimizations
- [ ] Accessibility improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shiva Mudipelly**
- GitHub: [@shivamudipelly](https://github.com/shivamudipelly)
- Project: [Tablify](https://github.com/shivamudipelly/tablify)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS** 