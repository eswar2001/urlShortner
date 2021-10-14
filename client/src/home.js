import React, { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export const Home = () => {
    const [data, setdata] = useState(null);
    const [longUrl, setLongUrl] = useState("");
    const handleClick = () => {

        axios.post('http://localhost:8000/create', { longUrl }).then((res) => {
            console.log(res.data);
            navigator.clipboard.writeText(`http://localhost:8000/${res.data.shortUrl}`);
            setdata(res.data);
            toast.success("Short url copied to clipboard", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch((e) => {
            console.error(e);
        });

    }
    const handleDelete = () => {

        axios.post('http://localhost:8000/delete', { 'shortUrl': data.shortUrl }).then((res) => {
            toast.success("Short url deleted", {
                position: toast.POSITION.TOP_RIGHT
            });
        }).catch((e) => {
            console.error(e);
        });

    }
    if (data != null) {
        return <>
            <div className="container-fluid" style={{
                marginTop: '40vh',
                padding: '20px',
            }}>
                <center>
                    <code> <pre className="h4" >{`http://localhost:8000/${data.shortUrl}`}</pre></code>
                    <form className="row" style={{
                        width: '30vw',
                        padding: '10px',
                        alignContent: 'space-evenly'
                    }}>
                        <button onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                            setdata(null);
                            setLongUrl("");
                        }} type="button" className="col btn btn-primary">Delete</button>
                        <div className="col"> </div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            setdata(null);
                            setLongUrl("");
                        }} type="button" className="col btn btn-primary">Generate again</button>

                    </form>
                </center>
            </div>
            <ToastContainer />

        </>
    }
    return <>
        <div className="container-fluid" style={{
            marginTop: '40vh',
            padding: '20px'
        }}>

            <center>
                <form style={{
                    width: '50vw',
                    padding: '10px'
                }}>
                    <label htmlFor="basic-url" className="form-label">Your URL</label>
                    <div className="input-group mb-3">
                        <input type="text" value={longUrl} onChange={(e) => {
                            setLongUrl(e.target.value);
                        }} className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                    }} type="button" className="btn btn-primary">Generate</button>
                </form>
            </center>

        </div>
        <ToastContainer />
    </>;
}
