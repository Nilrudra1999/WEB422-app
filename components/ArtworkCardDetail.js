/*********************************************************************************
*  WEB422 – Assignment 5
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 03/25/2025
*
*
********************************************************************************/ 
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import { favouritesAtom } from '@/store';

const fetcher = (url) => fetch(url).then((res) => res.json()); // fetcher function for SWR

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    // Update showAdded if objectID is in the favourites
    useEffect(() => {
        setShowAdded(favouritesList.includes(objectID));
    }, [favouritesList, objectID]);

    const favouritesClicked = () => {
        if (showAdded) {
            setFavouritesList(current => current.filter(fav => fav !== objectID));
            setShowAdded(false);
        } else {
            setFavouritesList(current => [...current, objectID]);
            setShowAdded(true);
        }
    };

    // Error guard statements, for null values, and other errors
    if (error) { return <Error statusCode={404} />; }
    if (!data) { return null; }

    const { primaryImage, title, objectDate, classification, medium, artistDisplayName, creditLine, dimensions, artistWikidata_URL } = data;

    return (
        <Card> {/* renders the Card.Img only if and when the primaryImage value exists */}
            {primaryImage && <Card.Img variant="top" src={primaryImage} alt={title || 'N/A'} />}
            <Card.Body>
                <Card.Title>{title || 'N/A'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {objectDate || 'N/A'}<br />
                    <strong>Classification:</strong> {classification || 'N/A'}<br />
                    <strong>Medium:</strong> {medium || 'N/A'}
                    <br /><br />
                    {/* renders artist's name but doesn't render the url to the wiki page if it doesn't exist */}
                    <strong>Artist:</strong> {artistDisplayName ? (
                        <>
                            {artistDisplayName}
                            {artistWikidata_URL && (
                                <> <a href={artistWikidata_URL} target="_blank" rel="noreferrer">(wiki)</a></>
                            )}
                        </>
                    ) : 'N/A'}<br />
                    <strong>Credit Line:</strong> {creditLine || 'N/A'}<br />
                    <strong>Dimensions:</strong> {dimensions || 'N/A'}<br />
                </Card.Text>
                <Button
                    variant={showAdded ? 'primary' : 'outline-primary'}
                    onClick={favouritesClicked}
                >
                    {showAdded ? '+ Favourite (added)' : '+ Favourite'}
                </Button>
            </Card.Body>
        </Card>
    );
};
