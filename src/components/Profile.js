import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./Profile.css";

const Profile = ({data}) =>{
    

    const [countries, setCountries] = useState([]);
    const [timezone, setTimezone] = useState("Africa/Abidjan");
    const [clock, setClock] = useState();
    const [isRunning, setIsRunning]= useState(true);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    
    const fetchCountries =()=>{
        fetch("https://worldtimeapi.org/api/timezone")
          .then(res=> res.json())
          .then(data=> setCountries(data))
          .catch(err=>console.log(err))
    }

    const fetchCurrentTime = ()=>{
        fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
          .then(res=>res.json())
          .then(data=> setClock(data))
          .catch(err=>console.log(err))
          
    }

    useEffect(()=>{
      fetchCountries();
      fetchCurrentTime();
    },[timezone])

    useEffect(()=>{
        if(isRunning){
           
            var interval = setInterval(()=>{

                if(seconds===59){
                    setSeconds(0);
                    setMinutes(m=> m+1);
                }
                else{
                    setSeconds((s)=>s+1);
                }
                if(minutes===59 && seconds ===59){
                    setMinutes(0);
                    setHours(h=>h+1);
                }
 

            },[1000])

        }
        return ()=> clearInterval(interval);

    },[isRunning,seconds,minutes])
    

    const currentClock = ()=>{
        let s= clock?.datetime.split("T")[1].split(".")[0].split(":")[2]-0;
        let m=clock?.datetime.split("T")[1].split(".")[0].split(":")[1]-0;
        let h=clock?.datetime.split("T")[1].split(".")[0].split(":")[0]-0;
        setSeconds(s);
        setMinutes(m);
        setHours(h);
    }

    useEffect(()=>{
        currentClock();
    },[clock])


    return (
        <>
        <div className="clockHeader" >
            <Link to="/">
               <button >Back</button>
            </Link>
            
            <div className="clockHeader">
                <label>Country Dropdown:
                  <select onChange={(e)=>setTimezone(e.target.value)}>
                      {countries?.map((item)=>{
                          return(
                              <>
                              <option value={item}>{item}</option>
                              </>
                          )
                      })}

                  </select>
                </label>
                <div>{`${hours <=9 ? "0"+ hours: hours}:${minutes <=9 ? "0"+ minutes: minutes}:${seconds <=9 ? "0"+seconds: seconds}`}</div>
                <div>
                  <button onClick={()=>setIsRunning(!isRunning)}>{isRunning ? "Pause": "Start"}</button>
                </div>
                
            </div>
        </div>
        <div style={{ textAlign:"center", margin: "20px"}}>Profile Page</div>
        <div style={{border:"1px solid grey", margin:"25px", padding:"20px"}}>
          <div className="profileHeader"  >
            <div><b>Name:</b> {data.name}</div>
            <div><b>Address:</b>{data.address.street},{data.address.city}</div>
          </div>
          <div className="profileHeader" >
              <div><b>Username:</b> {data.username}</div>
              <div><b>Email:</b>{data.email}</div>
          </div>
        </div>
        <div style={{display:"flex", flexWrap:"wrap"}} >
            {data.posts.map((item)=>{
                return (
                    <>
                    <div className="postContainer" >
                       <div><b>Post Title:</b></div>
                       <div style={{marginBottom:"10px"}}>{item.title}</div>
                       <div><b>Content:</b></div>
                       <div>{item.body}</div>
                    </div>
                    </>
                )
            })}
        </div>

        </>
    )
}

export default Profile;