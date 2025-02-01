/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay Student ID: 134061175 Date: 16/01/2025
*  Vercel API Link: https://web-assignment1-ceb6.vercel.app/api/movies
*
********************************************************************************/
let page = 1;
const perPage = 10;

// Main function for API data retrival and data rendering---------------------------------------------------------------
function loadMovieData(title = null) {
    const baseURL = `https://web-assignment1-ceb6.vercel.app/api/movies`;
    let url = title 
        ? `${baseURL}?page=${page}&perPage=${perPage}&title=${encodeURIComponent(title)}`
        : `${baseURL}?page=${page}&perPage=${perPage}`;
    title 
        ? document.querySelector('.pagination').classList.add('d-none')
        : document.querySelector('.pagination').classList.remove('d-none');
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        renderData(data);
        updateCurrentPage();        
    })
    .catch((err) => console.error('Error fetching data:', err));
};



// Rendering data (array) and other helper functions -------------------------------------------------------------------
function renderData(data) {
    console.log('data rendering...');   // using array map and template literal
    const tbodyContent = data.map(movie => `
        <tr id="${movie._id}">
            <td>${movie.year}</td>
            <td>${movie.title}</td>
            <td>${movie.plot || 'N/A'}</td>
            <td>${movie.rated ? movie.rated.toUpperCase() : 'N/A'}</td>
            <td>${parseRuntime(movie.runtime)}</td>
        </tr>
    `).join('');
    const tbody = document.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = tbodyContent;
    }
};

// Helper function for the rendering helper, used to parse movie runtime values
function parseRuntime(runtime) {
    if (runtime === undefined) return '';
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    minutes = minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Rendering the page number for each page
function updateCurrentPage() {
    document.getElementById('current-page').textContent = `${page}`;
}



// Loading initial movie data onto the page
document.addEventListener("DOMContentLoaded", function () {
    loadMovieData();
});
