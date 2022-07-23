
import { Helmet } from "react-helmet-async";
import BookmarkedRecipes from "../components/BookmarkedRecipes.js";
import Footer from "../components/Footer.js";
import LatestRecipes from "../components/LatestRecipes.js";
import PopularCategories from "../components/PopularCategories.js";
import RecipeCards from "../components/RecipeCards.js";
import RecipeCardsCat from "../components/RecipeCardsCat.js";
import RecipeSlider from "../components/RecipeSlider.js";

function HomeScreen(){

    return (
        <div>
            <Helmet>
                <title>Notura Recipies</title>
            </Helmet>
            <RecipeSlider />
            <PopularCategories />
            <RecipeCardsCat/>
            <RecipeCards/>
            <BookmarkedRecipes />
            <LatestRecipes />
            <Footer />
        </div>
    );
}

export default HomeScreen;