# Contributing to docsify-termynal

Thank you for your interest in contributing to **docsify-termynal**. This document outlines guidelines for contributing to the project, including reporting issues, submitting patches, and proposing new features.

---

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your forked repository:

```term
foo@bar:~/root/to/project$ 
$ git clone https://github.com/<your-username>/docsify-termynal.git
>> Cloning repository from GitHub...
Cloning into 'docsify-termynal'...
remote: Enumerating objects: 57, done.
remote: Counting objects: 100% (57/57), done.
remote: Compressing objects: 100% (40/40), done.
remote: Total 57 (delta 18), reused 52 (delta 13), pack-reused 0
Receiving objects: 100% (57/57), 385.24 KiB | 1.50 MiB/s, done.
Resolving deltas: 100% (18/18), done.
✅ Clone successful!

foo@bar:~/root/to/project$ 
$ cd docsify-termynal/
📂 Moved into 'docsify-termynal' directory.
```

1. Create a new branch for your changes:

```term
foo@bar:~/root/to/project$ 
$ git checkout -b feature/your-feature-name
>> Creating a new branch: 'feature/your-feature-name'...
Switched to a new branch 'feature/your-feature-name'
✅ Branch 'feature/your-feature-name' created and checked out.

foo@bar:~/root/to/project (feature/your-feature-name)$ 
# 🎯 You are now working on 'feature/your-feature-name'
# 🔧 Time to build something awesome!
```
4. Make your changes and commit:

```term
foo@bar:~/root/to/project (feature/your-feature-name)$ 
$ git commit -m "Describe your change clearly"
[feature/your-feature-name abc1234] Describe your change clearly
 ✨ 3 files changed, 42 insertions(+), 7 deletions(-)
 🧼 clean-up: removed unused imports
 🛠️ updated logic in main.js
 🎨 styled header component

✅ Commit successful!

foo@bar:~/root/to/project (feature/your-feature-name)$ 
# 💾 Changes saved to local history.
# 🚀 Ready to push your awesome work!
```
5. Push to your fork and submit a **pull request** on the main repository.

---

## Development Guide

* The entry HTML file is `index.html`.
* Custom styles are in `dist/css/`.
* Scripts are in `dist/js/`.
* Sidebar content is in `_sidebar.md`.
* Footer content is in `_footer.md`.

To preview the site locally, use a static file server:

```term
$ npx serve .

   ┌────────────────────────────────────────────┐
   │                                            │
   │   Serving!                                 │
   │                                            │
   │   - Local:    http://localhost:3000        │
   │   - Network:  http://172.27.219.221:3000   │
   │                                            │
   │   Copied local address to clipboard!       │
   │                                            │
   └────────────────────────────────────────────┘

# or using Python:
$ python3 -m http.server

   ┌────────────────────────────────────────────┐
   │                                            │
   │   Serving HTTP on 0.0.0.0 port 8000 (http://localhost:8000/) ...
   │                                            │
   └────────────────────────────────────────────┘

# To stop the server, press Ctrl + C
```

---

## Guidelines

* Keep pull requests focused on a single topic or feature.
* Match the current code style.
* Write clear commit messages.
* Include related issues in your PR description if applicable.
* For larger changes, open an issue first to discuss the approach.

---

## Reporting Issues

When reporting bugs, please provide:

* A clear and descriptive title.
* Steps to reproduce the issue.
* The expected and actual behavior.
* Screenshots if possible.

---

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE.md).