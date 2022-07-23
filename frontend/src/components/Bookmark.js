import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { getError } from "../utils";
import BoookmarkFullIcon from "./icons/BookmarkFullIcon";
import BoookmarkIcon from "./icons/BookmarkIcon";

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, bookmark: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        case 'REFRESH_BOOKMARK' : 
            return {...state, like: action.payload, loadingBookmark: true};
        case 'BOOKMARK_SUCCES': 
            return {...state, loadingBookmark: false};
        case 'BOOKMARK_FAIL': 
            return {...state, loadingBookmark: false};
        default: 
            return state;
    }
}

function Bookmark(id){

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [xValue, setXValue] = useState(false);

    let [{loading, error, like, loadingBookmark, bookmark}, dispatch] = useReducer(reducer, {
        like: 0,
        loading: true, 
        error: '',
        loadingBookmark: false,
        bookmark: {like: 0}
    });

    useEffect(() => {
    }, [userInfo]);


    useEffect(() => {
        if(bookmark.like === 1){
            setXValue(true);
        }else{
            setXValue(false);
        }
    }, [bookmark.like]);
    
    useEffect(()=> {
        const fetchData = async () => {
            if(!userInfo === false){
                dispatch({type: 'FETCH_REQUEEST'});
                try{
                    const { data } = await axios.get( 
                        `/api/recipies/${id.id}/reviews/${userInfo.email}`,
                        {
                            headers: { Authorization: `Bearer ${userInfo.token}` },
                        }
                    );
                    dispatch({type: 'FETCH_SUCCESS', payload: data})
                }
                catch(err){
                    dispatch({type: 'FETCH_FAIL', payload: err.message})
                }
            }
        };
        fetchData();
    }, [id.id, like, userInfo]); 

    const submitHandler = async (e) => { 
        if(e === false){
            like = 0;
        }else{
            like = 1;
        }
        dispatch({ type: "REFRESH_BOOKMARK", payload: like })
        try{
             await axios.post(
                `/api/recipies/${id.id}/reviews`,
                {like, name: userInfo.name, email: userInfo.email},
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );

        dispatch({ type: "BOOKMARK_SUCCES" });

        }catch(err){
            toast.error(<p>{getError(err)}</p>);
            dispatch({ type: "BOOKMARK_FAIL" });
        } 
    }

    return(
        <>
                {
                            loading && userInfo ? (<div><h5>Loading data... </h5></div>
                            ) : error? (
                                <div><h5>{error}</h5></div>
                            ) : (
                                <div>
                                    {userInfo ? (
                                        <div className="cursor"  onClick={() => {setXValue(!xValue); submitHandler(!xValue)}}> 
                                            {!xValue && !loadingBookmark ? ( <BoookmarkIcon height="32" width="32" />) : ( <BoookmarkFullIcon height="32" width="32" fill="#B9012F" /> )}
                                        </div>    
                                    ) : <div> <h6>Log-in to bookmark this</h6> </div>}
                                </div>
                            )
                }
        </>
    );
}

export default Bookmark;
