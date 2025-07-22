# 🚀 PageBuilder Hub

**A powerful, intuitive website builder with drag-and-drop functionality, real-time preview, and JSON import/export capabilities.**

![PageBuilder Hub](https://img.shields.io/badge/PageBuilder-Hub-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Features
- **📚 Section Library**: Pre-made sections (Header, Hero, About, Features, Footer) with click-to-add functionality
- **👁️ Live Preview**: Real-time preview of your website as you build
- **💾 Import/Export**: Save and load your designs as JSON files
- **✏️ Editable Sections**: Customize colors, text, images, and more
- **🔄 Drag & Drop**: Reorder sections with intuitive drag-and-drop interface
- **📱 Responsive Design**: Fully responsive across all screen sizes

### 🎨 Design Features
- **🎨 Color Customization**: Full color picker for backgrounds and text
- **🖼️ Image Support**: Add custom background images via URLs
- **📝 Rich Text Editing**: Edit titles, descriptions, and content
- **⚡ Smooth Animations**: Beautiful transitions and micro-interactions
- **🎯 Modern UI**: Clean, professional interface built with shadcn/ui

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: shadcn/ui with Radix UI
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Color Picker**: react-colorful
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pagebuilder-hub.git
   cd pagebuilder-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### 1. **Add Sections**
   - Browse the Section Library on the left sidebar
   - Click on any section to add it to your page
   - Sections are automatically added to the preview area

### 2. **Edit Content**
   - Click on any section in the preview area
   - Use the Edit Panel on the right to customize:
     - Text content (titles, descriptions)
     - Colors (background, text)
     - Images (background images)
     - Navigation items
     - Feature lists

### 3. **Reorder Sections**
   - Drag and drop sections using the grip handle
   - Sections will automatically reorder in real-time

### 4. **Preview Mode**
   - Click "Preview Mode" to see your website without editing controls
   - Click "Edit Mode" to return to editing

### 5. **Save & Load**
   - Click "Export" to download your design as a JSON file
   - Click "Import" to load a previously saved design

## 🏗️ Project Structure

```
pagebuilder-hub/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── sections/          # Section components
│   ├── ui/               # shadcn/ui components
│   ├── EditPanel.tsx     # Section editor
│   ├── PreviewArea.tsx   # Live preview
│   ├── SectionLibrary.tsx # Section library
│   └── Toolbar.tsx       # Main toolbar
├── contexts/             # React contexts
│   └── BuilderContext.tsx # Main state management
├── types/                # TypeScript types
│   └── builder.ts        # Type definitions
└── lib/                  # Utility functions
    └── utils.ts          # Helper functions
```

## 🎯 Key Components

### BuilderContext
- Manages the global state of the website builder
- Handles section operations (add, edit, delete, reorder)
- Manages import/export functionality
- Controls preview/edit mode

### Section Library
- Displays available section templates
- Handles section creation with default properties
- Provides visual previews of each section type

### Preview Area
- Renders the live website preview
- Implements drag-and-drop reordering
- Handles section selection and deletion
- Shows/hides editing controls based on mode

### Edit Panel
- Provides form controls for section customization
- Includes color pickers, text inputs, and image inputs
- Updates section properties in real-time

## 🔧 Customization

### Adding New Sections
1. Create a new section component in `components/sections/`
2. Add the section type to the `Section` interface in `types/builder.ts`
3. Add the section template to `SectionLibrary.tsx`
4. Add the section renderer to `PreviewArea.tsx`
5. Add the section editor to `EditPanel.tsx`

### Styling
- The app uses Tailwind CSS for styling
- Custom styles can be added to `app/globals.css`
- Component-specific styles are co-located with components

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [@dnd-kit](https://dndkit.com/) - Drag and drop library

---

**Built with ❤️ using modern web technologies** 