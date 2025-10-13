# Al-Hamidi Bakery - Next.js Website

A modern, full-featured bakery website built with Next.js 15, TypeScript, and file-system based data management.

## Features

- 🎨 **Modern Design**: Beautiful, responsive UI with Arabic language support
- 📝 **CRUD Operations**: Full Create, Read, Update, Delete functionality for menu items
- 🖼️ **Image Upload**: File system-based image upload and management
- 📱 **Responsive**: Works perfectly on all devices
- 🚀 **Fast**: Built with Next.js App Router for optimal performance
- 💾 **File-Based Data**: Uses JSON files for data storage (no database required)
- 🔧 **Admin Panel**: Easy-to-use admin interface for managing menu items

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + Global CSS
- **Data Storage**: File System (JSON)
- **Image Storage**: File System (public/uploads)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd al-hamidi-nextjs
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
al-hamidi-nextjs/
├── app/
│   ├── api/
│   │   ├── menu/          # Menu CRUD API routes
│   │   └── upload/        # Image upload API
│   ├── admin/             # Admin panel
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── Header/            # Navigation header
│   ├── Home/              # Hero section
│   ├── About/             # About us section
│   ├── Menu/              # Menu display
│   └── Location/          # Contact & location
├── data/
│   └── menu.json          # Menu data storage
├── public/
│   ├── assets/            # Static assets (images, icons)
│   └── uploads/           # Uploaded images
└── README.md
```

## API Routes

### Menu API (`/api/menu`)

- **GET**: Fetch all menu data
- **POST**: Create new category or item
- **PUT**: Update existing category or item
- **DELETE**: Delete category or item

### Upload API (`/api/upload`)

- **POST**: Upload image file
- **GET**: List all uploaded files
- **DELETE**: Delete uploaded file

## Admin Panel

Access the admin panel at `/admin` to:

- Add new menu items
- Edit existing items
- Delete items
- Upload product images
- Manage categories

## Data Management

### Menu Data Structure

The menu data is stored in `data/menu.json`:

```json
[
  {
    "name": "Category Name",
    "categoreyImage": "category-image.png",
    "items": [
      {
        "name": "Item Name",
        "type": "قطعة",
        "price": "50,000",
        "size": "صغير",
        "description": "Item description",
        "productImage": "item-image.jpg"
      }
    ]
  }
]
```

### Adding Images

1. Use the admin panel to upload images
2. Images are stored in `public/uploads/`
3. Images are automatically referenced in the menu data

## Deployment to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. For production deployment:

```bash
vercel --prod
```

### Method 2: Using Git Integration

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com)

3. Click "New Project"

4. Import your repository

5. Configure project:

   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Click "Deploy"

### Important Notes for Vercel Deployment

⚠️ **File System Limitations on Vercel**:

- Vercel's serverless functions have a read-only file system
- Uploaded images and data changes will NOT persist between deployments
- For production, consider using:
  - Cloud storage (AWS S3, Cloudinary, etc.) for images
  - Database (MongoDB, PostgreSQL, etc.) for data

### Recommended Production Setup

For a production environment, you should:

1. **Images**: Use cloud storage like:

   - AWS S3
   - Cloudinary
   - Vercel Blob Storage

2. **Data**: Use a database like:
   - MongoDB Atlas (free tier available)
   - PostgreSQL (Vercel Postgres)
   - Supabase

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add any API keys or secrets here
# Example:
# CLOUDINARY_URL=your_cloudinary_url
# DATABASE_URL=your_database_url
```

## Customization

### Changing Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --gold-crayola: hsl(38, 61%, 73%);
  --eerie-black-1: hsla(210, 4%, 9%, 1);
  /* ... other colors */
}
```

### Adding New Sections

1. Create a new component in `components/`
2. Import and add it to `app/page.tsx`

### Modifying Menu Categories

Edit `data/menu.json` directly or use the admin panel

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- CSS Modules for component-specific styles
- Global CSS for shared styles
- Functional components with hooks

## Troubleshooting

### Images not loading

- Check that images are in `public/assets/` or `public/uploads/`
- Verify image paths in menu.json
- Check file permissions

### API routes not working

- Ensure you're using Node.js 18+
- Check that `data/menu.json` exists and is valid JSON
- Verify file system permissions

### Build errors

- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and rebuild
- Check TypeScript errors with `npm run lint`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, email your-email@example.com or open an issue on GitHub.

## Acknowledgments

- Original design inspiration from Al-Hamidi Bakery
- Built with Next.js and TypeScript
- Icons and images from the original project

---

Made with ❤️ for Al-Hamidi Bakery
