import axios from 'axios';
import React, { useReducer, useEffect, useContext }  from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = ( state, action ) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCES':
            return{
                ...state,
                createdRecipe: action.payload.recipes,
                page: action.payload.page,
                pages: action.payload.pages,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { 
                ...state, 
                loading: false, 
                error: action.payload 
            };
        case 'CREATE_REQUEST':
            return { 
                ...state, 
                loadingCreate: true, 
            };
        case 'CREATE_SUCCESS':
            return {
                ...state, 
                loadingCreate: false,
            };
        case 'CREATE_FAIL':
            return {
                ...state, 
                loadingCreate: false
            };
        case 'DELETE_REQUEST':
            return { 
                ...state, 
                loadingDelete: true,
                successDelete: false,
            };
        case 'DELETE_SUCCESS':
            return {
                ...state, 
                loadingDelete: false,
                successDelete: true,
            };
        case 'DELETE_FAIL':
            return {
                ...state, 
                loadingDelete: false,
                successDelete: false,
            };
        case 'DELETE_RESET':
            return {
                ...state, 
                loadingDelete: false,
                successDelete: false,
            };
        default:
            return state;
    }
}

export default function RecipeListScreen(){
    const [{ loading, error, createdRecipe, pages, loadingCreate, loadingDelete, successDelete}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const page = sp.get('page') || 1;

    const { state } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try{
                const { data } = await axios.get(`/api/recipies/admin?page=${page} `, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                  });
                dispatch({ type: 'FETCH_SUCCES', payload: data });
            }
            catch(err){
                toast.error(getError(err));
            }
        }
        if(successDelete){
            dispatch({ type: 'DELETE_RESET' });
        } else{
            fetchData();
        }
    }, [page, userInfo, successDelete]);


    const createHandler = async () => {
        try{
            dispatch({ type: 'CREATE_REQUEST'});
            const { data } = await axios.post(
                '/api/recipies',
                {},
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                }
            );
            toast.success(<p>A recipe has been created</p>);
            dispatch({ type: 'CREATE_SUCCESS' });
            navigate(`/recipe/admin/${data.recipe._id}`);
        }catch (err){
            toast.error(<p>{getError(err)}</p>);
            dispatch({
                type: 'CREATE_FAIL',
            })
        }
    };

    const deleteHandler = async (recipe) => {
        if (window.confirm('Are you sure to delete?')){
            try{
                await axios.delete(`/api/recipies/${recipe._id}`,
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                toast.success(<p>Recipe deleted successfully</p>);
                dispatch({ type: 'DELETE_SUCCESS' });
            }catch(err){
                toast.error(<p>{getError(err)}</p>);
                dispatch({
                    type: 'DELETE_FAIL',
                });
            }
        }
    }

    return(
        <div className='container'>
            <Helmet>
                <title>{userInfo.name} Recipes</title>
            </Helmet>
            <h3>Recipes</h3>
            <Button type='button' buttonSize="btn-large" onClick={createHandler}>Create recipe</Button>
            { loadingCreate && <div><h5>Cooking a new recipe... </h5></div> }
            { loadingDelete && <div><h5>Trying to delete recipe... </h5></div> }
            { loading ? (<div><h5>Loading your recipe list... </h5></div>
                    ) : error? (
                        <div><h5>{error}</h5></div>
                    ) : (<> 
                        <table className='table'>
                            <thead>
                            <tr> 
                                <th>Image</th>
                                <th>Recipe</th>
                                <th className="author">Author</th>
                                <th className="category">Category</th>
                                <th className="cuisine">Cuisine</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {createdRecipe.map( (recipe) => (
                                <tr key={recipe._id}>
                                    <td>
                                      <Link to={`/recipe/${recipe.slug}`}> 
                                        <img className="recipe-list-thumbImg" src={recipe.image} alt={recipe.image}/> 
                                      </Link> 
                                    </td>
                                    <td className="recipe-title">{recipe.title}</td>
                                    <td className="author">{recipe.author}</td>
                                    <td className="category">{recipe.category}</td>
                                    <td className="cuisine">{recipe.origin}</td>
                                    <td className="action">
                                        <Button type="button"  buttonStyle="btn--outline" buttonSize="btn-medium"  onClick={() => navigate(`/recipe/admin/${recipe._id}`)}>Edit</Button>&nbsp;
                                        <Button type="button"  buttonStyle="btn" buttonSize="btn-medium"  onClick={() => deleteHandler(recipe)}>Delete</Button>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        <div className='pagination'>
                            {[...Array(pages).keys()].map((x) => (
                                <Link
                                    className={x + 1 === Number(page) ? 'btn btn-link' : 'btn'}
                                    key={x +1}
                                    to={`/recipies/admin/?page=${x + 1}`}
                                >
                                    {x + 1}
                                </Link>
                            ))}
                         
                        </div>
                     </>
            )}
        </div>
    )
}