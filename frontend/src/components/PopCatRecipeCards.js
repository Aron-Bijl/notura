import React, { useEffect, useReducer  } from "react";
//import data from "../data";
import axios from "axios";
import TimeIcon from "./icons/TimeIcon";
import SwapIcon from "./icons/SwapIcon";
import ForkKnifeIcon from "./icons/ForkKnifeIcon";
import BreadIcon from "./icons/BreadIcon";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, recipeCards: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        default: 
            return state;
    }
}

function PopCatRecipeCards() {

        const params = useParams();
        const { category } = params;

        const [{loading, error, recipeCards}, dispatch] = useReducer(reducer, {
            recipeCards: [],
            loading: true, 
            error: '',
        });

        useEffect(()=> {
            const fetchData = async () => {
                dispatch({type: 'FETCH_REQUEEST'});
                try{
                    //const result = await axios.get('/api/recipies')
                    const result = await axios.get(`/api/recipies/category/${category}`);
                    dispatch({type: 'FETCH_SUCCESS', payload: result.data})
                }
                catch(err){
                    dispatch({type: 'FETCH_FAIL', payload: err.message})
                }
            };
            fetchData();
        }, [category]);

        return(
            <>
            <Helmet>
                <title>{category} Category</title>
            </Helmet>
            <div className="container">
                <section className="my-4">
                <h3>{category} Category</h3>
                <div className="row">
                {
                    loading ? (<div><h5>Loading your recipie cards... </h5></div>
                    ) : error? (
                        <div><h5>{error}</h5></div>
                    ) : (
                    <>
                    { recipeCards.map(recipe => (
                            <figure key={recipe.slug} className="card col-md-4 col-xl-4">
                            <Link to={`/recipe/${recipe.slug}`}className="animation rounded-top"><img className="w-100" src={recipe.image} alt={recipe.name} /></Link>
                            
                            <figcaption className="border-card rounded-bottom border-top">
                            <div className="pt-3 pb-4 px-4">
                                <Link to={`/recipe/${recipe.slug}`}><h5 className="mb-0 title-height">{recipe.title}</h5></Link>
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
                        )) }
                    </>)
                }
                </div>
                </section>
            </div>
            <Footer />
            </>
        )
}

export default PopCatRecipeCards;