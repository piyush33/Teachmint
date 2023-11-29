import { Routes, Route} from 'react-router-dom';
import Directory from './Directory';
import Profile from './Profile';


const Paths= ({data})=>{

    return (
        <>
        <Routes>
           <Route path="/" element={<Directory users={data} />} />
           {data.map((item)=>{
               return(
                   <>
                   { <Route path={`/${item.id}`} element={<Profile data={item} />} />}
                   </>
               )
           })}
        </Routes>
        </>
    )
}

export default Paths;