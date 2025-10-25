# Customization Guide

## 🖼️ Adding Your Profile Picture

### Option 1: Use Your Own Image (Recommended)

1. **Add your image to the project:**
   - Create a `public` folder in the root directory if it doesn't exist
   - Place your profile picture in `public/profile.jpg` (or .png, .webp, etc.)

2. **Update the image source in `src/App.jsx`:**
   
   Find this line (around line 288):
   ```jsx
   src="https://ui-avatars.com/api/?name=Sanjay+S&size=200&background=667eea&color=fff&bold=true&font-size=0.4"
   ```
   
   Replace it with:
   ```jsx
   src="/profile.jpg"
   ```

### Option 2: Use a URL

If your image is hosted online (e.g., on GitHub, LinkedIn, or an image hosting service):

```jsx
src="https://your-image-url.com/profile.jpg"
```

### Option 3: Keep the Generated Avatar

The current setup uses UI Avatars API which generates a nice avatar with your initials. You can customize it:

```jsx
src="https://ui-avatars.com/api/?name=Your+Name&size=200&background=667eea&color=fff&bold=true&font-size=0.4"
```

Parameters you can change:
- `name=Your+Name` - Your name (use + for spaces)
- `background=667eea` - Background color (hex without #)
- `color=fff` - Text color (hex without #)
- `size=200` - Image size in pixels

## 🎨 Web Frameworks & Technologies

The portfolio now includes a **"Frameworks & Libraries"** section with:
- React
- Node.js
- Tailwind CSS
- Vite

### To Add More Frameworks:

In `src/App.jsx`, find the `skills` array (around line 142) and update the "Frameworks & Libraries" section:

```jsx
{ 
  category: "Frameworks & Libraries", 
  items: ["React", "Node.js", "Tailwind CSS", "Vite", "Express", "Next.js"], // Add more here
  icon: "⚛️",
  color: "from-cyan-500 to-blue-500"
}
```

### To Add a New Skill Category:

Add a new object to the `skills` array:

```jsx
{ 
  category: "Your Category Name", 
  items: ["Skill 1", "Skill 2", "Skill 3"], 
  icon: "🎯", // Choose an emoji
  color: "from-pink-500 to-rose-500" // Choose gradient colors
}
```

Available Tailwind gradient colors:
- `from-blue-500 to-cyan-500`
- `from-purple-500 to-pink-500`
- `from-orange-500 to-red-500`
- `from-green-500 to-emerald-500`
- `from-yellow-500 to-amber-500`
- `from-indigo-500 to-violet-500`

## 📱 Profile Picture Styling

The profile picture has several animated effects:
- **Pulse glow** - Glowing border animation
- **Hover scale** - Grows slightly on hover
- **Rotating border** - Spinning gradient border
- **Fade-in animation** - Appears smoothly on page load

You can adjust these in the code or remove them if you prefer a simpler look.

## 🔗 Social Links

Update your social media links in `src/App.jsx` (around line 318):

```jsx
{ icon: "💼", link: "https://linkedin.com/in/your-profile", label: "LinkedIn" },
{ icon: "🐙", link: "https://github.com/your-username", label: "GitHub" },
{ icon: "📧", link: "mailto:your-email@gmail.com", label: "Email" }
```

## 🎨 Color Scheme

To change the overall color scheme, update the gradient colors in:
- Navbar gradient text
- Hero section gradients
- Button gradients
- Skill card gradients

Main colors used:
- Purple: `#667eea`
- Indigo: `#764ba2`
- Pink: `#f093fb`
- Blue: `#4facfe`
