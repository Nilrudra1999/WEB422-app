/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 04/07/2025
*
********************************************************************************/
export function setToken(token) { 
    localStorage.setItem("token", token); 
};
  
export function getToken() { 
    return localStorage.getItem("token"); 
};

export function removeToken() { 
    localStorage.removeItem("token"); 
};

export function readToken() {
    const token = getToken();
    if (!token) return null;
    try { // tries to decodes JWT payload
        return JSON.parse(atob(token.split(".")[1])); 
    } catch (e) {
        return null;
    }
};

export function isAuthenticated() {
    return getToken() !== null;
};

export async function authenticateUser(userName, password) {
    const res = await fetch(`${"https://web-422-user-api-ashen.vercel.app/"}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
    });
    if (res.status === 200) {
        const data = await res.json();
        setToken(data.token);
        return true;
    }
    return false;
};

export async function registerUser(userName, password, password2) {
    const res = await fetch(`${"https://web-422-user-api-ashen.vercel.app/"}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password, password2 }),
    });
    return res.status === 200; // No token is stored for registration
};
