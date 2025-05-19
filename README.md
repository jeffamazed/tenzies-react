# 🎲 Tenzies React Game

A fun dice game built with React and Vite, inspired by [Bob Ziroll's Tenzies project](https://scrimba.com/learn/learnreact/tenzies-game-co5b3e6e7d6e7e7e7e7e7e7e7). Try to get all dice to show the same number in as few rolls as possible!

**Live Demo:**  
[Play Tenzies Online](https://jeffamazed.github.io/tenzies-react/)

## ✨ Features

- **Interactive Gameplay:** Click dice to hold their value, roll the rest.
- **Sound Effects:** Toggle SFX for rolling, selecting, and winning.
- **Confetti Celebration:** Enjoy confetti when you win!
- **Responsive Design:** Looks great on desktop and mobile.
- **Accessible:** Keyboard focus management and screen reader support.

## 🚀 Getting Started

1. **Clone the repo:**
   ```sh
   git clone https://github.com/jeffamazed/tenzies-react.git
   cd tenzies-react
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

## 🕹️ How to Play

1. Click **Roll** to roll all dice.
2. Click any die to "hold" its value (it won't roll next time).
3. Keep rolling and holding until all dice show the same number.
4. Try to win in as few rolls as possible!

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [react-confetti](https://www.npmjs.com/package/react-confetti)

## 📁 Project Structure

```
src/
  components/
    Die.jsx
    Main.jsx
    Sfx.jsx
  audio/
    dice-roll-final.mp3
    dice-select-final.mp3
    win-final.mp3
  App.jsx
  index.css
  index.jsx
```

## 📣 Credits

- Game logic and UI inspired by [Bob Ziroll's React course](https://scrimba.com/learn/learnreact).
- Dice icons from [Font Awesome](https://fontawesome.com/).
- Sound effects from [Pixabay](https://pixabay.com/).

---

Enjoy playing Tenzies! PRs and suggestions welcome.
