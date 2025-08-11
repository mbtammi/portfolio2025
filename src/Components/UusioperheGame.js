import React, { useState, useEffect, useRef } from 'react';
import './UusioperheGame.css';
import kurjalaImage from '../Images/kurjala.png';
import EemilJaJesseImage from '../Images/EemilJaJesse.png';
import JuusoImage from '../Images/Juuso.png';
import MiroImage from '../Images/Miro.png';
import SanttuJaEmskuImage from '../Images/SanttuJaEmsku.png';
import RoniMarkusImage from '../Images/Roni_Markus.png';
import KaitsuLassiMineaImage from '../Images/KaitsuLassiMinea.png';

// Teams and players
const teams = [
  {
    name: 'Ulkohuussin Hurrikaanit',
    players: [
      { name: 'Eemil', image: '' },
      { name: 'Jesse', image: '' },
    ],
  },
  {
    name: 'Muurahaismarssi',
    players: [
      { name: 'Juuso', image: '' },
      { name: 'Miro', image: '' },
    ],
  },
  {
    name: 'Laiturilössit',
    players: [
      { name: 'Santeri', image: '' },
      { name: 'Emilia', image: '' },
    ],
  },
  {
    name: 'Savusaunanselättäjät',
    players: [
      { name: 'Markus', image: '' },
      { name: 'Roni', image: '' },
    ],
  },
  {
    name: 'Hirvenhörhöt',
    players: [
      { name: 'Minea', image: '' },
      { name: 'Lassi', image: '' },
    ],
  },
];

// Words for the typing game - shuffle function to randomize order
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const baseWords = [
  // Original special words
  'ylioppilas2020', 'uniofjyvaskyla', 'tinkerit', 'innit', 'Jaen', 'blogissani', 'waterboys', 'lutakko', 'sotilas', 'nashledanou', 'Entrepreneur', 'Espoo', 'ystävät', 'Canada', 'helle', 'söpö', 'serkku', 'lontoo', 'feelin', 'date', 'farewells', 'hanko', 'esci', 'tupaamme', 'lumikki', 'regatta', 'järvenpää', 'sauna', 'digital', 'kesällä', 'exchange', 'sportsperson', 'avocado', 'susijengi', 'nappaan', 'huomenna', 'koriskisakatsomo', 'huutis', 'savusauna', 'akku', 'normipistorasia', 'humala', 'liinavaatteet', 'jääkaappi', 'mökille', 'ozaki', 'wish', 'piato', 'lozzi',
  
  // Summer cottage and grilling words
  'mökki', 'rantasauna', 'kiuas', 'löyly', 'vasta', 'vilvoittelemaan', 'järvi', 'ranta', 'laituri', 'uiminen', 'sukeltaminen', 'aurinko', 'auringonlasku', 'kesäyö', 'valkeat', 'hämärä', 'linnut', 'luonto', 'metsä', 'marjassa', 'sieniä', 'kalastus', 'onki', 'vieheet', 'hauki', 'ahven', 'kuha', 'mato', 'perho',
  
  // Grilling and BBQ
  'grilli', 'grillaaminen', 'grillihiilet', 'sytyke', 'grillisytytin', 'makkaraa', 'bratwurst', 'pihvi', 'liha', 'possua', 'lammas', 'kana', 'grillimakkara', 'nakki', 'grillisipsit', 'marinointi', 'marinadi', 'grillausvälineet', 'grillipihdit', 'grilliharja', 'grillisieni', 'grillijuusto', 'grillimaissi', 'grilliperunat', 'grillitulilla',
  
  // Food and eating
  'ruoka', 'syöminen', 'ateria', 'välipala', 'aamiainen', 'lounas', 'illallinen', 'eväät', 'picnic', 'ulkoilu', 'leipä', 'voi', 'juusto', 'kinkku', 'tomaatti', 'kurkku', 'salaatti', 'sipuli', 'peruna', 'uusiksi', 'makaronilaatikko', 'makkis', 'hernekeitto', 'kalakeitto', 'lohikeitto', 'ruisleipä', 'näkkileipä', 'karjalanpiirakat', 'pulla', 'korvapuusti', 'munkki', 'munkit', 'hillot', 'hunaja', 'kerma', 'maito',
  
  // Drinks and beverages
  'olut', 'kalja', 'lonkero', 'siideri', 'viini', 'punaviini', 'valkoviini', 'kuohuviini', 'viski', 'vodka', 'koskenkorva', 'minttu', 'marjalikööri', 'drinkki', 'cocktail', 'mojito', 'sangria', 'kahvi', 'espresso', 'maitokahvi', 'tee', 'jäätee', 'mehujäät', 'limonaadi', 'kivennäisvesi', 'vesi', 'mehu', 'appelsiinimehu', 'omenamehu', 'pirtelö', 'smoothie', 'kaljaa', 'skumppa', 'booli', 'gini', 'rommi', 'brandy',
  
  // Summer activities and fun
  'bileet', 'juhlat', 'syntymäpäivät', 'midsummer', 'juhannuksena', 'kokko', 'nuotio', 'tulenteko', 'makkaran', 'paistaminen', 'kitara', 'musiikki', 'laulut', 'karaoke', 'tanssiminen', 'pelit', 'korttipelit', 'pokeri', 'blackjack', 'mölkky', 'frisbeegolf', 'frisbeelevy', 'pesäpallo', 'jalkapallo', 'lentopallo', 'badminton', 'pöytätennis', 'trampoliini', 'riippumatto', 'keinu', 'vesijetti', 'moottoriven', 'veneilyä', 'purjehdus', 'kanootti', 'kajakki', 'sup', 'melonta', 'vesihiihto', 'wakeboard',
  
  // Weather and nature
  'aurinkoinen', 'lämmin', 'tuuli', 'tyven', 'myrsky', 'ukkonen', 'sade', 'sadekuuro', 'sumu', 'kostea', 'kuiva', 'kuumuus', 'helteet', 'varjo', 'varjossa', 'auringonvalo', 'säteet', 'pilvet', 'sininen', 'taivas', 'tähtitaivas', 'revontulet', 'yö', 'aamunkoi', 'aamukaste', 'lintujen', 'laulua', 'sammakot', 'hyttyset', 'kärpäset', 'perhoset', 'mehiläiset', 'kimalainen',
  
  // Cottage items and equipment
  'keinutuoli', 'puuliesi', 'takka', 'sähkökatkos', 'kynttilät', 'öljylamppu', 'taskulamppu', 'paristo', 'generaattori', 'kylmiö', 'jääkaappi', 'pakastin', 'jääpala', 'jäätelö', 'jäävesi', 'viilentää', 'tuuletin', 'ilmastointi', 'kuistilla', 'terassi', 'parveke', 'veranta', 'puutarha', 'kasvimaa', 'kukkia', 'ruohikko', 'nurmikko', 'kivet', 'polkutie', 'metsäpolku', 'polkupyörä', 'mönkijä', 'skootteri',
  
  // Social and relaxation
  'rentoutuminen', 'lepääminen', 'unimatto', 'päiväuni', 'lukeminen', 'kirja', 'lehti', 'aikakauslehti', 'ristikoita', 'sudoku', 'palapeli', 'kortit', 'lautapelit', 'monopoli', 'shakki', 'tammi', 'bingo', 'arpajaiset', 'kilpailu', 'kisa', 'voittaja', 'palkinto', 'muistot', 'valokuvat', 'selfie', 'kameralla', 'video', 'sosiaalinen', 'perheaikaa', 'ystävyksiä', 'vieraita', 'isännöinti', 'vieraanvaraisuus', 'keskustelu', 'jutteleminen', 'naurua', 'huumori', 'vitsit', 'hauskanpito', 'elämää', 'onnellisuus', 'iloinen', 'rauhallinen', 'kiireetön', 'stressi', 'unohtaa', 'huolet', 'vapaa-aika', 'loma', 'kesäloma', 'palkkaloma', 'vapaapäivä'
];

const finnishWords = shuffleArray(baseWords);

// Keyboard sides (for instructions and restriction)
const leftRestrictedKeys = ['f','d','a','z','x','c','q','w','e','r','v','g','t'];
const rightRestrictedKeys = ['j','k','l','u','i','o','m','n','h','y','p','ä','å','ö'];


// For instructions only (not used in logic)
const leftKeys = ['v','g','t','r','f','c','x','d','e','w','s','z','a','q'];
const rightKeys = ['b','h','y','u','j','n','m','k','i','o','l','ö','p','å','ä'];

const UusioperheGame = () => {
  // Track which player submitted for current word
  const [leftSubmitted, setLeftSubmitted] = useState(false);
  const [rightSubmitted, setRightSubmitted] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [playerLeft, setPlayerLeft] = useState(selectedTeam.players[0]);
  const [playerRight, setPlayerRight] = useState(selectedTeam.players[1] || null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes
  const [wordIndex, setWordIndex] = useState(0);
  const [leftInput, setLeftInput] = useState('');
  const [rightInput, setRightInput] = useState('');
  const [sharedProgress, setSharedProgress] = useState(''); // The actual shared word progress
  const [leftDrinking, setLeftDrinking] = useState(false);
  const [rightDrinking, setRightDrinking] = useState(false);
  const [leftBeerFinished, setLeftBeerFinished] = useState(false);
  const [rightBeerFinished, setRightBeerFinished] = useState(false);
  const [leftBeerAnimating, setLeftBeerAnimating] = useState(false);
  const [rightBeerAnimating, setRightBeerAnimating] = useState(false);
  const [leftBeerClass, setLeftBeerClass] = useState('');
  const [rightBeerClass, setRightBeerClass] = useState('');
  const [teamScore, setTeamScore] = useState(0);
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [leftAccuracy, setLeftAccuracy] = useState(0);
  const [rightAccuracy, setRightAccuracy] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [currentWords, setCurrentWords] = useState(finnishWords); // Hold the current shuffled words
  // Use refs for accumulating totals
  const leftTotalTypedRef = useRef(0);
  const leftTotalCorrectRef = useRef(0);
  const rightTotalTypedRef = useRef(0);
  const rightTotalCorrectRef = useRef(0);
  // State for display
  const [leftTotalTyped, setLeftTotalTyped] = useState(0);
  const [leftTotalCorrect, setLeftTotalCorrect] = useState(0);
  const [rightTotalTyped, setRightTotalTyped] = useState(0);
  const [rightTotalCorrect, setRightTotalCorrect] = useState(0);
  // Define letter count state early as requested
  const [leftLetterCount, setLeftLetterCount] = useState(0);
  const [rightLetterCount, setRightLetterCount] = useState(0);
  const leftTapCount = useRef(0);
  const rightTapCount = useRef(0);

  useEffect(() => {
    if (gameStarted && timer > 0 && !gameOver) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && gameStarted) {
      // Apply penalty if beers not finished
      let finalTeamScore = teamScore;
      if (!leftBeerFinished || !rightBeerFinished) {
        finalTeamScore = Math.floor(teamScore * 0.8); // 20% penalty
        setTeamScore(finalTeamScore);
      }
      setGameOver(true);
    }
  }, [gameStarted, timer, gameOver]);

  useEffect(() => {
    setPlayerLeft(selectedTeam.players[0]);
    setPlayerRight(selectedTeam.players[1] || null);
  }, [selectedTeam]);

  const [usedWordIndices, setUsedWordIndices] = useState([]);
  const [nextWordIndex, setNextWordIndex] = useState(1); // Track the next word to show

  // Helper to get a random unused word index
  const getNextWordIndex = () => {
    const unusedIndices = currentWords.map((_, i) => i).filter(i => !usedWordIndices.includes(i));
    if (unusedIndices.length === 0) {
      // If all words used, reset and start over
      setUsedWordIndices([]);
      return 0;
    }
    return unusedIndices[Math.floor(Math.random() * unusedIndices.length)];
  };

  // Show current word and next word
  const visibleWords = [currentWords[wordIndex], currentWords[nextWordIndex]];

  const handleLeftSubmit = React.useCallback(() => {
    setLeftScore(s => s + 1);
    // Accuracy is already tracked in real-time, just reset for next word
    setLeftInput('');
    setRightInput('');
    setSharedProgress(''); // Reset shared progress
    // Reset letter counts for next word
    setLeftLetterCount(0);
    setRightLetterCount(0);
    // Move to next word - use the pre-selected next word
    setUsedWordIndices(indices => [...indices, wordIndex]);
    setWordIndex(nextWordIndex);
    // Get a new next word
    const newNextIdx = getNextWordIndex();
    setNextWordIndex(newNextIdx);
    setTeamScore(s => s + 1);
  }, [getNextWordIndex, wordIndex, nextWordIndex]);

  const handleRightSubmit = React.useCallback(() => {
    setRightScore(s => s + 1);
    // Accuracy is already tracked in real-time, just reset for next word
    setLeftInput('');
    setRightInput('');
    setSharedProgress(''); // Reset shared progress
    // Reset letter counts for next word
    setLeftLetterCount(0);
    setRightLetterCount(0);
    // Move to next word - use the pre-selected next word
    setUsedWordIndices(indices => [...indices, wordIndex]);
    setWordIndex(nextWordIndex);
    // Get a new next word
    const newNextIdx = getNextWordIndex();
    setNextWordIndex(newNextIdx);
    setTeamScore(s => s + 1);
  }, [getNextWordIndex, wordIndex, nextWordIndex]);

    // Handle key presses
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    function handleKeyDown(e) {
      // Left player drinking toggle
      if (e.key === '1') {
        // Toggle drinking state for left player
        if (leftDrinking && !leftBeerFinished) {
          // Stop drinking - start exit animation
          setLeftBeerClass('stopping');
          setTimeout(() => {
            setLeftDrinking(false);
            setLeftBeerAnimating(false);
            setLeftBeerClass('');
          }, 300);
        } else if (!leftDrinking && !leftBeerFinished) {
          // Start drinking
          setLeftDrinking(true);
          setLeftBeerAnimating(true);
          setLeftBeerClass('drinking');
        }
        return;
      }
      
      // Left player finish beer completely
      if (e.key === '2') {
        if (leftDrinking && !leftBeerFinished) {
          // Finish the beer completely
          setLeftBeerClass('stopping');
          setTimeout(() => {
            setLeftBeerFinished(true);
            setLeftDrinking(false);
            setLeftBeerAnimating(false);
            setLeftBeerClass('');
          }, 300);
        }
        return;
      }
      
      // Right player drinking toggle
      if (e.key === '0') {
        // Toggle drinking state for right player
        if (rightDrinking && !rightBeerFinished) {
          // Stop drinking - start exit animation
          setRightBeerClass('stopping');
          setTimeout(() => {
            setRightDrinking(false);
            setRightBeerAnimating(false);
            setRightBeerClass('');
          }, 300);
        } else if (!rightDrinking && !rightBeerFinished) {
          // Start drinking
          setRightDrinking(true);
          setRightBeerAnimating(true);
          setRightBeerClass('drinking');
        }
        return;
      }
      
      // Right player finish beer completely
      if (e.key === '9') {
        if (rightDrinking && !rightBeerFinished) {
          // Finish the beer completely
          setRightBeerClass('stopping');
          setTimeout(() => {
            setRightBeerFinished(true);
            setRightDrinking(false);
            setRightBeerAnimating(false);
            setRightBeerClass('');
          }, 300);
        }
        return;
      }
      // Spacebar submits for the player who pressed it
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault(); // Prevent default browser behavior (scrolling for spacebar)
        // Always move to next word when Enter/Space is pressed
        // Only one player should submit, prioritize based on who can actually type
        if ((!leftDrinking && !leftBeerFinished) || (leftDrinking && !leftBeerFinished && !leftRestrictedKeys.includes(e.key))) {
          handleLeftSubmit();
        } else if ((!rightDrinking && !rightBeerFinished) || (rightDrinking && !rightBeerFinished && !rightRestrictedKeys.includes(e.key))) {
          handleRightSubmit();
        }
        return;
      }
      // Handle typing for either left or right player (mutually exclusive)
      if (leftKeys.includes(e.key) || e.key === 'Backspace') {
        // Left player typing
        if (!leftDrinking) {
          if (e.key === 'Backspace') {
            setLeftInput(prev => prev.slice(0, -1));
            // Also update shared progress by removing last character
            setSharedProgress(prev => prev.slice(0, -1));
            // Decrease left letter count
            setLeftLetterCount(count => Math.max(0, count - 1));
            // Decrease left totals (remove last letter from accuracy calculation)
            if (leftTotalTypedRef.current > 0) {
              leftTotalTypedRef.current -= 1;
              // We can't easily know if the deleted letter was correct, so let's recalculate
              setLeftTotalTyped(leftTotalTypedRef.current);
            }
          } else {
            // Only increment leftLetterCount if the key is a left-side key
            if (leftKeys.includes(e.key)) {
              setLeftLetterCount(count => count + 1);
              setLeftInput(prev => prev + e.key);
              // Update shared progress - add ALL letters typed (correct or incorrect)
              setSharedProgress(prev => prev + e.key);
              // Track accuracy in real-time
              const currentPos = sharedProgress.length;
              const target = visibleWords[0];
              leftTotalTypedRef.current += 1;
              if (currentPos < target.length && e.key === target[currentPos]) {
                leftTotalCorrectRef.current += 1;
              }
              setLeftTotalTyped(leftTotalTypedRef.current);
              setLeftTotalCorrect(leftTotalCorrectRef.current);
              setLeftAccuracy(() => {
                return leftTotalTypedRef.current > 0 ? Math.round((leftTotalCorrectRef.current / leftTotalTypedRef.current) * 100) : 0;
              });
            }
          }
        } else if (leftDrinking && !leftBeerFinished && !leftRestrictedKeys.includes(e.key)) {
          if (e.key === 'Backspace') {
            setLeftInput(prev => prev.slice(0, -1));
            setSharedProgress(prev => prev.slice(0, -1));
            setLeftLetterCount(count => Math.max(0, count - 1));
            if (leftTotalTypedRef.current > 0) {
              leftTotalTypedRef.current -= 1;
              setLeftTotalTyped(leftTotalTypedRef.current);
            }
          } else {
            if (leftKeys.includes(e.key)) {
              setLeftLetterCount(count => count + 1);
              setLeftInput(prev => prev + e.key);
              // Update shared progress - add ALL letters typed (correct or incorrect)
              setSharedProgress(prev => prev + e.key);
              // Track accuracy in real-time
              const currentPos = sharedProgress.length;
              const target = visibleWords[0];
              leftTotalTypedRef.current += 1;
              if (currentPos < target.length && e.key === target[currentPos]) {
                leftTotalCorrectRef.current += 1;
              }
              setLeftTotalTyped(leftTotalTypedRef.current);
              setLeftTotalCorrect(leftTotalCorrectRef.current);
              setLeftAccuracy(() => {
                return leftTotalTypedRef.current > 0 ? Math.round((leftTotalCorrectRef.current / leftTotalTypedRef.current) * 100) : 0;
              });
            }
          }
        }
      } else if (rightKeys.includes(e.key)) {
        // Right player typing
        if (!rightDrinking) {
          if (rightKeys.includes(e.key)) {
            setRightLetterCount(count => count + 1);
            setRightInput(prev => prev + e.key);
            // Update shared progress - add ALL letters typed (correct or incorrect)
            setSharedProgress(prev => prev + e.key);
            // Track accuracy in real-time
            const currentPos = sharedProgress.length;
            const target = visibleWords[0];
            rightTotalTypedRef.current += 1;
            if (currentPos < target.length && e.key === target[currentPos]) {
              rightTotalCorrectRef.current += 1;
            }
            setRightTotalTyped(rightTotalTypedRef.current);
            setRightTotalCorrect(rightTotalCorrectRef.current);
            setRightAccuracy(() => {
              return rightTotalTypedRef.current > 0 ? Math.round((rightTotalCorrectRef.current / rightTotalTypedRef.current) * 100) : 0;
            });
          }
        } else if (rightDrinking && !rightBeerFinished && !rightRestrictedKeys.includes(e.key)) {
          if (rightKeys.includes(e.key)) {
            setRightLetterCount(count => count + 1);
            setRightInput(prev => prev + e.key);
            // Update shared progress - add ALL letters typed (correct or incorrect)
            setSharedProgress(prev => prev + e.key);
            // Track accuracy in real-time
            const currentPos = sharedProgress.length;
            const target = visibleWords[0];
            rightTotalTypedRef.current += 1;
            if (currentPos < target.length && e.key === target[currentPos]) {
              rightTotalCorrectRef.current += 1;
            }
            setRightTotalTyped(rightTotalTypedRef.current);
            setRightTotalCorrect(rightTotalCorrectRef.current);
            setRightAccuracy(() => {
              return rightTotalTypedRef.current > 0 ? Math.round((rightTotalCorrectRef.current / rightTotalTypedRef.current) * 100) : 0;
            });
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, leftDrinking, rightDrinking, leftBeerFinished, rightBeerFinished, gameOver, handleLeftSubmit, handleRightSubmit, sharedProgress, visibleWords]);

  const startGame = () => {
    // Reshuffle words for each new game
    setCurrentWords(shuffleArray(baseWords));
    setLeftScore(0);
    setRightScore(0);
    setGameStarted(true);
    setTimer(120); // 2 minutes
    setWordIndex(0);
    setNextWordIndex(1); // Initialize next word
    setUsedWordIndices([0]);
    setLeftInput('');
    setRightInput('');
    setSharedProgress('');
    setTeamScore(0);
    setLeftAccuracy(0);
    setRightAccuracy(0);
    leftTotalTypedRef.current = 0;
    leftTotalCorrectRef.current = 0;
    rightTotalTypedRef.current = 0;
    rightTotalCorrectRef.current = 0;
    setLeftTotalTyped(0);
    setLeftTotalCorrect(0);
    setRightTotalTyped(0);
    setRightTotalCorrect(0);
    setLeftLetterCount(0);
    setRightLetterCount(0);
    setLeftDrinking(false);
    setRightDrinking(false);
    setLeftBeerFinished(false);
    setRightBeerFinished(false);
    setLeftBeerAnimating(false);
    setRightBeerAnimating(false);
    setLeftBeerClass('');
    setRightBeerClass('');
    setGameOver(false);
  };

  // Winner logic based on leftScore and rightScore
  const getCarrier = () => {
    if (leftScore > rightScore) return playerLeft.name;
    if (rightScore > leftScore) return playerRight?.name || '';
    return 'Tasapeli!';
  };

  // Function to get background image for player side based on team and position
  const getPlayerSideBackground = (isLeft) => {
    switch (selectedTeam.name) {
      case 'Ulkohuussin Hurrikaanit':
        return EemilJaJesseImage; // Same image for both sides
      case 'Muurahaismarssi':
        return isLeft ? JuusoImage : MiroImage; // Different images for each side
      case 'Laiturilössit':
        return SanttuJaEmskuImage; // Same image for both sides
      case 'Savusaunanselättäjät':
        return RoniMarkusImage; // Same image for both sides
      case 'Hirvenhörhöt':
        return KaitsuLassiMineaImage; // Same image for both sides
      default:
        return null;
    }
  };

  return (
    <div className="uusioperhe-game-container">
      <h2>Uusioperhe Type Racer</h2>
      <div className="team-select">
        <label>Valitse tiimi: </label>
        <select value={selectedTeam.name} onChange={e => {
          const team = teams.find(t => t.name === e.target.value);
          setSelectedTeam(team);
        }}>
          {teams.map(team => (
            <option key={team.name} value={team.name}>{team.name}</option>
          ))}
        </select>
      </div>
      <div className="players-row">
        <div 
          className="player-side left"
          style={{
            backgroundImage: `url(${getPlayerSideBackground(true)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <h3>{playerLeft?.name}</h3>
          <div>Vasen puoli: {leftKeys.join(', ')}</div>
          <div>Olut: {leftBeerFinished ? 'Olut juotu!' : leftDrinking ? 'Juomassa...' : 'Valmis kirjoittamaan'}</div>
          <div>Kirjoitettu: {leftInput}</div>
          <div>Vasemman kirjaimia: {leftTotalTyped} (oikein: {leftTotalCorrect})</div>
          <div>Vasemman näppäilyt: {leftLetterCount}</div>
          <div>Pisteet: {teamScore}</div>
          <div>Tarkkuus: {Math.round(leftAccuracy)}%</div>
          {leftBeerAnimating && (
            <div className={`beer-overlay ${leftBeerClass}`}>
              <img src={kurjalaImage} alt="Karjala beer" className="beer-image" />
            </div>
          )}
        </div>
        <div 
          className="player-side right"
          style={{
            backgroundImage: `url(${getPlayerSideBackground(false)})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <h3>{playerRight?.name}</h3>
          <div>Oikea puoli: {rightKeys.join(', ')}</div>
          <div>Olut: {rightBeerFinished ? 'Olut juotu!' : rightDrinking ? 'Juomassa...' : 'Valmis kirjoittamaan'}</div>
          <div>Kirjoitettu: {rightInput}</div>
          <div>Oikean kirjaimia: {rightTotalTyped} (oikein: {rightTotalCorrect})</div>
          <div>Oikean näppäilyt: {rightLetterCount}</div>
          <div>Pisteet: {teamScore}</div>
          <div>Tarkkuus: {Math.round(rightAccuracy)}%</div>
          {rightBeerAnimating && (
            <div className={`beer-overlay ${rightBeerClass}`}>
              <img src={kurjalaImage} alt="Karjala beer" className="beer-image" />
            </div>
          )}
        </div>
      </div>
      
      {/* Shared word display section */}
      <div className="shared-words-section">
        <h3>Kirjoitettava sana:</h3>
        <div className="words-display">
          {visibleWords.map((w, i) => (
            <div key={w + i} className={`word-item ${i === 0 ? 'current-word' : 'next-word'}`}>
              {i === 0 ? (
                // Show current word with letter-by-letter feedback based on shared progress
                <div className="word-letters">
                  {w.split('').map((letter, letterIndex) => {
                    let className = 'letter';
                    if (letterIndex < sharedProgress.length) {
                      // Letter has been typed - check if it's correct or incorrect
                      className += sharedProgress[letterIndex] === w[letterIndex] ? ' correct' : ' incorrect';
                    } else if (letterIndex === sharedProgress.length) {
                      // Current letter being typed
                      className += ' current';
                    }
                    return (
                      <span key={letterIndex} className={className}>
                        {letter}
                      </span>
                    );
                  })}
                </div>
              ) : (
                w
              )}
            </div>
          ))}
        </div>
        <div className="shared-input-display">
          <div>Yhteinen edistyminen: {sharedProgress}</div>
        </div>
      </div>
      
      <div className="game-controls">
        {!gameStarted && <button onClick={startGame}>Aloita peli</button>}
        {gameStarted && <div className="timer">Aikaa jäljellä: {Math.floor(timer/60)}:{String(timer%60).padStart(2, '0')}</div>}
        {gameOver && <div className="scoreboard">
          <h3>Peli ohi!</h3>
          <div>Kärrääjä: {getCarrier()}</div>
          <div>Tiimin pisteet: {teamScore}</div>
          {(!leftBeerFinished || !rightBeerFinished) && (
            <div style={{color: '#d14e4e', fontWeight: 'bold'}}>
              ⚠️ RANGAISTUS: -20% pisteistä koska olut jäi juomatta!
            </div>
          )}
          <div>Vasemman olut: {leftBeerFinished ? '✅ Juotu' : '❌ Kesken'}</div>
          <div>Oikean olut: {rightBeerFinished ? '✅ Juotu' : '❌ Kesken'}</div>
          <div>Vasemman tarkkuus: {Math.round(leftAccuracy)}%, kirjaimia: {leftTotalTyped}, oikein: {leftTotalCorrect}</div>
          <div>Oikean tarkkuus: {Math.round(rightAccuracy)}%, kirjaimia: {rightTotalTyped}, oikein: {rightTotalCorrect}</div>
        </div>}
      </div>
      <div className="instructions">
        <h4>Ohjeet</h4>
        <ul>
          <li>Peli kestää 2 minuuttia. Tavoitteena on kirjoittaa mahdollisimman monta sanaa yhdessä.</li>
          <li>Kumpikin pelaaja voi käyttää kaikkia näppäimiä.</li>
          <li>Vasen pelaaja: kun juo olutta (painaa 1), näppäimet {leftRestrictedKeys.join(', ')} eivät toimi. Paina 1 uudelleen lopettaaksesi juomisen.</li>
          <li>Vasen pelaaja: kun olut on juotu loppuun, paina 2.</li>
          <li>Oikea pelaaja: kun juo olutta (painaa 0), näppäimet {rightRestrictedKeys.join(', ')} eivät toimi. Paina 0 uudelleen lopettaaksesi juomisen.</li>
          <li>Oikea pelaaja: kun olut on juotu loppuun, paina 9.</li>
          <li>VAROITUS: Jos et juo oluttasi loppuun 2 minuutin aikana, tiimi menettää 20% pisteistä!</li>
          <li>Kirjoita annettu sana mahdollisimman nopeasti ja tarkasti!</li>
        </ul>
      </div>
    </div>
  );
};

export default UusioperheGame;
