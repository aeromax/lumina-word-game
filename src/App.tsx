import { useState } from 'react'
import './App.css'
import { GRAPH, LEVELS } from './data'
import type { Level, Node } from './data'
import { Sparkles, Share2, ArrowRight, RotateCcw, Menu } from 'lucide-react'

type GameState = 'MENU' | 'PLAYING' | 'WON'

function App() {
  const [gameState, setGameState] = useState<GameState>('MENU')
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [currentNode, setCurrentNode] = useState<Node | null>(null)
  const [path, setPath] = useState<string[]>([])
  
  // Initialize game
  const startGame = (level: Level) => {
    setCurrentLevel(level)
    const startNode = GRAPH[level.start]
    if (!startNode) {
      console.error(`Start node ${level.start} not found`)
      return
    }
    setCurrentNode(startNode)
    setPath([level.start])
    setGameState('PLAYING')
  }

  // Handle move
  const handleMove = (neighborId: string) => {
    if (!GRAPH[neighborId]) return
    
    // Check if valid neighbor
    if (!currentNode?.neighbors.includes(neighborId)) return

    const newNode = GRAPH[neighborId]
    setCurrentNode(newNode)
    
    const newPath = [...path, neighborId]
    setPath(newPath)
    
    // Check win condition
    if (neighborId === currentLevel?.end) {
      setGameState('WON')
    }
  }

  const handleShare = async () => {
    if (!currentLevel) return
    
    const text = `Lumina Level ${currentLevel.id}: ${currentLevel.start.toUpperCase()} → ${currentLevel.end.toUpperCase()}\nSolved in ${path.length - 1} steps (Par: ${currentLevel.par}).\n\nPlay: https://lumina-word-game.vercel.app` // Placeholder URL
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lumina Word Game',
          text: text,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      await navigator.clipboard.writeText(text)
      alert('Result copied to clipboard!')
    }
  }

  const resetGame = () => {
    setGameState('MENU')
    setCurrentLevel(null)
    setCurrentNode(null)
    setPath([])
  }

  // Component: Menu
  if (gameState === 'MENU') {
    return (
      <div className="game-container">
        <h1 className="title">Lumina <Sparkles className="inline-icon" size={32} color="#ffd700" /></h1>
        <p className="subtitle">Start at the first word and reach the target by moving through related concepts. Find the shortest path you can, and try to beat par.</p>
        
        <div className="glass-panel" style={{ width: '100%', maxWidth: '500px' }}>
          {LEVELS.map(level => (
            <button 
              key={level.id}
              className="word-option"
              onClick={() => startGame(level)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>
                <span style={{opacity: 0.5, marginRight: '10px'}}>{level.id}.</span> 
                {GRAPH[level.start].word} <ArrowRight size={14} style={{margin: '0 5px'}}/> {GRAPH[level.end].word}
              </span>
              <span className="level-badge">Par {level.par}</span>
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: '2rem', opacity: 0.5, fontSize: '0.8rem' }}>
          <p>Choose a level to begin.</p>
        </div>
      </div>
    )
  }

  // Component: Won
  if (gameState === 'WON' && currentLevel) {
    const moves = path.length - 1
    
    return (
      <div className="game-container animate-enter">
        <Sparkles size={48} color="#ffd700" style={{ marginBottom: '1rem' }} />
        <h1 className="title">Epiphany</h1>
        <p className="subtitle">You have bridged the gap.</p>
        
        <div className="glass-panel">
          <div className="target-display">
            <div className="target-item">
              <span className="target-label">Start</span>
              <span className="target-word">{GRAPH[currentLevel.start].word}</span>
            </div>
            <div className="path-connector"></div>
            <div className="target-item">
              <span className="target-label">End</span>
              <span className="target-word">{GRAPH[currentLevel.end].word}</span>
            </div>
          </div>

          <div style={{ margin: '2rem 0', textAlign: 'left' }}>
            <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>Your Path ({moves} steps)</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {path.map((nodeId, idx) => (
                <span key={idx} style={{ display: 'flex', alignItems: 'center', color: '#ddd' }}>
                  {GRAPH[nodeId].word}
                  {idx < path.length - 1 && <ArrowRight size={14} style={{ margin: '0 0.5rem', color: '#666' }} />}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleShare} className="share-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Share2 size={18} /> Share
            </button>
            <button onClick={resetGame} style={{ padding: '1rem', background: 'rgba(255,255,255,0.1)' }}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Component: Playing
  if (!currentNode || !currentLevel) return null

  return (
    <div className="game-container animate-enter">
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
        <button onClick={resetGame} style={{ background: 'transparent', padding: '0.5rem' }}>
          <RotateCcw size={20} color="#666" />
        </button>
      </div>

      <div className="glass-panel">
        {/* Header: Target Info */}
        <div className="target-display">
          <div className="target-item" style={{ opacity: 0.5 }}>
            <span className="target-label">Start</span>
            <span className="target-word" style={{ fontSize: '1rem' }}>{GRAPH[currentLevel.start].word}</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#666' }}>Moves</span>
            <span style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>{path.length - 1} <span style={{fontSize: '0.8rem', color: '#444'}}>/ {currentLevel.par}</span></span>
          </div>

          <div className="target-item">
            <span className="target-label" style={{ color: '#ffd700' }}>Target</span>
            <span className="target-word" style={{ color: '#ffd700', fontSize: '1.2rem' }}>{GRAPH[currentLevel.end].word}</span>
          </div>
        </div>

        {/* Current Node */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 className="title" style={{ fontSize: '2.5rem', color: '#fff' }}>{currentNode.word}</h2>
          <p style={{ color: '#aaa', fontStyle: 'italic', maxWidth: '400px', margin: '0 auto' }}>
            "{currentNode.definition}"
          </p>
        </div>

        {/* Neighbors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {currentNode.neighbors.map(neighborId => {
            const neighbor = GRAPH[neighborId]
            if (!neighbor) return null // Safety check
            return (
              <button 
                key={neighborId}
                className="word-option"
                onClick={() => handleMove(neighborId)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{neighbor.word}</span>
                  {/* Hint: Could show distance or type of link, but keeping it obscure is more 'high brow' */}
                  <ArrowRight size={16} style={{ opacity: 0.3 }} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App
