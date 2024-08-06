import './App.css';
import { useState } from 'react';
import Popup from './Components.js/Popup';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  return (
   <>
   <button className='btn' onClick={()=>setShowPopup(true)}>Save Segment</button>

   {showPopup && <Popup onClose={() => setShowPopup(false)} />}
   </>
  );
}

export default App;
