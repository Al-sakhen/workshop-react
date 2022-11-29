import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import toastr from 'toastr';

export default function SendMessages() {
    let [searshParam,setsearshParam] = useSearchParams();
    let [userDetails,setuserDetails] = useState([]);
    let currentId = searshParam.get('id');
    let [msg,setMsg] = useState({
        text: '',
    });

    async function getUserDetails(){
        let {data} = await axios.get('http://localhost:3000/api/v1/auth/allusers');
        let user = data.users.filter( data => data._id === currentId);
        setuserDetails(user);  
    }

    let formData = async(e)=>{
        e.preventDefault();
        let {data} = await axios.post(`http://localhost:3000/api/v1/message/${currentId}`,msg);
        
        // Toastr Notifications
        if(data.message === "Dnoe "){
            toastr.success('Message sent successfully');
        }else{
            toastr.success('Something went wrong, try again later!');
        }
    }

    let msgtext = (e)=>{
        let Mymsg = {...msg};
        Mymsg[e.target.name] = e.target.value;
        setMsg(Mymsg);
    }

    useEffect( ()=>{
        getUserDetails();
    },[]);
    return (
        <>
            <div>
                <div className="container text-center py-5 my-5 ">
                    <div className="card py-5 mb-5">
                        <Link to="" data-toggle="modal" data-target="#profile">
                            <img src="img/avatar.png" className="avatar " alt='' />
                        </Link>
                        
                        <h3 className="py-2 text-uppercase">To {userDetails[0]?.userName}</h3>
                        <div className="container w-50 m-auto">
                            <form  onSubmit = {formData}>
                                <textarea onChange={msgtext}  name='text'  className="form-control"  cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"   defaultValue={""} />
                                <button type="submit" className="btn btn-outline-info mt-3"><i className="far fa-paper-plane"></i> Send</button>
                            </form>
                        </div>
                    </div>
                    <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
                </div>
                {/* Share profile Modal */}
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
            </div>
        </>
    )
}
