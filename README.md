# Family Tree Builder 👨‍👩‍👧‍👦

An interactive, web-based family tree builder with photo support. Create, edit, and visualize your family relationships with an intuitive interface.

## Features

✨ **Interactive Family Tree**
- Add, edit, and delete family members
- Organize people by generation (Grandparents, Parents, Children)
- Set parent-child relationships
- Store birth years for each person

📸 **Photo Support**
- Upload photos for each family member
- Photos display as circular avatars in the tree
- Automatic initial generation if no photo

💾 **Auto-Save**
- All data saved to browser's local storage
- Persists between sessions
- No server required

📊 **Visual Tree**
- Real-time preview of family tree
- Clean, organized layout
- Color-coded by generation
- Responsive design

## Getting Started

### Option 1: Use Online (No Installation)

1. Clone this repository:
```bash
git clone https://github.com/yourusername/family-tree-builder.git
cd family-tree-builder
```

2. Open `index.html` in your web browser:
   - Double-click the file, or
   - Right-click → Open with → Browser

### Option 2: GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Set source to `main` branch
4. Your tree will be live at: `https://yourusername.github.io/family-tree-builder/`

## Usage

### Adding Family Members

1. Click **"+ Add Family Member"** button
2. Fill in their information:
   - Name
   - Birth year
   - Generation (Grandparent, Parent, or Child)
   - Parent (who their parent is)
3. Click **Save**

### Adding Photos

1. Select a family member from the list
2. Click **"📸 Upload Photo"**
3. Choose an image file from your computer
4. The photo will appear as a circular avatar
5. To remove: Click **"Remove Photo"**

### Editing & Deleting

- Click any person in the member list to edit them
- Change their details and click **Save**
- Click **Delete** to remove someone

## Data Storage

All your family data is stored in your browser's **local storage**. This means:
- ✅ Data persists when you close and reopen the browser
- ✅ No account or login required
- ⚠️ Data is device-specific (not synced across devices)
- ⚠️ Clearing browser data will delete the family tree

### Backup Your Data

To save your family tree:
1. Export the data manually (if you add export feature)
2. Or take screenshots of your completed tree
3. Or save the browser's local storage

## Technical Details

- **No dependencies** - Pure HTML, CSS, JavaScript
- **Single file** - Everything in `index.html`
- **Client-side only** - No server required
- **Modern browsers** - Works on Chrome, Firefox, Safari, Edge

## Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Roadmap / Future Features

- [ ] Export to PDF
- [ ] Export/Import JSON data
- [ ] Multiple tree projects
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Death dates
- [ ] Marriage relationships
- [ ] Siblings view
- [ ] Descendant count
- [ ] Print-friendly layout
- [ ] Dark mode

## File Structure

```
family-tree-builder/
├── index.html          # Complete application
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

## License

MIT License - Feel free to use, modify, and distribute

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## Questions?

If you have questions or run into issues:
1. Check the [GitHub Issues](https://github.com/yourusername/family-tree-builder/issues)
2. Create a new issue with details
3. Include screenshots if helpful

---

**Made with ❤️ for building family connections**
