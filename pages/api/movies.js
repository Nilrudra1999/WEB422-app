/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay Student ID: 134061175 Date: 01/02/2025
*  Vercel Link: https://web-assignment1-ceb6.vercel.app/api/movies
*
********************************************************************************/

// Talks to the API endpoint and acts as a middle-man between main.js fetch request and the API
export default async function handler(req, res) {
  const { page = 1, perPage = 10, title } = req.query;
  const baseURL = `https://web-assignment1-ceb6.vercel.app/api/movies?page=${page}&perPage=${perPage}`;
  const url = title ? `${baseURL}&title=${encodeURIComponent(title)}` : baseURL;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}