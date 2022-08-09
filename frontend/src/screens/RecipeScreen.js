import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useReducer, useState  } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Bookmark from "../components/Bookmark.js";
import EditIcon from "../components/icons/EditIcon";
import { Store } from "../Store";
import Footer from "../components/Footer";


const reducer =  (state, action) => {
    switch(action.type){
        case 'FETCH_REQUEST': 
            return {...state, loading: true};
        case 'FETCH_SUCCESS' : 
            return {...state, recipe: action.payload, loading: false};
        case 'FETCH_FAIL' : 
            return {...state, loading: false, error: action.payload};
        default: 
            return state;
    }
}

function RecipeScreen() {

    const params = useParams();
    const { slug } = params;

    const [{loading, error, recipe}, dispatch] = useReducer(reducer, {
        recipe: [],
        loading: true, 
        error: '',
    });


    useEffect(()=> {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEEST'});
            try{
                const result = await axios.get(`/api/recipies/slug/${ slug }`)
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            }
            catch(err){
                dispatch({type: 'FETCH_FAIL', payload: err.message})
            }
        };
        fetchData();

    }, [slug]);

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
    }, [userInfo]);

    const recipeOwner = () => {
        if(userInfo !== undefined && recipe.author === userInfo.name && recipe.email === userInfo.email){
            return true;
        }else{
            return false;
        }
    }

    const isAdminCheck = () => {
        if(userInfo.isAdmin === true){
            return true;
        }else{
            return false;
        }
    }

    const navigate = useNavigate();   

    const [arr, setArr] = useState([]);

    function handleCheck(evt, indexI, indexJ){
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;  
        const copiedArray = arr;
        copiedArray[indexI][indexJ] = value;
        setArr(copiedArray);
       // console.log(arr);
        return arr;
    }        


        useEffect(() => {
            const checkArray = [];
            if(recipe.length !== 0){
                for(let i = 0; i < recipe.ingredients.length; i++){
                checkArray.push([])
                    for(let j = 0; j < recipe.ingredients[i].subIngredients.length; j++){
                        checkArray[i].push(false);
                    }
                }
            }
            setArr(checkArray);
        }, [recipe]);

       const [check, setCheck] = useState(false);

        const checkState = (i, j) => {
          if(arr.length !== 0){
                return arr[i][j];
          }else{
                return false;
          }
        }

    return (
        <>
        <div className="container">
           <section className="my-4 my-md-5">
            {       
                    loading ? (<div><h5>Loading your recipie card... </h5></div>
                    ) : error? (
                        <div><h5>{error}</h5></div>
                    ) : (<> {
                        <div>
                            <div className="d-sm-flex">
                                <div className="order-sm-2 ms-auto center">
                                    {isAdminCheck() ? (
                                        <div className="cursor" onClick={() => navigate(`/recipe/admin/${recipe._id}`)}>
                                            <EditIcon width="32" height="32"/>
                                        </div>
                                    ) : (<></>)} 
                                    
                                    {recipeOwner() && !isAdminCheck() ? (
                                        <div className="cursor" onClick={() => navigate(`/recipe/user/${recipe._id}`)}>
                                            <EditIcon width="32" height="32"/>
                                        </div>
                                    ) : (<></>)} 
                                    
                                    <Bookmark id={recipe._id} />
                                    
                                </div>
                                <Helmet>
                                    <title>{recipe.title}</title>
                                </Helmet>
                                <h2>{recipe.title}</h2>
                            </div>
                            <div className="d-flex flex-wrap">
                                    <div className="my-2 me-4">
                                        <div className="mt-3 avatar">
                                            <img className="rounded-circle" src={recipe.imgAuthor} alt={recipe.author} />
                                            <p>{recipe.author}</p>
                                        </div>
                                    </div>
                                </div>
                            <div className="blog-detail">
                                <hr></hr>
                                <p>{recipe.description}</p>
                                <img className="w-100 rounded-1" src={recipe.coverImg} alt={recipe.name} />
                                <div className="row mt-md-5">
                                    <div className="col-md-12">
                                        <ul className="component-list">
                                            <li>
                                                <small>Prep Time</small>
                                                <span>{recipe.prepTime} Min</span>
                                            </li>
                                            <li>
                                                <small>Servings</small>
                                                <span>{recipe.servings} People</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mt-md-5 pb-4">
                                            <h3>Ingredients</h3>
                                              { recipe.ingredients.map((i, indexI) => (
                                                  <React.Fragment key={"title-ingredient-"+indexI}>
                                                    <h4 alt={i.part}> {i.part} </h4>
                                                     {i.subIngredients.map( (j, indexJ) => (
                                                        <div className="form-check form-check-rounded recipe-checkbox" key={"ingredient-" + indexI + "-" + indexJ}>
                                                            <label className="form-check-label" htmlFor={j.identifier}>
                                                                <input type="checkbox" id={j.identifier} name={j.identifier} className="form-check-input"  checked={checkState(indexI, indexJ)} onChange={e => {handleCheck(e, indexI, indexJ); setCheck(!check)}}/>
                                                                <span className={`checkbox ${ checkState(indexI, indexJ) ? "checkbox-active" : ""}`} aria-hidden="true"></span>
                                                                <p className={`${ checkState(indexI, indexJ) ? "active" : ""}`} >{j.amount} {j.unit} {j.what} </p>
                                                            </label> 
                                                        </div>
                                                    ))} 
                                                 </React.Fragment>
                                              )) }
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-g-8">
                                                <div className="rounded-12 bg-lightest-gray p-4">
                                                    <h3>Nutrition Facts</h3>
                                                    <ul className="nutrition-list list-unstyled">
                                                    {
                                                        recipe.nutritionFacts.map((nut, index) => (
                                                            <li key={"nut-" + index}>
                                                                <span>{nut.nutrition}</span>
                                                                <span>{nut.amount} {nut.unit}</span>
                                                            </li>
                                                        ))
                                                    }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mt-md-5">
                                            <h3>Instructions</h3>
                                            <ol className="instruction-list">
                                            {
                                                recipe.instructions.map((steps, index) => (
                                                   
                                                    <li key={"instruction" + index}><p>{ steps }</p></li>
                                                   
                                                ))
                                            }
                                             </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    } </>)
            }
            </section>
        </div>
           <Footer />
        </>
        
    )
}

export default RecipeScreen;