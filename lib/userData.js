/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 04/07/2025
*
********************************************************************************/
import { getToken } from "./authenticate";

async function fetchWithAuth(url, method = "GET", body = null) {
    const token = getToken();
    if (!token) return [];
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        },
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(url, options);
    return res.status === 200 ? res.json() : [];
};

export function addToFavourites(id) {
    return fetchWithAuth(`${"https://web-422-user-api-ashen.vercel.app"}/api/user/favourites/${id}`, "PUT");
};

export function removeFromFavourites(id) {
    return fetchWithAuth(`${"https://web-422-user-api-ashen.vercel.app"}/api/user/favourites/${id}`, "DELETE");
};

export function getFavourites() {
    return fetchWithAuth(`${"https://web-422-user-api-ashen.vercel.app"}/api/user/favourites`);
};

export function addToHistory(id) {
    return fetchWithAuth(`${"https://web-422-user-api-ashen.vercel.app"}/api/user/history/${id}`, "PUT");
};

export function removeFromHistory(id) {
    return fetchWithAuth(`${"https://web-422-user-api-ashen.vercel.app"}/api/user/history/${id}`, "DELETE");
};

export function getHistory() {
    return fetchWithAuth(`${"https://web-422-user-api-ashen.vercel.app"}/api/user/history`);
};
