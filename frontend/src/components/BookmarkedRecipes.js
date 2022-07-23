import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import BreadIcon from "./icons/BreadIcon";
import ForkKnifeIcon from "./icons/ForkKnifeIcon";
import SwapIcon from "./icons/SwapIcon";
import TimeIcon from "./icons/TimeIcon";

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, bookmarked: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        default: 
            return state;
    }
}

function BookmarkedRecipes(){

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{loading, error, bookmarked}, dispatch] = useReducer(reducer, {
        bookmarked: [],
        loading: true, 
        error: '',
    });

    useEffect(() => {

    }, [userInfo]);

    useEffect(()=> {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEEST'});
            try{
                const result = await axios.get('/api/recipies/bookmarked',
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            }
            catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err.message});
            }
        };
        fetchData();
    }, [userInfo]);

    return(
        <>
        {userInfo ? (<div className="container">
        <section className="my-4">
        <h3>{userInfo.name}'s bookmarked recipes </h3>
        <div className="row">
        {
            loading ? (<div><h5>Loading your bookmarked recipie cards... </h5></div>
            ) : error? (
                <div><h5>{error}</h5></div>
            ) : (
            <>
            { bookmarked.length > 0 ? (bookmarked.map(recipe => (
                    <figure key={recipe.slug} className="card col-md-4 col-xl-4">
                    <a href={`/recipe/${recipe.slug}`} className="animation bookmarked-border-card rounded-top"><img className="w-100" src={recipe.image} alt={recipe.name} /></a>
                    <figcaption className="bookmarked-border-card rounded-bottom border-top">
                    <div className="pt-3 pb-4 px-4">
                        <a href={`/recipe/${recipe.slug}`}><h5 className="mb-0 title-height">{recipe.title}</h5></a>
                        <div className="mt-3 avatar">
                        <img className="rounded-circle" src={recipe.imgAuthor} alt={recipe.author} />
                        <p>{recipe.author}</p>
                        </div>
                        <div className="mt-4 d-flex col w-100 card-info">
                        <div className="d-flex">
                            <div className="center w-50"><TimeIcon className="mr" width={24} height={24} /><p className="mr">{recipe.prepTime} mins</p> </div>
                            <div className="center w-50"><SwapIcon className="mr" width={24} height={24} /><p>{recipe.hardness}</p></div>
                        </div>
                        <div className="d-flex mt-3">
                            <div className="center w-50"><ForkKnifeIcon className="mr" width={24} height={24} /> <p>{recipe.origin}</p></div>
                            <div className="center w-50"><BreadIcon className="mr" width={24} height={24} /> <p>{recipe.diet}</p></div>
                        </div>
                        </div>
                    </div>
                    </figcaption>
                    </figure>
                ))) : (<h5>You do not have bookmarked recipes</h5>) }
            </>)
        }
        </div>
        </section>
    </div>) : ("")}
    </>
    );
}

export default BookmarkedRecipes;
