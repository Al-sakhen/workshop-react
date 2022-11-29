import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toastr from 'toastr';


export default function Messages({loginData}) {
    let token = localStorage.getItem('token');
    let [userDetails,setuserDetails] = useState([]);
    let [messageList , setMessageList] = useState([]);

    async function deleteMessage(id){
        await axios.delete(`http://localhost:3000/api/v1/message/${id}`, {headers:{'authorization': `tariq__${token}`}})
        .then( (res)=> {
            let{data} = res;
            if(data.message === 'success'){
                toastr.info('Message deleted successfully');
                getAllMessages()
            }
        })
    }


    const arr = Object.entries(messageList).map((message,index)=>{
        var dateObj = new Date(message[1].createdAt);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        let newdate = year + "/" + month + "/" + day;
        return(
            <tr key={index}>
                <td>{index++}</td>
                <td>{message[1].text}</td>
                <td>{newdate}</td> 
                <td><button className='btn btn-danger btn-sm' onClick={() => deleteMessage(message[1]._id)}>Delete</button></td>
            </tr>
        )
    })  

    async function getAllMessages(){
        await axios.get("http://localhost:3000/api/v1/message/", {headers:{'authorization': `tariq__${token}`}})
        .then(res =>{
            let {data} = res
            setMessageList(data.messageList)
        })
        .catch(err=>{
            console.log(err);
        })
    }



    useEffect( ()=>{
        async function getUserDetails(){
            let {data} = await axios.get('http://localhost:3000/api/v1/auth/allusers');
            let user = data.users.filter( data => data._id === loginData.id);
            setuserDetails(user);  
        }
        getUserDetails();

        getAllMessages()
    }, []);

    return (
    <>
        <div>
            <div className="container text-center py-5 my-5 text-center">
                <div className="card pt-5">
                    <a data-toggle="modal" data-target="#profile" href='#'>
                        <img src="img/avatar.png" className="avatar " alt='profile pic'/>
                    </a>
                    <h3 className="py-2">{userDetails[0]?.userName}</h3>
                    <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
                </div>
            </div>
            {/* profile photo Modal */}
            <div className="modal fade" id="profile" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Change photo</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                        <form method="post">
                            <label  className="text-muted">The file size of the photo should not exceed 7 MB</label>
                            <input className="form-control" type="file" name="photo"  />
                        </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-info">Upload</button>
                        <button type="button" className="btn btn-outline-danger">Remove Photo</button>
                    </div>
                    </div>
                </div>
            </div>
            {/*  Share profile Modal */}
            <div className="modal fade" id="share" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Share Profile</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>host/messages/id</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* /modal */}
            {/* =================messages=================== */}
            <div className="container text-center my-5 text-center">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card py-5">
                            {messageList.length < 1 ?
                                <>
                                    <p>You don't have any messages... </p>
                                </>
                                :
                                <>
                                <table className="table table-striped table-hover mt-5">
                                    <thead >
                                        <tr className='table-black'>
                                            <th>#</th>
                                            <td>SendMessages</td>
                                            <td>Sent At</td>
                                            <td>Delete</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {arr}
                                    </tbody>
                                </table>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
