# Setup Guide: Uploading to GitHub

## Step 1: Create a New Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Name it: `family-tree-builder`
5. Add description: "Interactive family tree builder with photo support"
6. Choose **Public** (so others can see it) or **Private** (only you)
7. Click **Create repository**

## Step 2: Clone Repository Locally

```bash
# Copy the URL from your GitHub repo
git clone https://github.com/yourusername/family-tree-builder.git
cd family-tree-builder
```

## Step 3: Add Files

Place these files in your `family-tree-builder` folder:
- `index.html` - The main application
- `README.md` - Documentation
- `.gitignore` - Git ignore rules
- `package.json` - Project metadata

## Step 4: Commit and Push

```bash
# Stage all files
git add .

# Commit with a message
git commit -m "Initial commit: Family tree builder with photo support"

# Push to GitHub
git push origin main
```

## Step 5: Enable GitHub Pages (Optional)

If you want to host it online for free:

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/root** folder
6. Click **Save**

Your site will be live at: `https://yourusername.github.io/family-tree-builder/`

## Step 6: Use Locally

Simply open `index.html` in your browser. No server needed!

---

## Troubleshooting

### "git command not found"
- Install Git from: https://git-scm.com/downloads

### "Permission denied" on push
- Check SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Photos not saving
- They're stored in browser's local storage (device-specific, not in git)

### Want to share your tree?
- Export data manually or take screenshots
- Don't commit browser storage (it's not tracked)

---

## File Sizes

- `index.html` - ~15 KB
- `README.md` - ~3 KB
- `package.json` - ~1 KB
- `.gitignore` - ~1 KB

**Total: ~20 KB** - Super lightweight! ⚡

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Enable GitHub Pages for live hosting
3. ✅ Start building your family tree
4. ✅ Share the link with family members

---

Questions? Check out:
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Help](https://docs.github.com)
- [GitHub Pages Guide](https://pages.github.com)
