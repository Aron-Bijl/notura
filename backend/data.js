import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: "Aron Bijl",
            email: "aron.bijl@me.com",
            password: bcrypt.hashSync('1234'),
            imgAuthor: "/images/avatars/Avatar-62ddcb4e0170fbe981372a48.jpeg",
            isAdmin: true,
            settings: "Sweets",
        },
        {
            name: "Hanna Bijl",
            email: "hanna_bijl@live.nl",
            password: bcrypt.hashSync('1234'),
            imgAuthor: "/images/avatars/Avatar-62dc7badd3baf2dea27ad6bb.jpeg",
            isAdmin: true,
            settings: "Sweets",
        },
    ],
    recipies: [
        {
            title: "Delicious Fancy Glazed Blueberry Donuts",
            slug: "delicious-fancy-glazed-blueberry-donuts",
            category: "Sweets",
            type: "Dessert",
            image: "/images/thumbnail/Thumbnail-62dcf418594615c1cd0c0282.jpeg",
            author: "Hanna Bijl",
            email: "hanna_bijl@live.nl",
            imgAuthor: "/images/avatars/Avatar-62dc7badd3baf2dea27ad6bb.jpeg",
            prepTime: 90,
            hardness: "Simple",
            origin: "Mexico Cuisine",
            allergies: ["Sugar"],
            diet: "Vegaterian",
            coverImg: "/images/covers/Cover-62dcf418594615c1cd0c0282.jpeg",
            description: "One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 4,
            ingredients: [
               {
                    part: "For the crust",
                    subIngredients: [
                        {
                            amount: 400,
                            unit: "g",
                            what: "graham crackers",
                            identifier: "graham-crackers"
                        },
                        {
                            amount: 150,
                            unit: "g",
                            what: "unsalted butters, melted",
                            identifier: "unsalted-butters-melted"
                        }
                    ],
                },
                {   
                    part: "For the cheescake",
                    subIngredients: [
                        {
                            amount: 300,
                            unit: "g",
                            what: "marshmallows"
                        },
                        {
                            amount: 175,
                            unit: "g",
                            what: "unsalted butter, melted"
                        },
                        {
                            amount: 500,
                            unit: "g",
                            what: "Philadelphia cream cheese, softened"
                        },
                        {
                            amount: 250,
                            unit: "ml",
                            what: "thickened/whipping cream, warm"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered gelatin"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered water"
                        },
                        {
                            amount: 5,
                            unit: "drops",
                            what: "purple food gel"
                        },
                        {
                            amount: 3,
                            unit: "drops",
                            what: "blue food gel"
                        },
                    ],
                },
            ],
            instructions: [
                "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
                "Pour mixture into a 20cm (8”) tart tin. Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
                "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
                "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
                "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
                "Add the warm cream and melted gelatin mixture and mix until well combined.",
                "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
                "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
                "Slice with a knife to serve."
            ],
            nutritionFacts: [
                {
                    nutrition: "Calories",
                    amount: 219.9,
                    unit: "g"
                },
                {
                    nutrition: "Total Fat",
                    amount: 10.7,
                    unit: "g"
                },
                {
                    nutrition: "Saturated Fat",
                    amount: 2.2,
                    unit: "g"
                },
                {
                    nutrition: "Cholesterol",
                    amount: 37.4,
                    unit: "mg"
                },
                {
                    nutrition: "Sodium",
                    amount: 120.3,
                    unit: "mg"
                },
                {
                    nutrition: "Potassium",
                    amount: 32.8,
                    unit: "mg"
                },
                {
                    nutrition: "Total Carbohydrate",
                    amount: 22.3,
                    unit: "g"
                },
                {
                    nutrition: "Sugars",
                    amount: 8.4,
                    unit: "g"
                },
                {
                    nutrition: "Protein",
                    amount: 7.9,
                    unit: "g"
                }
            ],
            likes: 0
        },
        {
            title: "Pan Fried Cod in Creamy Kale Sauce",
            slug: "pan-fried-cod-in-creamy-kale-sauce",
            category: "Meat",
            type: "Dinner",
            image: "/images/thumbnail/Thumbnail-62dcf418594615c1cd0c0282.jpeg",
            author: "Hanna Bijl",
            email: "hanna_bijl@live.nl",
            imgAuthor: "/images/avatars/Avatar-62dc7badd3baf2dea27ad6bb.jpeg",
            prepTime: 90,
            hardness: "Simple",
            origin: "Mexico Cuisine",
            allergies: ["Sugar"],
            diet: "Paleo",
            coverImg: "/images/covers/Cover-62dcf418594615c1cd0c0282.jpeg",
            description: "One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 4,
            ingredients: [
               {
                    part: "For the crust",
                    subIngredients: [
                        {
                            amount: 400,
                            unit: "g",
                            what: "graham crackers"
                        },
                        {
                            amount: 150,
                            unit: "g",
                            what: "unsalted butters, melted"
                        }
                    ],
                },
                {   
                    part: "For the cheescake",
                    subIngredients: [
                        {
                            amount: 300,
                            unit: "g",
                            what: "marshmallows"
                        },
                        {
                            amount: 175,
                            unit: "g",
                            what: "unsalted butter, melted"
                        },
                        {
                            amount: 500,
                            unit: "g",
                            what: "Philadelphia cream cheese, softened"
                        },
                        {
                            amount: 250,
                            unit: "ml",
                            what: "thickened/whipping cream, warm"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered gelatin"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered water"
                        },
                        {
                            amount: 5,
                            unit: "drops",
                            what: "purple food gel"
                        },
                        {
                            amount: 3,
                            unit: "drops",
                            what: "blue food gel"
                        },
                    ],
                },
            ],
            instructions: [
                "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
                "Pour mixture into a 20cm (8”) tart tin. Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
                "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
                "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
                "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
                "Add the warm cream and melted gelatin mixture and mix until well combined.",
                "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
                "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
                "Slice with a knife to serve."
            ],
            nutritionFacts: [
                {
                    nutrition: "Calories",
                    amount: 219.9,
                    unit: "g"
                },
                {
                    nutrition: "Total Fat",
                    amount: 10.7,
                    unit: "g"
                },
                {
                    nutrition: "Saturated Fat",
                    amount: 2.2,
                    unit: "g"
                },
                {
                    nutrition: "Cholesterol",
                    amount: 37.4,
                    unit: "mg"
                },
                {
                    nutrition: "Sodium",
                    amount: 120.3,
                    unit: "mg"
                },
                {
                    nutrition: "Potassium",
                    amount: 32.8,
                    unit: "mg"
                },
                {
                    nutrition: "Total Carbohydrate",
                    amount: 22.3,
                    unit: "g"
                },
                {
                    nutrition: "Sugars",
                    amount: 8.4,
                    unit: "g"
                },
                {
                    nutrition: "Protein",
                    amount: 7.9,
                    unit: "g"
                }
            ],
            likes: 0
        },
        {
            title: "Berry Maddness Biscuts",
            slug: "berry-maddness-biscuts",
            category: "Sweets",
            type: "Dessert",
            image: "/images/thumbnail/Thumbnail-62dcf418594615c1cd0c0282.jpeg",
            author: "Hanna Bijl",
            email: "hanna_bijl@live.nl",
            imgAuthor: "/images/avatars/Avatar-62dc7badd3baf2dea27ad6bb.jpeg",
            prepTime: 120,
            hardness: "Hard",
            origin: "American Cuisine",
            allergies: ["Sugar"],
            diet: "Vegaterian",
            coverImg: "/images/covers/Cover-62dcf418594615c1cd0c0282.jpeg",
            description: "One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 4,
            ingredients: [
               {
                    part: "For the crust",
                    subIngredients: [
                        {
                            amount: 400,
                            unit: "g",
                            what: "graham crackers"
                        },
                        {
                            amount: 150,
                            unit: "g",
                            what: "unsalted butters, melted"
                        }
                    ],
                },
                {   
                    part: "For the cheescake",
                    subIngredients: [
                        {
                            amount: 300,
                            unit: "g",
                            what: "marshmallows"
                        },
                        {
                            amount: 175,
                            unit: "g",
                            what: "unsalted butter, melted"
                        },
                        {
                            amount: 500,
                            unit: "g",
                            what: "Philadelphia cream cheese, softened"
                        },
                        {
                            amount: 250,
                            unit: "ml",
                            what: "thickened/whipping cream, warm"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered gelatin"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered water"
                        },
                        {
                            amount: 5,
                            unit: "drops",
                            what: "purple food gel"
                        },
                        {
                            amount: 3,
                            unit: "drops",
                            what: "blue food gel"
                        },
                    ],
                },
            ],
            instructions: [
                "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
                "Pour mixture into a 20cm (8”) tart tin. Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
                "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
                "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
                "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
                "Add the warm cream and melted gelatin mixture and mix until well combined.",
                "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
                "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
                "Slice with a knife to serve."
            ],
            nutritionFacts: [
                {
                    nutrition: "Calories",
                    amount: 219.9,
                    unit: "g"
                },
                {
                    nutrition: "Total Fat",
                    amount: 10.7,
                    unit: "g"
                },
                {
                    nutrition: "Saturated Fat",
                    amount: 2.2,
                    unit: "g"
                },
                {
                    nutrition: "Cholesterol",
                    amount: 37.4,
                    unit: "mg"
                },
                {
                    nutrition: "Sodium",
                    amount: 120.3,
                    unit: "mg"
                },
                {
                    nutrition: "Potassium",
                    amount: 32.8,
                    unit: "mg"
                },
                {
                    nutrition: "Total Carbohydrate",
                    amount: 22.3,
                    unit: "g"
                },
                {
                    nutrition: "Sugars",
                    amount: 8.4,
                    unit: "g"
                },
                {
                    nutrition: "Protein",
                    amount: 7.9,
                    unit: "g"
                }
            ],
            likes: 0
        },
        {
            title: "Four Ingredient Oatmeal Pancakes",
            slug: "four-ingredient-oatmeal-pancakes",
            category: "Sweets",
            type: "Dessert",
            image: "/images/thumbnail/Thumbnail-62dcf418594615c1cd0c0282.jpeg",
            author: "Hanna Bijl",
            email: "hanna_bijl@live.nl",
            imgAuthor: "/images/avatars/Avatar-62dc7badd3baf2dea27ad6bb.jpeg",
            prepTime: 30,
            hardness: "Simple",
            origin: "American Cuisine",
            allergies: ["Sugar"],
            diet: "Vegan",
            coverImg: "/images/covers/Cover-62dcf418594615c1cd0c0282.jpeg",
            description: "One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 4,
            ingredients: [
               {
                    part: "For the crust",
                    subIngredients: [
                        {
                            amount: 400,
                            unit: "g",
                            what: "graham crackers"
                        },
                        {
                            amount: 150,
                            unit: "g",
                            what: "unsalted butters, melted"
                        }
                    ],
                },
                {   
                    part: "For the cheescake",
                    subIngredients: [
                        {
                            amount: 300,
                            unit: "g",
                            what: "marshmallows"
                        },
                        {
                            amount: 175,
                            unit: "g",
                            what: "unsalted butter, melted"
                        },
                        {
                            amount: 500,
                            unit: "g",
                            what: "Philadelphia cream cheese, softened"
                        },
                        {
                            amount: 250,
                            unit: "ml",
                            what: "thickened/whipping cream, warm"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered gelatin"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered water"
                        },
                        {
                            amount: 5,
                            unit: "drops",
                            what: "purple food gel"
                        },
                        {
                            amount: 3,
                            unit: "drops",
                            what: "blue food gel"
                        },
                    ],
                },
            ],
            instructions: [
                "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
                "Pour mixture into a 20cm (8”) tart tin. Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
                "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
                "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
                "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
                "Add the warm cream and melted gelatin mixture and mix until well combined.",
                "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
                "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
                "Slice with a knife to serve."
            ],
            nutritionFacts: [
                {
                    nutrition: "Calories",
                    amount: 219.9,
                    unit: "g"
                },
                {
                    nutrition: "Total Fat",
                    amount: 10.7,
                    unit: "g"
                },
                {
                    nutrition: "Saturated Fat",
                    amount: 2.2,
                    unit: "g"
                },
                {
                    nutrition: "Cholesterol",
                    amount: 37.4,
                    unit: "mg"
                },
                {
                    nutrition: "Sodium",
                    amount: 120.3,
                    unit: "mg"
                },
                {
                    nutrition: "Potassium",
                    amount: 32.8,
                    unit: "mg"
                },
                {
                    nutrition: "Total Carbohydrate",
                    amount: 22.3,
                    unit: "g"
                },
                {
                    nutrition: "Sugars",
                    amount: 8.4,
                    unit: "g"
                },
                {
                    nutrition: "Protein",
                    amount: 7.9,
                    unit: "g"
                }
            ],
            likes: 0
        },
        {
            title: "Pumpkin Marshmallow Pie and Nuts",
            slug: "pumpkin-marshmallow-pie-and-nuts",
            category: "Sweets",
            type: "Dessert",
            image: "/images/thumbnail/Thumbnail-62dcf418594615c1cd0c0282.jpeg",
            author: "Hanna Bijl",
            email: "hanna_bijl@live.nl",
            imgAuthor: "/images/avatars/Avatar-62dc7badd3baf2dea27ad6bb.jpeg",
            prepTime: 30,
            hardness: "Simple",
            origin: "France Cuisine",
            allergies: ["Dairy", "Sugar"],
            diet: "Vegaterian",
            coverImg: "/images/covers/Cover-62dcf418594615c1cd0c0282.jpeg",
            description: "One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 4,
            ingredients: [
               {
                    part: "For the crust",
                    subIngredients: [
                        {
                            amount: 400,
                            unit: "g",
                            what: "graham crackers"
                        },
                        {
                            amount: 150,
                            unit: "g",
                            what: "unsalted butters, melted"
                        }
                    ],
                },
                {   
                    part: "For the cheescake",
                    subIngredients: [
                        {
                            amount: 300,
                            unit: "g",
                            what: "marshmallows"
                        },
                        {
                            amount: 175,
                            unit: "g",
                            what: "unsalted butter, melted"
                        },
                        {
                            amount: 500,
                            unit: "g",
                            what: "Philadelphia cream cheese, softened"
                        },
                        {
                            amount: 250,
                            unit: "ml",
                            what: "thickened/whipping cream, warm"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered gelatin"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered water"
                        },
                        {
                            amount: 5,
                            unit: "drops",
                            what: "purple food gel"
                        },
                        {
                            amount: 3,
                            unit: "drops",
                            what: "blue food gel"
                        },
                    ],
                },
            ],
            instructions: [
                "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
                "Pour mixture into a 20cm (8”) tart tin. Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
                "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
                "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
                "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
                "Add the warm cream and melted gelatin mixture and mix until well combined.",
                "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
                "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
                "Slice with a knife to serve."
            ],
            nutritionFacts: [
                {
                    nutrition: "Calories",
                    amount: 219.9,
                    unit: "g"
                },
                {
                    nutrition: "Total Fat",
                    amount: 10.7,
                    unit: "g"
                },
                {
                    nutrition: "Saturated Fat",
                    amount: 2.2,
                    unit: "g"
                },
                {
                    nutrition: "Cholesterol",
                    amount: 37.4,
                    unit: "mg"
                },
                {
                    nutrition: "Sodium",
                    amount: 120.3,
                    unit: "mg"
                },
                {
                    nutrition: "Potassium",
                    amount: 32.8,
                    unit: "mg"
                },
                {
                    nutrition: "Total Carbohydrate",
                    amount: 22.3,
                    unit: "g"
                },
                {
                    nutrition: "Sugars",
                    amount: 8.4,
                    unit: "g"
                },
                {
                    nutrition: "Protein",
                    amount: 7.9,
                    unit: "g"
                }
            ],
            likes: 0
        },
        {
            title: "Mighty Cheesy Breakfast Burger",
            slug: "mighty-cheesy-breakfast-burger",
            category: "Complex",
            type: "Lunch",
            image: "/images/thumbnail/Thumbnail-62dcf418594615c1cd0c0282.jpeg",
            author: "Hanna Bijl",
            email: "hanna_bijl@live.nl",
            imgAuthor: "/images/avatars/Avatar-62dc7badd3baf2dea27ad6bb.jpeg",
            prepTime: 30,
            hardness: "Simple",
            origin: "American Cuisine",
            allergies: ["Mustard"],
            diet: "Keto",
            coverImg: "/images/covers/Cover-62dcf418594615c1cd0c0282.jpeg",
            description: "One thing I learned living in the Canarsie section of Brooklyn, NY was how to cook a good Italian meal. Here is a recipe I created after having this dish in a restaurant. Enjoy!",
            servings: 4,
            ingredients: [
               {
                    part: "For the crust",
                    subIngredients: [
                        {
                            amount: 400,
                            unit: "g",
                            what: "graham crackers"
                        },
                        {
                            amount: 150,
                            unit: "g",
                            what: "unsalted butters, melted"
                        }
                    ],
                },
                {   
                    part: "For the cheescake",
                    subIngredients: [
                        {
                            amount: 300,
                            unit: "g",
                            what: "marshmallows"
                        },
                        {
                            amount: 175,
                            unit: "g",
                            what: "unsalted butter, melted"
                        },
                        {
                            amount: 500,
                            unit: "g",
                            what: "Philadelphia cream cheese, softened"
                        },
                        {
                            amount: 250,
                            unit: "ml",
                            what: "thickened/whipping cream, warm"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered gelatin"
                        },
                        {
                            amount: 3,
                            unit: "tbsp",
                            what: "powdered water"
                        },
                        {
                            amount: 5,
                            unit: "drops",
                            what: "purple food gel"
                        },
                        {
                            amount: 3,
                            unit: "drops",
                            what: "blue food gel"
                        },
                    ],
                },
            ],
            instructions: [
                "To prepare crust add graham crackers to a food processor and process until you reach fine crumbs. Add melted butter and pulse 3-4 times to coat crumbs with butter.",
                "Pour mixture into a 20cm (8”) tart tin. Use the back of a spoon to firmly press the mixture out across the bottom and sides of the tart tin. Chill for 30 min.",
                "Begin by adding the marshmallows and melted butter into a microwave safe bowl. Microwave for 30 seconds and mix to combine. Set aside.",
                "Next, add the gelatine and water to a small mixing bowl and mix to combine. Microwave for 30 seconds.",
                "Add the cream cheese to the marshmallow mixture and use a hand mixer or stand mixer fitted with a paddle attachment to mix until smooth.",
                "Add the warm cream and melted gelatin mixture and mix until well combined.",
                "Add 1/3 of the mixture to a mixing bowl, add purple food gel and mix until well combined. Colour 1/3 of the mixture blue. Split the remaining mixture into two mixing bowls, colour one pink and leave the other white.",
                "Pour half the purple cheesecake mixture into the chill tart crust. Add half the blue and then add the remaining purple and blue in the tart tin. Use a spoon to drizzle some pink cheesecake on top. Use a skewer or the end of a spoon to swirl the pink. Add some small dots of the plain cheesecake mixture to create stars and then sprinkle some more starts on top before chilling for 2 hours.",
                "Slice with a knife to serve."
            ],
            nutritionFacts: [
                {
                    nutrition: "Calories",
                    amount: 219.9,
                    unit: "g"
                },
                {
                    nutrition: "Total Fat",
                    amount: 10.7,
                    unit: "g"
                },
                {
                    nutrition: "Saturated Fat",
                    amount: 2.2,
                    unit: "g"
                },
                {
                    nutrition: "Cholesterol",
                    amount: 37.4,
                    unit: "mg"
                },
                {
                    nutrition: "Sodium",
                    amount: 120.3,
                    unit: "mg"
                },
                {
                    nutrition: "Potassium",
                    amount: 32.8,
                    unit: "mg"
                },
                {
                    nutrition: "Total Carbohydrate",
                    amount: 22.3,
                    unit: "g"
                },
                {
                    nutrition: "Sugars",
                    amount: 8.4,
                    unit: "g"
                },
                {
                    nutrition: "Protein",
                    amount: 7.9,
                    unit: "g"
                }
            ],
            likes: 0
        },
    ],
}

export default data;