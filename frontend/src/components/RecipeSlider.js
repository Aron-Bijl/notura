import React, { useEffect, useReducer, useState  } from "react";
//import data from "../data";
import axios from "axios";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import { Link } from "react-router-dom";

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, sliderData: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        default: 
            return state;
    }
}

function RecipeSlider() {

        const [{loading, error, sliderData}, dispatch] = useReducer(reducer, {
            sliderData: [],
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

        const [current, setCurrent] = useState(0);
        const length = 3;

        if(!Array.isArray(sliderData) || sliderData.length <= 0){
            return null;
        }

        const prevSlide = () => {
            setCurrent(current === 0 ? length - 1 : current - 1);
        }

        const nextSlide = () => {
            setCurrent(current === length -1 ? 0 : current + 1);
        }
 
        return(
            <div className="container">
                <section className="my-4"> 
                <div className="row">
                {
                    loading ? (<div><h5>Loading the slider... </h5></div>
                    ) : error? (
                        <div><h5>{error}</h5></div>
                    ) : (
                    <section className="slider">    
                    <div onClick={() => prevSlide()} className="icon-container-left"> 
                        <ChevronLeftIcon height="24" width="24" className="chevron-left" />
                    </div>             
                    <div onClick={() => nextSlide()} className="icon-container-right"> 
                        <ChevronRightIcon height="24" width="24" className="chevron-right"/>
                    </div>
                        {sliderData.slice(0, 3).map((slide, index) => {
                            return (
                                <Link to={`recipe/${slide.slug}`}>
                                <div className={index === current ? "slide active" : "slide"} key={index}> 
                                    {index === current && (
                                        <div className="img-gradient">
                                            <img src={slide.coverImg} alt={slide.tite} className="slider-image"/> 
                                            <div className="text-container"><h2>{slide.title}</h2></div>
                                        </div>
                                        )}
                                </div>
                                </Link>   
                            ) 
                        })}
                    </section>)
                }
                </div>
                </section>
            </div>
        )
}

export default RecipeSlider;