import React, { useContext, useEffect, useReducer, useState  } from "react";
//import data from "../data";
import '../App.css';
import axios from "axios";
import { Store } from "../Store";
import { Link } from "react-router-dom";

const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, recipeCards: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        case 'SETTING_FETCH' : 
            return {...state, setting: action.payload, loadingSetting: true};
        case 'SETTING_SUCCES': 
            return {...state, loadingSetting: false};
        case 'SETTING_FAIL': 
            return {...state, loadingSetting: false};
        case 'REFRESH_SETCAT' : 
            return {...state, setting: action.payload, loadingSetCat: true};
        case 'SETCAT_SUCCES': 
            return {...state, loadingSetCat: false};
        case 'SETCAT_FAIL': 
            return {...state, loadingSetCat: false};
        default: 
            return state;
    }
}

function RecipeCardsCat() {

    const { state } = useContext(Store);
    const { userInfo } = state;

        const [{loading, error, recipeCards, loadingSetting, setting, loadingSetCat}, dispatch] = useReducer(reducer, {
            recipeCards: [],
            loading: true, 
            error: '',
            setting: "All",
            loadingSetting: true,
            loadingSetCat: false,
        });

        const [category, setCategory] = useState(setting);

        useEffect(()=> {
            const fetchData = async () => {
                if(!userInfo === false){
                    dispatch({type: 'SETTING_FETCH'});
                    try{
                        const { data } = await axios.get( 
                            `/api/users/${userInfo._id}`,
                            {
                                headers: { Authorization: `Bearer ${userInfo.token}` },
                            }
                        );
                        if(data.settings){
                            setCategory(data.settings);
                        }else{
                            setCategory("All");
                        }
                        
                        dispatch({type: 'SETTING_SUCCES', payload: data})
                    }
                    catch(err){
                        dispatch({type: 'SETTING_FAIL', payload: err.message})
                    }
                }
            };
            fetchData();
        }, [userInfo]); 

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

        useEffect(() => {

            const submitHandler = async (e) => { 

                dispatch({ type: "REFRESH_SETCAT", payload: setting })
                try{
                     await axios.post(
                        `/api/users/settings`,
                        {settings: category},
                        {
                            headers: { Authorization: `Bearer ${userInfo.token}` },
                        }
                    );
                dispatch({ type: "SETCAT_SUCCES" });
        
                }catch(err){
                    dispatch({ type: "SETCAT_FAIL" });
                } 
            }

            submitHandler(category);

        }, [category, setting, userInfo]);

        const categorySelect = () => {
            const selectedCat = recipeCards.filter(c => c.category === category);
            if(selectedCat.length >= 6){
                const random = Math.floor((Math.random() * (selectedCat.length -6)) + 1);
                const nextBreakPoint = random + 6;
                const cards = selectedCat.slice(random,nextBreakPoint)
                return cards;
            }
            else if(category === "All"){
                if(recipeCards.length >= 6){
                    const random = Math.floor((Math.random() * (recipeCards.length -6)) + 1);
                    const nextBreakPoint = random + 6;
                    const cards = recipeCards.slice(random,nextBreakPoint)
                    return cards;
                }else{
                    return recipeCards;
                }
            }
            else{
                return selectedCat;
            }
        }

        function checkItem (item, array){
            // if cat is same as e, use that, otherwise replace item of array
            array.map((e) => {
                if(e === item){
                    return item;
                }else {
                    return e;
                }
            });
        }

        const possibleCat = ["All", "Sweets", "Meat", "Vegetables", "Complex", "Fruits", "Dairy", "Nuts and Seeds", "Fish and Seafood", "Eggs"];

        return(
            <div className="container">
                <section className="my-4">
                <div className="column">

                { !loadingSetting && !loadingSetCat ? (<select name="category"  value={category} onChange={(e) => setCategory(e.target.value)} className="select-title">
                            {possibleCat.map((val) => {
                                return (
                                    <option value={checkItem(val, possibleCat)}>{val}</option>
                                )
                                })}
                    </select>) : (<h5>Loading</h5>) }  
                </div>
                <>
                {userInfo ? (<>
                    <div className="row">
                    {
                        loading ? (<div><h5>Loading your recipie cards... </h5></div>
                        ) : error? (
                            <div><h5>{error}</h5></div>
                        ) : (
                        <>
                        { categorySelect().length === 0 ?  
                            (<h5>Right now we do not have recipes in this category</h5>) 
                            : (categorySelect().map(recipe => (
                                <figure key={recipe.slug} className="card col-md-4 col-xl-4">
                                <Link to={`/recipe/${recipe.slug}`} className="animation rounded-top"><img className="w-100" src={recipe.image} alt={recipe.name} /></Link>
                                <figcaption className="border-card rounded-bottom border-top">
                                <div className="pt-3 pb-4 px-4">
                                    <Link to={`/recipe/${recipe.slug}`}><h5 className="mb-0 title-height">{recipe.title}</h5></Link>
                                </div>
                                </figcaption>
                                </figure>
                            )))}
                        </>)
                    }
                </div>
                </>):(<></>)}
                </>
                </section>
            </div>
        )
}

export default RecipeCardsCat;