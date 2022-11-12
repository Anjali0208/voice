import React, { useState, useEffect } from 'react'
import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true           //lets the device listen for a single word 
mic.interimResults = true       //the user will only get their results once they are done speaking
mic.lang = 'en-US'              //ets the language property to English 

function App() {

  // useState Hook
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()             // to start the speech recognition
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
      // const word = event.results[0][0].transcript
      // setNote(word)
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  // const getBotResponse = () => {
  // }


  return (
    <>
      <div className='app' style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://images.unsplash.com/photo-1530811761207-8d9d22f0a141?ixlib=rb-4.0.3&dl=jason-leung-mZNRsYE9Qi4-unsplash.jpg&q=80&fm=jpg&crop=entropy&cs=tinysrgb")`,
        backgroundPosition: "center center"
      }}>
        <h1 className='voice'>Voice Notes</h1>
        <div className="">
          <div className="box">
            <h2>Current Note</h2>
            {isListening ? <span>🎙️</span> : <span>🛑 </span>}
            <button onClick={() => setIsListening(prevState => !prevState)}>
              Start/Stop
            </button>
            <button onClick={handleSaveNote} disabled={!note}>
              Save Note
            </button>
            <p>{note}</p>
          </div>
          <div className="box">
            <h2>Notes</h2>
            {savedNotes.map(n => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App