import {useEffect, useState} from "react";
import Paths from './components/Routes';
import Directory from './components/Directory';

function App() {
  const[users, setUsers] = useState([]);
  const[posts, setPosts] = useState ([]);

  const fetchUsers = () =>{
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res=> res.json())
        .then (data=> setUsers(data))
        
  }

  const fetchPosts = ()=>{
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res=>res.json())
        .then(data=> setPosts(data))
  }

  for(let i=0; i<users.length; i++){
      users[i].posts=posts.slice(i,2*i+10);
  }

  useEffect(()=>{
      fetchUsers();
      fetchPosts();  
  },[]);


  
  return (
    <div className="App">
      <Paths data={users}/>
    </div>
  );
}

export default App;
