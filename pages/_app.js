/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay Student ID: 134061175 Date: 01/02/2025
*  Vercel API Link: https://web-assignment1-ceb6.vercel.app/api/movies
*  Vercel App Link:
*
********************************************************************************/
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
    return (
        <SWRConfig value={{ fetcher: (...args) => fetch(...args).then((res) => res.json()) }}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SWRConfig>
    );
};
