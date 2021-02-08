const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', function () {
    const inputField = document.getElementById('inputField');
    const term = inputField.value ;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
        if(term == "" || term == null){
                alert("sorry! not found");
            }
            else{
                displayMeal(data);
            }
    })
    .catch(error => alert('Opps! you type wrong meal name'))
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
        .then(data => renderInfo(data));
}
const renderInfo = details => {
    const foodsDiv = document.getElementById('meal-detail')
    foodsDiv.innerHTML = `
                <img class="detail-food-img" src="${details.meals[0].strMealThumb}">
                <div class="details">
                    <h1> ${details.meals[0].strMeal} </h1>
                    <h4> Ingredient </h4>
                    <ul id="details-list"></ul>
                </div>
         `;
        countIngredient(details.meals[0]);
}
const countIngredient = details => {
    for(let i=1; i<=10; i++){
        let ingredient = `strIngredient${i}`;
        let measure = `strMeasure${i}`;
        if(details[ingredient] != ""){
            const li = document.createElement("li");
            li.innerHTML = `<p> ${details[measure]} <span>${details[ingredient]}</span> </p>`
            document.getElementById("details-list").appendChild(li);
        }
    }
}



