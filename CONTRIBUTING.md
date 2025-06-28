# Contributing to AllInOne Platform

First off, thank you for considering contributing to AllInOne! It's people like you that make AllInOne such a great tool.

## 🎯 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Guidelines](#development-guidelines)
- [Submitting Changes](#submitting-changes)
- [Style Guides](#style-guides)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript
- Git for version control

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/allinone.git
   cd allinone
   ```

2. **Create a branch for your changes**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

3. **Set up local development**
   ```bash
   # Using Python (most common)
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   
   # Then open http://localhost:8000
   ```

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the [issue list](https://github.com/your-username/allinone/issues) to see if the problem has already been reported.

**When filing a bug report, please include:**
- Clear, descriptive title
- Detailed description of the issue
- Steps to reproduce the problem
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

### ✨ Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:
- Clear, descriptive title
- Detailed description of the enhancement
- Explain why this would be useful
- Consider if this fits the project scope

### 🔧 Adding New Tools

We're always looking for new utility tools! To add a tool:

1. **Plan your tool**
   - Ensure it fits the AllInOne philosophy
   - Check it doesn't duplicate existing functionality
   - Consider user privacy and security

2. **Create the tool files**
   ```
   tools/category/your-tool.html
   tools/category/your-tool.js (if needed)
   ```

3. **Update the main interface**
   - Add tool card to appropriate category in `tools.html`
   - Update navigation if needed
   - Add to README.md feature list

### 🎨 Improving Design

Design improvements are welcome:
- UI/UX enhancements
- Accessibility improvements
- Mobile responsiveness
- Performance optimizations

## Development Guidelines

### Code Quality

- **Write clean, readable code**
- **Comment complex functionality**
- **Test on multiple browsers**
- **Ensure mobile compatibility**
- **Follow existing code patterns**

### File Structure

```
allinone/
├── index.html          # Main landing page
├── tools.html          # Tools overview page
├── pricing.html        # Pricing information
├── about.html          # About page
├── features.html       # Features page
├── styles.css          # Main stylesheet
├── script.js           # Main JavaScript
├── tools/              # Individual tool files
│   ├── file/           # File processing tools
│   ├── media/          # Media processing tools
│   ├── generator/      # Generator tools
│   ├── common.css      # Shared tool styles
│   └── common.js       # Shared tool functions
└── README.md           # Project documentation
```

### Adding a New Tool

1. **Create HTML file**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Your Tool - AllInOne</title>
       <link rel="stylesheet" href="../../styles.css">
       <link rel="stylesheet" href="../common.css">
   </head>
   <body>
       <!-- Tool interface here -->
       <script src="../common.js"></script>
       <script src="your-tool.js"></script>
   </body>
   </html>
   ```

2. **Add to tools listing**
   ```html
   <!-- In tools.html -->
   <div class="tool-card" onclick="window.location.href='tools/category/your-tool.html'">
       <div class="tool-icon">
           <i class="fas fa-your-icon"></i>
       </div>
       <div class="tool-info">
           <h4>Your Tool Name</h4>
           <p>Tool description</p>
           <div class="tool-formats">Supported formats</div>
       </div>
       <div class="tool-status online">
           <span class="status-indicator"></span>
           <span>Online</span>
       </div>
   </div>
   ```

## Submitting Changes

### Pull Request Process

1. **Ensure your code follows the style guides**
2. **Update documentation** as needed
3. **Test thoroughly** across different browsers
4. **Create a pull request** with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Link to any related issues
   - Screenshots for UI changes

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings or errors
```

## Style Guides

### HTML Style Guide

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Use meaningful class names
- Maintain proper indentation (2 spaces)

### CSS Style Guide

- Follow BEM methodology for class naming
- Use CSS custom properties for theming
- Mobile-first responsive design
- Optimize for performance

### JavaScript Style Guide

- Use modern ES6+ features
- Write clear, self-documenting code
- Handle errors gracefully
- Optimize for performance
- Use consistent naming conventions

### Commit Message Guidelines

```
type(scope): description

Types:
- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code refactoring
- test: adding tests
- chore: maintenance

Examples:
feat(tools): add PDF merger tool
fix(mobile): resolve navigation menu issue
docs: update installation instructions
```

## Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Eligible for special contributor badges

## Questions?

Feel free to reach out:
- [Open an issue](https://github.com/your-username/allinone/issues)
- [Start a discussion](https://github.com/your-username/allinone/discussions)

Thank you for contributing to AllInOne! 🚀 