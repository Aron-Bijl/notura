import React, { useEffect, useReducer, useState  } from "react";
//import data from "../data";
import axios from "axios";
import { Button } from "./Button";
import { Link } from "react-router-dom";

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

function LatestRecipes() {

        const [{loading, error, recipeCards}, dispatch] = useReducer(reducer, {
            recipeCards: [],
            loading: true, 
            error: '',
        });

        useEffect(()=> {
            const fetchData = async () => {
                dispatch({type: 'FETCH_REQUEEST'});
                try{
                    const result = await axios.get('/api/recipies/latest')
                    dispatch({type: 'FETCH_SUCCESS', payload: result.data})
                }
                catch(err){
                    dispatch({type: 'FETCH_FAIL', payload: err.message})
                }
            };
            fetchData();
            
        }, []);

        const [cards, setCards] = useState(3)
        const [buttonText, setButtonText] = useState("Load more")
        const [activity, setActivity] = useState("active");

        const add = () => {
            setCards(cards+3);
            if(cards >= recipeCards.length){
                setButtonText("That's all");
                setActivity("inactive");
            }else{
             setActivity("active");
            }
        }

        return(
            <div className="container">
                <section className="my-4">
                <h3>Latest Crazy</h3>
                <div className="row">
                {
                    loading ? (<div><h5>Loading your recipie cards... </h5></div>
                    ) : error? (
                        <div><h5>{error}</h5></div>
                    ) : (
                    <React.Fragment>
                    { recipeCards.slice(0, cards).map(recipe => (
                        <div key={recipe.slug}  className="col-md-4 col-xl-4 col-lg-3 col-6">
                            <figure className="card ">
                            <Link to={`/recipe/${recipe.slug}`} className="animation rounded"><img className="small-thumbNail" src={recipe.image} alt={recipe.name} /></Link>
                            <figcaption className="rounded-bottom border-top">
                            <div className="pb-4 ">
                                <Link to={`/recipe/${recipe.slug}`}><h5 className="mb-0 title-height">{recipe.title}</h5></Link>
                            </div>
                            </figcaption>
                            </figure>
                        </div>
                    ))}
                    <Button id="more-button" type="button" activity={activity} buttonStyle="btn--outline" buttonSize="btn-medium"  onClick={() => {add()}}> {buttonText} </Button> 
                    </React.Fragment>
                    )
                }
                </div>
                </section>
            </div>
        )
}

export default LatestRecipes;