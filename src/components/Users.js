

const Users = ({data,key})=> {

    return (
        <>
        <div id={key} style={{display:"flex", justifyContent:"space-between", border:"1px solid grey", margin:"15px", padding:"20px"}}>
            <div>Name: {data.name}</div>
            <div>Posts: {data.posts.length}</div>
        </div>
        </>
    )

}

export default Users;