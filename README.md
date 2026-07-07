# Bharathi Thangaraj Portfolio

A static portfolio website built with only vanilla HTML, CSS, and JavaScript. It is ready to host on GitHub Pages without any build step.

## Files

- `index.html` - Main portfolio page
- `styles.css` - Responsive styling, dark/light theme, cards, timeline, and layout
- `script.js` - Theme toggle, mobile navigation, project filters, scroll reveal, active navigation, and mailto contact form
- `resume.pdf` - Resume file used by the Download Resume button

## How to host on GitHub Pages

1. Create a new GitHub repository, for example `bharathi-portfolio`.
2. Upload `index.html`, `styles.css`, `script.js`, and `resume.pdf` to the root of the repository.
3. Go to repository `Settings` > `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and `/root`, then save.
6. Your portfolio will be published at the GitHub Pages URL shown in the Pages settings.

## Customization

- Edit contact links in `index.html` if phone, email, LinkedIn, or GitHub changes.
- Replace `resume.pdf` with an updated resume using the same filename so the Download Resume button keeps working.
- Add more project cards by copying an existing `.project-card` block in `index.html` and updating its `data-tags`.
