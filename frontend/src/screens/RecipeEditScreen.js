import axios from 'axios';
import React,  { useReducer, useState, useEffect, useContext }  from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Store } from '../Store';
import { getError } from '../utils';

const possibleCat = ["Sweets", "Meat", "Vegetables", "Complex", "Fruits", "Dairy", "Nuts and Seeds", "Fish and Seafood", "Pasta", "Rice", "Legumes (Beans)", "Salads", "Beverages"];
const possibleType = ["Breakfast", "Brunch", "Lunch", "Dinner", "Snack"];
const hardnessLevel = ["Simple", "Normal", "Hard", "Extreme"];
const possibleAllergies = ["Wheat", "Dairy", "Tree nuts", "Peanuts", "Shellfish", "Soy", "Fish", "Sugar", "Mustard seeds", "Sesame seeds", "Linseed", "Aniseed", "Peach", "Banana", "Avocado", "Kiwi fruit", "Passion fruit", "Celery", "Garlic", "Chamomile"];
//https://www.healthline.com/nutrition/common-food-allergies#other-common-food-allergies
const possibleDiet = ["Vegan", "Vegaterian", "Paleo", "Keto", "Low Carb", "High Carb", "Fruitarian", "High Protein", "Mediterranean", "Carnivore"];
const units = ["drop", "pinch", "g", "mg", "Kg ", "ml", "L", "tbsp", "tsp", "cup", "cal", " "];
const nutritions = ["Calories", "Total Fat", "Saturated Fat", "Unsaturated Fat", "Cholesterol", "Fiber", "Sodium", "Magnesium", "Calcium", "Potassium", "Total Carbohydrate", "Salts", "Sugars", "Proteins", "Vitamin A" , "Vitamin B", "Vitamin C", "Vitamin D", "Vitamin K", "Iron", "Folate", "Thiamin" ];
//https://www.healthline.com/health/food-nutrition
//https://www.calorieking.com/us/en/foods/

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false};
        case 'UPLOAD_REQUEST':
            return { ...state, loadingUpload: true };
        case 'UPLOAD_SUCCESS':
            return { ...state, loadingUpload: false };
        case 'UPLOAD_FAIL':
            return { ...state, loadingUpload: false};      
        case 'UPLOAD_THUMBNAIL_REQUEST':
            return { ...state, loadingUploadThumbnail: true };
        case 'UPLOAD_THUMBNAIL_SUCCESS':
            return { ...state, loadingUploadThumbnail: false };
        case 'UPLOAD_THUMBNAIL_FAIL':
            return { ...state, loadingUploadThumbnail: false };      
        default: 
            return;
    }
}

export default function ProductEditScreen () {
    const params = useParams();
    const { id: recipeId } = params;

    const navigate = useNavigate();

    const { state } = useContext(Store);
    const { userInfo } = state;

    const [{loading, error, loadingUpdate, loadingUpload, loadingUploadThumbnail}, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [imgAuthor, setImgAuthor] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [hardness, setHardness] = useState('');
    const [origin, setOrigin] = useState('');
    let [allergies, setAllergies] = useState('');
    const [diet, setDiet] = useState('');
    const [coverImg, setCoverImg] = useState('');
    const [description, setDescription] = useState('');
    const [servings, setServings] = useState('');
    const [ingredients, setIngriedients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [nutritionFacts, setNutrionFacts] = useState([]);
    const [likes, setLikes] = useState('');

    const [checkedState, setCheckedState] = useState([]);

    useEffect(() => {
        const newArray = [...possibleAllergies].map((item, i) => {
            let value = "";
                if(allergies.includes(item)){
                    value = true;
                }else{
                    value = false;
                }
            return value;
        });
       setCheckedState(newArray);
    }, [allergies]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/recipies/${recipeId}`);

                setTitle(data.title);
                setCategory(data.category);
                setType(data.type);
                setThumbnail(data.image);
                setAuthor(userInfo.name);
                setEmail(userInfo.email);
                setImgAuthor(userInfo.imgAuthor);
                setPrepTime(data.prepTime);
                setHardness(data.hardness);
                setOrigin(data.origin);
                setAllergies(data.allergies);
                setDiet(data.diet);
                setCoverImg(data.coverImg);
                setDescription(data.description);
                setServings(data.servings);
                setIngriedients(data.ingredients);
                setInstructions(data.instructions);
                setNutrionFacts(data.nutritionFacts);
                setLikes(data.likes);
                dispatch({ type: 'FETCH_SUCCESS' });
            }catch(err){
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        }
        fetchData();

    }, [recipeId, userInfo]);

    function titleToSLug(){
        const newTitle = title;
        const newSlug = newTitle.toLowerCase().replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
        return newSlug;
    };

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

    
    const uploadFileHandler = async(e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        bodyFormData.append('id', recipeId);
        let thumbNailPath = "";
        let coverImgPath = "";

        try{
            dispatch({ type: 'UPLOAD_REQUEST' });
           const  { data }  = await axios.post('/api/covers', bodyFormData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }); 

            setCoverImg(data);
            coverImgPath = data;

            dispatch({
                type: 'UPLOAD_SUCCESS',
            });
        }catch(err){
            toast.error(<p>{getError(err)}</p>);
            dispatch({
                type: 'UPLOAD_FAIL'
            });
        }

        try{
            dispatch({ type: 'UPLOAD_THUMBNAIL_REQUEST' });
            const  { data }  = await axios.post('/api/thumbnail', bodyFormData, 
            {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }); 

            setThumbnail(data);
            thumbNailPath = data;

            dispatch({
                type: 'UPLOAD_THUMBNAIL_SUCCESS',
            });
            
        }catch(err){
            toast.error(<p>{getError(err)}</p>);
            dispatch({
                type: 'UPLOAD_THUMBNAIL_FAIL'
            });
        }
        
        
        await axios.put(
            `/api/recipies/${recipeId}`,
            {
                _id: recipeId,
                title,
                slug:  titleToSLug(),
                author,
                email,
                imgAuthor,
                description,
                category,
                type,
                coverImg: coverImgPath,
                thumbnail: thumbNailPath,
                prepTime,
                hardness,
                origin,
                allergies,
                diet,
                servings,
                ingredients,
                instructions,
                nutritionFacts,
                likes,
            },
            {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }
        );

        window.location.reload();
    } 

    const submitHandler = async (e) => {
        e.preventDefault();

        try{
            dispatch({ type: 'UPDATE_REQUEST' });
            await axios.put(
                `/api/recipies/${recipeId}`,
                {
                    _id: recipeId,
                    title,
                    slug:  titleToSLug(),
                    author,
                    email,
                    imgAuthor,
                    description,
                    category,
                    type,
                    coverImg,
                    thumbnail,
                    prepTime,
                    hardness,
                    origin,
                    allergies,
                    diet,
                    servings,
                    ingredients,
                    instructions,
                    nutritionFacts,
                    likes,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            toast.success(<p>Recipe updated sucessfully</p>);
           // navigate('/recipies/admin');
           navigate(`/recipe/${titleToSLug()}`);
        }catch(err){
            toast.error(<p>{getError(err)}</p>);
            dispatch({
                type: 'UPDATE_FAIL'
            });
        }
    }

    function handleCheck(evt, index){
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;

        // if checkbox is checked and the selected value does NOT exist, push to array
        if(value === true && allergies.includes(evt.target.value) === false){
            allergies.push(evt.target.value)
            setAllergies(allergies);
        }
        //if checkbox is checked and value exist in array, do NOT PUSH, leave everything as it is 
        else if(value === true && allergies.includes(evt.target.value) === true){
        }
        //exclude value that was unchecked
        else{
            allergies = allergies.filter(i => i !== evt.target.value);
            setAllergies(allergies);
        }

        const updatedCheckedState = checkedState.map((item, i) => {
            return(
                i === index ? !item : item
            )
        })

        setCheckedState(updatedCheckedState);
    }
    
    const onIngredientChange = (index, event) => {
        let newIngredients = [...ingredients];
        newIngredients[index].part = event.target.value;
        setIngriedients(newIngredients);
    } 

    const addIngriedient = (e) => {
        e.preventDefault();
        let newField = {
            part: "Ingredients for...",
            subIngredients: [{
                amount: 1,
                unit: "g",
                what: "For the whatever...",
            },]
        }
        const arr = [...ingredients, newField];
        setIngriedients(arr)
        console.log(arr);
    }

    const onSubIngredientChange = (i, index, e) => {
        let newAmount = [...ingredients];
        newAmount[index].subIngredients[i].amount = e;
        setIngriedients(newAmount);
    }

    const setUnit = (i, index, e) => {
        let newUnit = [...ingredients];
        newUnit[index].subIngredients[i].unit = e;
        setIngriedients(newUnit);
    }

    const setNutUnit = (index, e) => {
        let newUnit = [...nutritionFacts];
        newUnit[index].unit = e;
        console.log(newUnit);
        setNutrionFacts(newUnit);
    }

    const onWhatIngredientChange = (i, index, e) => {
        let what = [...ingredients];
        what[index].subIngredients[i].what = e;
        setIngriedients(what);
        console.log(what);
    }

    const removeIngridient = (i, index, e) => {
        e.preventDefault();
        if(i > 0){
            let newField = [...ingredients];
            newField[index].subIngredients.splice(i, 1)
            setIngriedients(newField)
        }else {
            //do nothing
        }
    }

    const addIngridient = (i, index, event) => {
        event.preventDefault();

        const addIngriedient = {
                amount: 100,
                unit: "g",
                what: "For the whatever...",
            };

        const oldField = [...ingredients];
        const items = oldField[index].subIngredients;

       const insert = (arr, i, newItem) => [
         // part of the array before the specified index
         ...arr.slice(0, i),
         // inserted item
         newItem,
         // part of the array after the specified index
         ...arr.slice(i)
       ];
       
       const result = insert(items, i+1, addIngriedient)

        oldField[index].subIngredients = result;

       setIngriedients(oldField);        
    }

    const removeFields = (index, event) => {
        event.preventDefault();
        let newField = [...ingredients];
        newField.splice(index, 1);
        setIngriedients(newField);
    }

    const onInstructionChange = index => e => {
        let instruction = [...instructions];
        instruction[index] = e.target.value;
        setInstructions(instruction); 
    }


    const removeInstruction = (index, e) => {
        e.preventDefault();
        if(instructions.length > 1){
            let newField = [...instructions];
            newField.splice(index, 1)
            setInstructions(newField)
        }else {
            //do nothing
        }
    }

    const addInstruction = (index, e) => {
        e.preventDefault();
        let newItem = `In step ` + (instructions.length+1);
        const arr = [...instructions];
       const insert = (arr, i, newItem) => [
            // part of the array before the specified index
            ...arr.slice(0, i),
            // inserted item
            newItem,
            // part of the array after the specified index
            ...arr.slice(i)
          ];
        const result = insert(arr, index+1, newItem);
        setInstructions(result); 
    }

    const setNutrition = (index, e) => {
        let newUnit = [...nutritionFacts];
        newUnit[index].nutrition= e;
        console.log(newUnit);
        setNutrionFacts(newUnit);
    }

    const onNutAmountChange = ( index, e) => {
        let nutri = [...nutritionFacts];
        nutri[index].amount = parseFloat(e);
        setNutrionFacts(nutri);
    }

    const removeNutFact = (index, e) => {
        e.preventDefault();
        if(index > 0){
            let newField = [...nutritionFacts];
            newField.splice(index, 1)
           setNutrionFacts(newField)
        }else {
            //do nothing
        }
    }

    const addNutFact = (index, event) => {
        event.preventDefault();

        if(nutritionFacts.length < nutritions.length){
            const addNutFact = {
                    nutrition: "none",
                    amount: 0,
                    unit: "g",
                };

            const oldField = [...nutritionFacts];

        const insert = (arr, i, newItem) => [
            // part of the array before the specified index
            ...arr.slice(0, i),
            // inserted item
            newItem,
            // part of the array after the specified index
            ...arr.slice(i)
        ];
        
        const result = insert(oldField, index+1, addNutFact)

        setNutrionFacts(result);   
        } else{
            //do nothing
        } 
    }

    return (
        <div className='container'>
            <Helmet>
                <title>Edit recipe </title>
            </Helmet>
            <section className="my-4">
                <h3>Edit recipe </h3>
                <div><h4> {title} </h4></div>
                { loading ? (<div><h5>Loading your recipe list... </h5></div>
                    ) : error ? (
                        <div><h5>{error}</h5></div>
                    ) : (<React.Fragment>  
                        <form onSubmit={submitHandler}> 
                        <div className="edit-recipe">
                            <div className="form-group mt-5 pb-md-3">
                                <div className="form-control-box">
                                    <input type="text" name="title" className="form-control" placeholder='Title' required onChange={(e) => setTitle(e.target.value)} value={title} />
                                </div>
                                <div className="form-control-box">
                                    <textarea rows="3" type="text" name="description" className="form-control" placeholder='Tell your story here' onChange={(e) => setDescription(e.target.value)} value={description} />
                                </div>
                                <div className="form-control-box drop-down-group">
                                    <label className='drop-down-label' htmlFor="category">Category</label>
                                    <select name="category"  value={category} onChange={(e) => setCategory(e.target.value)} className="drop-down">
                                        {possibleCat.map((val) => {
                                            return (
                                                <option key={"category-option-" + val} value={checkItem(category, possibleCat)}>{val}</option>
                                            )
                                        })}
                                    </select>   
                                </div>
                                <div className="form-control-box drop-down-group">
                                    <label className='drop-down-label' htmlFor="type">Type</label>
                                    <select name="type"  value={type} onChange={(e) => setType(e.target.value)} className="drop-down">
                                        {possibleType.map((val) => {
                                            return (
                                                <option key={"type-option-" + val} value={checkItem(type, possibleType)}>{val}</option>
                                            )
                                        })}
                                    </select>   
                                </div>
                                <div className='image-container'>
                                    <img src={coverImg} alt="cover" className="cover-image" />
                                    <div className='image-upload'>  
                                        <label className="uploadLabel">
                                            <input type="file" className="uploadButton"  onChange={(e) => {uploadFileHandler(e)}}/>
                                            Update image
                                        </label>
                                        { loadingUpload && loadingUploadThumbnail && <div><h4>Wait till we upload your image...</h4></div> }
                                    </div>
                                </div>
                                <div className="form-control-box">
                                    <label className='drop-down-label' htmlFor="prep-time">Prep time (min)</label>
                                    <input type="number" name="prep-time" className="form-control" placeholder='Prep time' required onChange={(e) => setPrepTime(e.target.value)} value={prepTime} />
                                </div>
                                <div className="form-control-box drop-down-group">
                                    <label className='drop-down-label' htmlFor="category">Hardness</label>
                                    <select name="category"  value={hardness} onChange={(e) => setHardness(e.target.value)} className="drop-down">
                                        {hardnessLevel.map((val, index) => {
                                            return (
                                                <option key={"option-" + index} value={checkItem(hardness, hardnessLevel)}>{val}</option>
                                            )
                                        })}
                                    </select>   
                                </div>
                                <div className="form-control-box">
                                    <input type="text" name="origin" className="form-control" placeholder='Origin' required onChange={(e) => setOrigin(e.target.value)} value={origin} />
                                </div>
                                <div className="form-control-box">
                                    <label className="drop-down-label " htmlFor="alergies">Alergies</label>
                                    {possibleAllergies.map((val, index) => {
                                            return (
                                                <div key={"alergies-" + index} className="checkbox-container-checkbox" >
                                                    <label className="checkbox-label" name={val}>{val}
                                                            <input type="checkbox" onChange={e => {handleCheck(e, index)}} value={val} checked={checkedState[index]}/> 
                                                            <span className={`checkbox ${checkedState[index] ? "checkbox-active" : ""}`} aria-hidden="true"></span>
                                                    </label>
                                                </div>
                                            )
                                    })}                                  
                                </div>
                                <div className="form-control-box drop-down-group">
                                    <label className='drop-down-label' htmlFor="diet">Diet type</label>
                                    <select name="diet"  value={diet} onChange={(e) => setDiet(e.target.value)} className="drop-down">
                                        {possibleDiet.map((val) => {
                                            return (
                                                <option key={"diet-option-" + val} value={checkItem(diet, possibleDiet)}>{val}</option>
                                            )
                                        })}
                                    </select>   
                                </div>
                                <div className="form-control-box">
                                    <label className='drop-down-label' htmlFor="servings">Servings (no. people)</label>
                                    <input type="number" name="servingd" className="form-control" placeholder='Servingd' required onChange={(e) => setServings(e.target.value)} value={servings} />
                                </div>

  
                                <div className="form-control-box image-container pb-4">
                                <h4 className="pb-4">Ingredients</h4>
                                  {ingredients.map((val, index) => {
                                            return (
                                                <React.Fragment key={"ingredients-" + index}>
                                                <div className="checkbox-container">
                                                    <input 
                                                        key={"ingredient-title"-index}
                                                        name="ingredients"
                                                        placeholder={val.part}
                                                        className="form-control"
                                                        value={val.part}
                                                        onChange={ event => onIngredientChange(index, event)}
                                                    />
                                                    <Button buttonStyle="btn" buttonSize="btn-medium" onClick={event => removeFields(index, event)}>Remove</Button>
                                                </div>

                                                {val.subIngredients.map((subIngredients, i) => {
            
                                                    return(                              
                                                        <div className="checkbox-container multiple-items-row" key={"ingredient-list-"+index+"-"+i}>
                                                            <div className="unit-group">
                                                                <input 
                                                                    type="number" 
                                                                    key={"amount-"+index+"-"+i}
                                                                    name="ingredient"
                                                                    placeholder={val.subIngredients[i].amount}
                                                                    className="form-control px-4"
                                                                    value={val.subIngredients[i].amount}
                                                                    onChange={ (e) => onSubIngredientChange(i, index, e.target.value)}
                                                                />
                                                                <select key={"unit-"+index+"-"+i} name="type"  value={val.subIngredients[i].unit} onChange={(e) => setUnit(i, index, e.target.value)} className="drop-down px-4">
                                                                    {units.map((unit) => {
                                                                        return (
                                                                            <option key={"unit-option-" + unit} value={checkItem(unit, units)}>{unit}</option>
                                                                        )
                                                                    })}
                                                                </select>   
                                                            </div>
                                                            <input 
                                                                key={"what-"+index+"-"+i}
                                                                name="what"
                                                                placeholder={subIngredients.what}
                                                                value={subIngredients.what}
                                                                className="form-control px-4"
                                                               
                                                                onChange={ e => onWhatIngredientChange(i, index, e.target.value)}
                                                            />
                                                            <div className="button-group">
                                                                <Button buttonStyle="btn" buttonSize="btn-medium" onClick={event => removeIngridient(i, index, event)}>-</Button>
                                                                <Button buttonStyle="btn" buttonSize="btn-medium" onClick={event => addIngridient(i, index, event)}>+</Button>
                                                             </div>
                                                        </div>
                                                    )
                                                })}
                                            </React.Fragment>
                                            )
                                    })}     
                                    <Button onClick={addIngriedient} buttonStyle="btn--outline" buttonSize="btn-medium" >Add more parts...</Button> 
                                </div>
                                <div className="form-control-box image-container pb-4">
                                <h4 className="pb-4">Instructions</h4>
                                  {instructions.map((val, index) => {
                                            return (
                                                <React.Fragment key={"instruction" + index}>
                                                 <div className="checkbox-container">
                                                    <textarea 
                                                        key={"instruction"-index}
                                                        name="instructions"
                                                        placeholder={val}
                                                        className="form-control"
                                                        value={val}
                                                        onChange={onInstructionChange(index) }
                                                        type="text"
                                                        rows="3"
                                                    />
                                                    <div className="button-group">
                                                        <Button buttonStyle="btn" buttonSize="btn-medium" onClick={event => removeInstruction(index, event)}>-</Button>
                                                        <Button buttonStyle="btn" buttonSize="btn-medium" onClick={event => addInstruction(index, event)}>+</Button>                       
                                                    </div>
                                                </div>
                                                </React.Fragment>
                                            )
                                    })}
                                </div>
                                <div className="form-control-box image-container pb-4">
                                <h4 className="pb-4">Macro Nutritions</h4>
                                  {nutritionFacts.map((val, index) => {
                                            return (
                                                <div key={"unit-"+index} className="nutrition-fact-row">
                            
                                                        <select name="type"  value={val.nutrition} onChange={(e) => setNutrition(index, e.target.value)} className="drop-down px-4">
                                                            {nutritions.map((nutrition) => {
                                                            return (
                                                                <option key={"nutrition-option-" + nutrition} value={checkItem(nutrition, nutritions)}>{nutrition}</option>
                                                            )
                                                            })}
                                                        </select>  
                                 
                                                        <div className="unit-group">
                                                        <input 
                                                            type="number" 
                                                            key={"nutAmount-"+index}
                                                            name="nutrition"
                                                            className="form-control px-4"
                                                            value={val.amount}
                                                            onChange={ (e) => onNutAmountChange(index, e.target.value)}
                                                        />
                                                    
                                                        <select key={"nutUnit-"+index} name="type"  value={val.unit} onChange={(e) => setNutUnit(index, e.target.value)} className="drop-down px-4">
                                                                        {units.map((unit) => {
                                                                            return (
                                                                                <option key={"unit-option-" + unit} value={checkItem(unit, units)}>{unit}</option>
                                                                            )
                                                                        })}
                                                        </select>   
                                                        </div>
                                                   
                                                        <div className="button-group">
                                                            <Button buttonStyle="btn" buttonSize="btn-medium" onClick={event => removeNutFact(index, event)}>-</Button>
                                                            <Button buttonStyle="btn" buttonSize="btn-medium" onClick={event => addNutFact(index, event)}>+</Button>
                                                        </div>
                                                 
                                                </div>
                                            )})
                                  }
                                </div>
                            </div>
                            <div>
                                <Button disabled={loadingUpdate} buttonSize="btn-large" type="submit">Update</Button>
                                { loadingUpdate && <div><p>Wait till we update your recipe</p></div> }
                                <span className="mr"></span>
                                <Link to={`/recipe/${titleToSLug()}`}><p className="btn-link">Cancel</p></Link>
                            </div>
                        </div>
                    </form>
                     </React.Fragment>)
                }
            </section>
        </div>
    );
}