import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Die } from "./Die.jsx";
import { Sfx } from "./Sfx.jsx";
import Confetti from "react-confetti";
import diceRollAudio from "../audio/dice-roll-final.mp3";
import diceSelectAudio from "../audio/dice-select-final.mp3";
import winAudio from "../audio/win-final.mp3";

export function Main() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [rollCount, setRollCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasReset, setHasReset] = useState(false);
  const [sfx, setSfx] = useState(true);
  const sfxLib = useMemo(
    () => ({
      diceRoll: new Audio(diceRollAudio),
      diceSelect: new Audio(diceSelectAudio),
      win: new Audio(winAudio),
    }),
    []
  );

  // Track window size for confetti full screen
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // check if game is won
  const gameWon = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );

  const prevGameWon = useRef(false);
  const buttonRef = useRef(null);
  const firstDieRef = useRef(null);

  // focusing new game button and first die after new game
  useEffect(() => {
    if (gameWon) buttonRef.current.focus();
    else firstDieRef.current.focus();
  }, [gameWon]);

  // Play win sfx only once on winning
  const playSfx = useCallback((sfx) => {
    const soundNode = sfx.cloneNode();
    soundNode.play();
  }, []);

  useEffect(() => {
    if (!prevGameWon.current && gameWon && sfx) {
      playSfx(sfxLib.win);
    }
    prevGameWon.current = gameWon;
  }, [gameWon, sfx, sfxLib, playSfx]);

  // Rest of your functions ...

  function generateId() {
    return "_" + Math.random().toString(36).slice(2, 11);
  }

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => {
      const rand = Math.floor(Math.random() * 6) + 1;
      return {
        value: rand,
        isHeld: false,
        isRolling: false,
        id: generateId(),
      };
    });
  }

  function handleRollDice() {
    setDice((prevDie) =>
      prevDie.map((die) => (die.isHeld ? die : { ...die, isRolling: true }))
    );

    setTimeout(() => {
      setDice((prevDice) =>
        prevDice.map((die) => {
          const rand = Math.floor(Math.random() * 6) + 1;
          return die.isHeld ? die : { ...die, value: rand, isRolling: false };
        })
      );
    }, 370);
  }

  function handleRollCount() {
    setRollCount((prevCount) => prevCount + 1);
  }

  function handleButtonClick() {
    if (gameWon) {
      setIsTransitioning(true);

      setTimeout(() => {
        setDice(generateAllNewDice());
        setRollCount(0);
        setIsTransitioning(false);
        setHasReset(true);
      }, 200);
    } else {
      handleRollDice();
      handleRollCount();
      if (sfx) playSfx(sfxLib.diceRoll);
    }
  }

  function hold(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : { ...die }
      )
    );
  }

  function handleInstructionTexts() {
    return gameWon ? (
      <>
        {
          <p>
            {rollCount <= 5
              ? "Impressive!"
              : rollCount <= 10
              ? "Excellent!"
              : rollCount <= 15
              ? "Great!"
              : rollCount <= 20
              ? "Not bad!"
              : "It's not your day..."}
          </p>
        }
        <p>You won the game in {rollCount} roll(s).</p>
      </>
    ) : (
      <p>
        Your goal: get all the dice to show the same number. Click a die to keep
        it from changing when you roll.
      </p>
    );
  }

  function handleSfxToggle() {
    setSfx((prev) => !prev);
  }

  const diceEls = dice.map((dieObj, i) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
      isRolling={dieObj.isRolling}
      gameWon={gameWon}
      reference={i === 0 ? firstDieRef : null}
      playSfx={() => playSfx(sfxLib.diceSelect)}
      sfx={sfx}
    />
  ));

  return (
    <main
      className={`${isTransitioning ? "fade-out" : hasReset ? "fade-in" : ""}`}
    >
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to play again.</p>
        )}
      </div>
      <div className="instruction-container">
        <h1>Tenzies</h1>
        {handleInstructionTexts()}
      </div>
      <div className="dice-container">{diceEls}</div>
      <button className="roll-btn" onClick={handleButtonClick} ref={buttonRef}>
        {gameWon ? "New Game" : "Roll"}
      </button>
      <Sfx sfx={sfx} sfxToggle={handleSfxToggle} />

      {/* Show confetti when game is won */}
      {gameWon && (
        <div className="confetti-fixed">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={150}
            gravity={0.3}
            recycle={false}
            initialVelocityX={{ min: -10, max: 10 }}
            initialVelocityY={{ min: -10, max: 10 }}
            colors={["#FFC700", "#FF0000", "#2E3192", "#41BBC7"]}
          />
        </div>
      )}
    </main>
  );
}
