import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CoderType.css';

// Static leaderboard data
const initialLeaderboard = {
  javascript: [],
  python: [], 
  java: []
};

const codeSnippets = {
  javascript: [
    `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    `const quickSort = arr => {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = arr.filter((x, i) => x <= pivot && i !== 0);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`
  ],
  python: [
    `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[0]
    left = [x for i, x in enumerate(arr) if x <= pivot and i != 0]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
    `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None`
  ],
  java: [
    `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
    `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`
  ]
};

const API_URL = 'https://codertype-backend.onrender.com';  // Your Render URL

const CoderType = () => {
  const [currentSnippet, setCurrentSnippet] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [stats, setStats] = useState({
    accuracy: 0,
    wpm: 0,
    cpm: 0,
    lpm: 0
  });
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [playerName, setPlayerName] = useState('');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const textareaRef = useRef(null);

  useEffect(() => {
    // Replace the direct database connection with a fetch call
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${API_URL}/api/leaderboard`);
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      }
    };
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (isGameActive && hasStartedTyping && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isGameActive) {
      endGame();
    }
  }, [timeLeft, isGameActive, hasStartedTyping]);

  const startGame = (language) => {
    setSelectedLanguage(language);
    const snippetsForLanguage = codeSnippets[language];
    const randomSnippet = snippetsForLanguage[Math.floor(Math.random() * snippetsForLanguage.length)];
    setCurrentSnippet(randomSnippet);
    setUserInput('');
    setTimeLeft(30);
    setIsGameActive(true);
    setGameFinished(false);
    setHasStartedTyping(false);
    setShowLeaderboard(false);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 0);
  };

  const addToLeaderboard = async () => {
    if (!playerName.trim()) {
      alert('Please enter your name');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/leaderboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName,
          language: selectedLanguage,
          stats: stats,
          date: new Date()
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Error updating leaderboard');
        return;
      }

      const updatedLeaderboard = await response.json();
      setLeaderboard(updatedLeaderboard);
      setShowLeaderboard(true);
    } catch (error) {
      console.error('Error adding to leaderboard:', error);
      alert('Error saving to leaderboard');
    }
  };

  const endGame = () => {
    setIsGameActive(false);
    setGameFinished(true);

    const correctChars = [...userInput].filter((char, i) => char === currentSnippet[i]).length;
    const accuracy = Math.round((correctChars / currentSnippet.length) * 100);
    const totalWords = userInput.trim().split(/\s+/).length;
    const wpm = Math.round((totalWords / 30) * 60);
    const cpm = Math.round((userInput.length / 30) * 60);
    const lines = userInput.split('\n').length;
    const lpm = Math.round((lines / 30) * 60);

    setStats({
      accuracy,
      wpm,
      cpm,
      lpm
    });
  };

  const handleInput = (e) => {
    if (isGameActive) {
      if (!hasStartedTyping && e.target.value.length > 0) {
        setHasStartedTyping(true);
      }
      
      let value = e.target.value;
      
      if (e.nativeEvent.inputType === "insertLineBreak") {
        const lines = currentSnippet.split('\n');
        const currentLineIndex = value.slice(0, e.target.selectionStart).split('\n').length - 1;
        
        if (currentLineIndex < lines.length) {
          const nextLine = lines[currentLineIndex];
          const indentMatch = nextLine.match(/^\s+/);
          if (indentMatch) {
            const pos = e.target.selectionStart;
            value = value.slice(0, pos) + indentMatch[0] + value.slice(pos);
          }
        }
      }
      
      setUserInput(value);
    }
  };

  const deleteUser = async (name, language) => {
    if (!isAdmin) return;
    
    if (!window.confirm(`Are you sure you want to delete ${name} from the ${language} leaderboard?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/leaderboard/user`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name, language })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedLeaderboard = await response.json();
      setLeaderboard(updatedLeaderboard);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  const clearLeaderboard = async () => {
    if (!isAdmin) return;
    
    if (!window.confirm('Are you sure you want to clear the entire leaderboard? This cannot be undone!')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/leaderboard/all`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const emptyLeaderboard = await response.json();
        setLeaderboard(emptyLeaderboard);
      } else {
        alert('Error clearing leaderboard');
      }
    } catch (error) {
      console.error('Error clearing leaderboard:', error);
      alert('Error clearing leaderboard');
    }
  };

  const toggleAdmin = () => {
    const password = prompt('Enter admin password:');
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAdmin(!isAdmin);
    }
  };

  return (
    <motion.div 
      className="codertype-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>CoderType</h1>
      
      {!isGameActive && !gameFinished && (
        <div className="start-screen">
          <h2>Test your coding speed!</h2>
          <p>Select a language and type the code snippet. Timer starts on first keystroke.</p>
          <div className="language-buttons" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '1rem 0' }}>
            <button 
              onClick={() => startGame('javascript')}
              style={{ padding: '1rem 2rem' }}
            >
              JavaScript
            </button>
            <button 
              onClick={() => startGame('python')}
              style={{ padding: '1rem 2rem' }}
            >
              Python
            </button>
            <button 
              onClick={() => startGame('java')}
              style={{ padding: '1rem 2rem' }}
            >
              Java
            </button>
          </div>
        </div>
      )}

      {isGameActive && (
        <div className="game-screen">
          <div className="timer">
            {hasStartedTyping ? `Time left: ${timeLeft}s` : 'Timer will start on first keystroke'}
          </div>
          <div className="code-display">
            <pre>{currentSnippet}</pre>
          </div>
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={handleInput}
            placeholder="Start typing here..."
            spellCheck="false"
          />
        </div>
      )}

      {gameFinished && !showLeaderboard && (
        <div className="results-screen">
          <h2>Results</h2>
          <div className="stats">
            <div className="stat-item">
              <span>Accuracy:</span> {stats.accuracy}%
            </div>
            <div className="stat-item">
              <span>Words per minute:</span> {stats.wpm}
            </div>
            <div className="stat-item">
              <span>Characters per minute:</span> {stats.cpm}
            </div>
            <div className="stat-item">
              <span>Lines per minute:</span> {stats.lpm}
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              style={{ marginRight: '1rem', padding: '0.5rem' }}
            />
            <button onClick={addToLeaderboard}>Add to Leaderboard</button>
          </div>
          <button onClick={() => startGame(selectedLanguage)} style={{ marginTop: '1rem' }}>Try Again</button>
        </div>
      )}

      {showLeaderboard && (
        <div className="leaderboard">
          <h2>{selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Leaderboard</h2>
          
          <div style={{ marginBottom: '1rem' }}>
            <button 
              onClick={toggleAdmin}
              style={{ 
                fontSize: '8px',
                padding: '2px 4px',
                opacity: 0.5,
                marginBottom: '-20px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'default'
              }}
            >
              {isAdmin ? '.' : '.'}
            </button>
            {isAdmin && (
              <button 
                onClick={clearLeaderboard}
                style={{ marginLeft: '1rem', backgroundColor: '#ff4444' }}
              >
                Clear All Entries
              </button>
            )}
          </div>

          <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
            <thead style={{ textAlign: 'left' }}>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>WPM</th>
                <th>Accuracy</th>
                <th>Date</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {leaderboard[selectedLanguage].map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.wpm}</td>
                  <td>{entry.accuracy}%</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  {isAdmin && (
                    <td>
                      <button 
                        onClick={() => deleteUser(entry.name, selectedLanguage)}
                        style={{ backgroundColor: '#ff4444' }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => startGame(selectedLanguage)} style={{ marginTop: '2rem' }}>
            Try Again
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default CoderType;
