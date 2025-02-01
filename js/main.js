/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay Student ID: 134061175 Date: 16/01/2025
*  Vercel Link: https://web-assignment1-ceb6-wptfbyec4-nilrudra-mukhopadhyays-projects.vercel.app/api/movies
*
********************************************************************************/
let page = 1;
const perPage = 10;

// Main function for API data retrival and data rendering---------------------------------------------------------------
async function loadMovieData(title = null) {
    const baseURL = `https://web-assignment1-ceb6.vercel.app/api/movies`;
    let url = +title 
        ? `${baseURL}?page=${page}&perPage=${perPage}&title=${encodeURIComponent(title)}` 
        : `${baseURL}?page=${page}&perPage=${perPage}`;

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.error('Error fetching data:', err));
};


// Loading initial movie data onto the page
document.addEventListener("DOMContentLoaded", function () {
    loadMovieData();
});
