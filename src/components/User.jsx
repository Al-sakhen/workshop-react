import React from 'react'

export default function User() {
return (
    <>
        <div>
            <div className="container text-center py-5 my-5 text-center">
                <div className="card py-5 mb-5">
                    <a href data-toggle="modal" data-target="#profile">
                        <img src="img/avatar.png" className="avatar " alt='' />
                    </a>
                    <h3 className="py-2">Ahmed Abd Al-Muti</h3>
                    <div className="container w-50 m-auto">
                        <form action method="post">
                        <textarea className="form-control" name id cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} />
                        <button className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
                        </form>
                    </div>
                </div>
                <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
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
        </div>

    </>
  )
}
