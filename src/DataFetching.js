import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import images from "./assets/img";
import './assets/css/style.css';
import './assets/fontawesomepro/css/all.min.css';

function DataFetching(){
    const[user,setUser] = useState([]);
    const[loading,setLoading] = useState(false);

    const dataRef = useRef(true)
    useEffect(()=>{
        if(dataRef.current){
            dataRef.current = false;
            setLoading(true)
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                console.log(res.data)
                setUser(res.data);
                setLoading(false);
            })
            .catch(error => {
                setUser([]);
                setLoading(false);
            })
        }
      
    },[])

    let value;
    const handleChange = e => {
        e.preventDefault()
        value = e.target.value  

        if(value){
            axios.get(`https://jsonplaceholder.typicode.com/users/?id=${value}`)
            .then(res => {
                setUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                setUser([])
                setLoading(false)
            })
        }else{
            axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setUser(res.data)
                setLoading(false)
            })
            .catch(err => {
                setUser([])
                setLoading(false)
            })
        }     
    }
    
    return(
        <div className="bgcolor">
            <div className="container">
                <div className="p-4">
                    <h2>User Cards</h2>
                    <div className="underline"></div>
                </div>

                <input type="text" value={value} onChange={handleChange} className="search" placeholder="Search..." />
              
                <div className="row">
                  {
                      loading ? <h4>Loading...</h4> : 
                      user.length > 0 ?
                      user.map(u => 
                          <div className="col-md-4" key={u.id}>
                              <div className="card m-3 border-0 cardstyle">
                                <div className="header">
                                    <img src={images.user1} className="rounded-circle mt-5 mb-3" width="70px" alt="" />
                                    <h6 className="fw-bold">{u.name}</h6>
                                    <div className="underline"></div>
                                </div>
                                <div className="card-body">
                                    <p>{u.email}</p>
                                    <div><i className="fas fa-location-arrow fa-sm"></i> {u.address.city}</div>
                                    <div className="my-2"><i className="fas fa-phone fa-sm"></i> {u.phone}</div>
                                    <div><i className="fas fa-link fa-sm"></i> {u.website}</div>
                                    <button className="mt-3 seemore">See More</button>
                                </div>
                              </div>
                          </div>
                      ) : <h4 className="mt-3">Something Went Wrong!</h4>
                  }
                  
                </div>
            </div>
            
        </div>
    )
}
export default DataFetching
