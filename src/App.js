import './App.css';
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Homepage from './Components/Homepage/Homepage';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async () => {
      try {
        const apiCall = await axios.get(`https://randomuser.me/api/?results=1500&inc=name,email,dob,picture&seed=abc`)
        const apiData = apiCall.data
        setUserData(apiData)
        setLoading(false)
        console.log("fetchData function Called");
      } catch (err) {
        console.log(err);
      }
    }, []
  )
  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="App">
      <Homepage userData={userData} isLoading={loading} />
    </div>
  );
}

export default App;
