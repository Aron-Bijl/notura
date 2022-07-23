import React, { useEffect, useReducer, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import SearchIcon from "../icons/SearchIcon";
import axios from "axios";
import { Link } from 'react-router-dom';

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, recipes: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        default: 
            return state;
    }
}

function SearchBar(){

    const [xValue, setXValue] = useState(false);
    const [search, setSearch] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const [{loading, error, recipes}, dispatch] = useReducer(reducer, {
        recipes: [],
        loading: true, 
        error: '',
    });

    useEffect(()=> {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEEST'});
            try{
                const result = await axios.get('/api/recipies')
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            }
            catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err.message})
            }
        };
        fetchData();
    }, []);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);
        const newFilter = recipes.filter((item) => {
            return item.title.toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord === ""){
            setSearch([]);
        }else{
            setSearch(newFilter); 
        }
    }

    const clearInput = () => {
        setSearch([]);
        setWordEntered("");
    }

    return(
        <>
            <div className="click-icon search-icon" onClick={() =>  setXValue(!xValue)}>
                <SearchIcon className="" stroke="3" fill="none" width={24} height={24} />
            </div>
            <div className={xValue ? "notura-search active" : "notura-search "}>
                <div class="container">
                    <div className="input-group form-group search-box mb-0">
                        <div className="form-control-box width-search-box">
                            <input type="text" name="Search" placeholder="Search" value={wordEntered} className="form-control" id="Search" onChange={(e) => handleFilter(e)} />
                        </div>
                        <div className="click-icon mb-3" onClick={() =>  {setXValue(!xValue); clearInput()}}>
                            <CloseIcon width={24} height={24} />
                        </div>
                    </div>
                </div>  
                {   search.length !== 0 && (
                    <div className="data-result container">
                        {
                            loading ? (<div><h5>Loading data... </h5></div>
                            ) : error? (
                                <div>{error}</div>
                            ) : (
        
                            search.slice(0, 10).map((value, key) => {
                                return <div className="data-item">
                                    <Link to={`recipe/${value.slug}`} onClick={() =>  {setXValue(!xValue); clearInput()}}> 
                                        <img className="recipe-list-thumbImg" src={value.image} alt={value.image}/>
                                        <div className="pl"> 
                                            <h5>{value.title}</h5> 
                                            <h6>Recipe</h6>
                                        </div>
                                    </Link>
                                </div>
                            })

                            )
                        }
                    </div>
                    )
                }
            </div>
        </>
    )
}

export default SearchBar;