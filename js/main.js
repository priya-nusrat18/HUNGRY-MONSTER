const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const inputField = document.getElementById('inputField');
    const term = inputField.value ;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
        if(term == "" || term == null){
                alert("I am priya Not Priyanka");
            }
            else{
                displayMeal(data);
            }
    })
    .catch(error => alert('you type wrong mealname'))
});

const displayMeal = foods =>{
    const mealDiv = document.getElementById('list-single-box');
    foods.meals.forEach(meal => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'food';

        const foodInfo =`
        <img onclick="displayDetail('${meal.idMeal}')"  class="food-img" src="${meal.strMealThumb}">
        <p class="food-name">${meal.strMeal}</p>
        `
        foodDiv.innerHTML=foodInfo;
        mealDiv.appendChild(foodDiv);
    });
}

const displayDetail = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        fetch(url)
        .then(res => res.json())
        .then(data => renderInfo(data.meals[0]));
}
const renderInfo = meal => {
    const foodsDiv = document.getElementById('meal-detail')
    foodsDiv.innerHTML =`
    <img  class="detail-food-img" src ="${meal.strMealThumb}">
    <h1>${meal.strMeal}</h1>
    <h3>Ingredient</h3>
    <p>1- ${meal.strIngredient1} ${meal.strMeasure1}</p>
    <p>2-  ${meal.strIngredient2} ${meal.strMeasure2}</p>
    <p>3-  ${meal.strIngredient3} ${meal.strMeasure3}</p>
    <p>4-  ${meal.strIngredient4} ${meal.strMeasure4}</p>
    <p>5- ${meal.strIngredient5} ${meal.strMeasure5}</p>
    <p>6-  ${meal.strIngredient6} ${meal.strMeasure6}</p>

    `
}
