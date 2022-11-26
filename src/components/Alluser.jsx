import React,{useState,useEffect} from 'react'
import axios from 'axios';
export default function Alluser() {
const[posts, setPosts] = useState([])
useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/auth/allusers")
    .then(res =>{
        setPosts(res.data.users)  
    })
    .catch(err=>{
        console.log(err);
    })
},[])

const arr = Object.entries(posts).map((post,index)=>{
    console.log(post[3])
    return(
        <tr>
            <td>{index++}</td>
            <td>{post[1].userName}</td>
            <td>{post[1].gender}</td>
            <td>{post[1].email}</td> 
            <td><button type="button" class="btn btn-info">Send messages</button></td>
        </tr>
        
    )
  
})

  return (
    <div className='container'>
        <table class="table table-striped table-hover mt-5">
            <tr className='table-success'>
                 <th>#</th>
                 <td>User Name</td>
                 <td>gender</td>
                 <td>email</td> 
                 <td></td>                
            </tr>
            {arr}
        </table>
    </div>
  )
}
