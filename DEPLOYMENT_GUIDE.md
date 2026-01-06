# Portfolio Deployment Guide

## Option 1: GitHub Pages (Recommended - Professional)
This gives you a professional URL like `aman7506.github.io/portfolio`.

1.  **Create a New Repository on GitHub**
    *   Go to [github.com/new](https://github.com/new).
    *   Repository name: `portfolio` (or `aman7506.github.io` if you want it to be your main site).
    *   Make it **Public**.
    *   Do **not** check "Initialize with README".
    *   Click **Create repository**.

2.  **Push Your Code**
    *   Copy the commands shown on GitHub under "…or push an existing repository from the command line".
    *   They will look like this (run these in your terminal):
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
        git branch -M main
        git push -u origin main
        ```

3.  **Enable GitHub Pages**
    *   Go to your repository **Settings** > **Pages**.
    *   Under **Source**, select `Deploy from a branch`.
    *   Under **Branch**, select `main` and `/ (root)`.
    *   Click **Save**.
    *   Wait about 1-2 minutes. Your live link will appear at the top of the page!

---

## Option 2: Netlify Drop (Fastest - 30 Seconds)
If you don't want to use GitHub right now:

1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Drag and drop your entire `Aman Portfolio` folder onto the page.
3.  Netlify will deploy it instantly and give you a random URL (e.g., `peaceful-galaxy-123.netlify.app`).
4.  You can change the site name in "Site Settings" to something like `aman-portfolio.netlify.app`.
