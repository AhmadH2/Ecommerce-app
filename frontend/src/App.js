
import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';


function App() {

  
  const [fashionList, setFashionList] = useState([]);

  const url = 'http://localhost:9000/';

  useEffect(() => {
    axios.get(url).then((response) => {
      setFashionList(response.data);
    });
  }, [setFashionList]);


  return (
    <div className='App'>
      {fashionList.map((fash)=> {
        return <div key={fash.id} style={{width: 200}}>
          <img src={fash.image}/>
          <h4>{fash.productName}</h4>
        </div>
      })}
    </div>
  );
}

export default App;
