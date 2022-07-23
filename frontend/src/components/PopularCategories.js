import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, categories: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        default: 
            return state;
    }
}

function PopularCategories(){

    const [{loading, error, categories}, dispatch] = useReducer(reducer, {
        categories: [],
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

    const popCat = () => {
        const ordered = [...categories].sort((a, b) => a.likes < b.likes ? 1 : -1);
        const filtered = ordered.filter((s => ({ category }) => !s.has(category) && s.add(category))(new Set()));
        return filtered;
     }

    return(
        <>
         <div className="container">
            <section className="my-4">
                <h3>Popular Categories</h3>
                <div className="row">
                {
                            loading ? (<div><h5>Loading data... </h5></div>
                            ) : error? (
                                <div><h5>{error}</h5></div>
                            ) : (
                                <div className="category-items">
                                {popCat().slice(0, 4).map((value, key) => {
                                return   <Link key={key} to={`/recipe/category/${value.category}`}> 
                                <div className="category-item">  
                                        <div className="animation clip-path">
                                            <img className="category-thumbNail" src={value.image} alt={value.image}/>
                                        </div>
                                        <h5 className="mt-3">{value.category}</h5> 
                                    </div>
                                    </Link>
                                })}
                                </div>
                            )
                }
                </div>
            </section>
         </div>
        </>
    );
}

export default PopularCategories;
