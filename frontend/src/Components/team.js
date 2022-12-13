import React from 'react';
import './team.css'
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Team = ({data}) => {

  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [sel,setSel] = useState(false)
  const [tid,setTid] = useState(-1)
  const [c,setc] = useState(0)


  const location = useLocation();
  console.log(location)

  if (location.state) {
    var user = location.state
    console.log(user)
  } else {
    return (
      <h1>Invalid User. Please log back in.</h1>
    )
  }

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    let newFilter = [];
    
    newFilter = data.filter((value) => {
        let name = value.full_name;
        return name.toLowerCase().includes(searchWord.toLowerCase());
    });

    console.log(newFilter)
    
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    setSel(false);
  };

  const handle = (id) => {
    setSel(true)
    setTid(id)
    let count = 0
    user.teams.forEach(function(item) {
      if (item === id) {
        count += 1
      }
    })

    if (count === 0) {
      setc(0)
    } else {
      setc(1)
    }

  }

  const addhandle = (e) => {
    e.preventDefault()

    axios.put('http://localhost:4000/api/teams',{ 
      "uname" : user.u_name, "pass": user.pass, "tid": tid
    })
    .then((response) => {
      if (response.status === 200) {
        var p = {state : response.data.data}
        navigate('/home', p)
      }
      
    }, (error) => {
      console.log(error);
    });
  }

  const remhandle = (e) => {
    e.preventDefault()
    console.log(user.u_name,user.pass,tid)

    axios.delete('http://localhost:4000/api/teams/',{ params:{
      "uname" : user.u_name, "pass": user.pass, "tid": tid}
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response.statusText)
        var p = {state : response.data.data}
        navigate('/home', p)
      }
      
    }, (error) => {
      console.log(error);
    });
  }

  return(
    <div>
      <nav className="navbar">
          <Link to="/home" className="site-title" state={user}> SPORTS NOW </Link>
          <ul>
              <Link to="/teams" state={user}>Teams</Link>
              <Link to="/userpage" state={user}> 
                  <div class="circle">
                      <p class="text">User</p>
                  </div>
              </Link>
          </ul>
      </nav>
      <div className='search'>
      <div className="searchInputs">
        <input
          type="text"
          placeholder='Search Team'
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {wordEntered.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>


      <div className="dataResult">
          {filteredData.sort().slice(0, 10).map((value, key) => {
            
            return (
              
                <div className='dataItem'><button onClick={() => handle(value.id)}><p id="listitem">{value.full_name.toUpperCase()} </p></button></div>
              
            );
          })}
      </div>
      </div>
      {(sel === true) ? (<div className='but'>
        {(c === 0) ?
        (<button onClick={(e) => addhandle(e)}>Add</button>) :
        (<button onClick={(e) => remhandle(e)}>Remove</button>)}
      </div>) : <></> }

    </div>
  )
}

export default Team
