import {useEffect, useState} from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Users from "./Users";
import Profile from "./Profile";

const Directory = ({users}) =>{



    return (
        <>
        <div style={{ textAlign:"center"}}><b>Directory</b></div>
        {users.map((item)=>{
            return (
             <>
               <div style={{display:"block"}}>
                 <Link to={`/${item.id}`}>
                   <Users data={item} />
                 </Link>
               </div>   
             </>
            )
        })}
        </>
    )
}

export default Directory;