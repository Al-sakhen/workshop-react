import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Alluser() {
    const[posts, setPosts] = useState([]);
    const [filterVal,setfilterVal]=useState('');
    const [searchApiData,setSearchApiData]=useState([]);

    let navigate =useNavigate();

    function goToSendmsg(id){
        navigate({
            pathname:'/sendmessage',
            search:`?id=${id}`,
        }) 
    }
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/auth/allusers")
        .then(res =>{
            setPosts(res.data.users) ;
            setSearchApiData(res.data.users)
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    const arr = Object.entries(posts).map((post,index)=>{
        return(
            <tr key={index}>
                <td>{index++}</td>
                <td>{post[1].userName}</td>
                <td>{post[1].gender}</td>
                <td>{post[1].email}</td> 
                <td><button type="button" className="btn btn-info" onClick={ ()=> goToSendmsg(post[1]._id)} >Send messages</button></td>
            </tr>
        )
    }) 
 
    const handelFilter=(e)=>{
        
        if(e.target.value == ''){
            setPosts(searchApiData)
        }else{
           const filterResult= searchApiData.filter(item=>item.userName.toLowerCase().includes(e.target.value.toLowerCase()))
           setPosts(filterResult)
        }
        setfilterVal(e.target.value)
    }
    return (
       
       <div className='container'>
<input className="form-control mt-5" onInput={(e)=>handelFilter(e)} placeholder="Search" aria-label="Search" value={filterVal} />

            <table className="table table-striped table-hover mt-5">
                <thead>
                    <tr className='table-success'>
                        <th>#</th>
                        <td>User Name</td>
                        <td>gender</td>
                        <td>email</td> 
                        <td></td>                
                    </tr>
                </thead>
                <tbody>
                    {arr} 
                </tbody>
            </table>
        </div>
    )
}
