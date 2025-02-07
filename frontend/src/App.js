
import { Button } from '@mui/material';
import './App.css';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import axios from 'axios';

function  App() {


  const[url,seturl]=useState();
  const[shortUrl,setshortUrl] = useState()
;
  const submitUrl = async (e)=>{
    e.preventDefault();
const data=await axios.post("http://localhost:3000/api/short",{"originalUrl":url})
console.log(data.data.url.shortUrl);
setshortUrl("http://localhost:3000/"+data.data.url.shortUrl)
  }
  return (
    <div className="App">
      <form onSubmit={submitUrl} >
       
      <TextField
          onChange = {(e)=>seturl(e.target.value)}
          id="standard-textarea"
          label="Enter Original URL"
          placeholder="URL"
          multiline
          variant="standard"
        />
        <Button type='submit' variant="contained">Submit</Button>

      {shortUrl && 
      <h3>Your short URL = {shortUrl}</h3>
      }

        
        </form>
    </div>
  );
}

export default App;
