/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 04/07/2025
*
********************************************************************************/
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '@/store';
import { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

// Gets the search history when user enters something into the search bar and parses them into objects
export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [parsedHistory, setParsedHistory] = useState([]);
    const router = useRouter();

    if (!searchHistory) return null;
    
    useEffect(() => { // process parsed search history whenever the search history changes
        const parsed = searchHistory.map((h) => {
            let params = new URLSearchParams(h);
            let entries = params.entries();
            return Object.fromEntries(entries);
        });
        setParsedHistory(parsed);
    }, [searchHistory]);

    const historyClicked = (e, index) => {
        router.push(`/artwork?${searchHistory[index]}`);
    };

    const removeHistoryClicked = async (e, index) => {
        e.stopPropagation(); // prevent navigation event
        setSearchHistory(await removeFromHistory(searchHistory[index]));
    };

    return (
        <Container>
            <br />
            {parsedHistory.length === 0 ? (
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <h4>Your Search History</h4>
                            <p>Nothing Here. Try searching for something new!</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item
                            key={index}
                            className={styles.historyListItem}
                            onClick={(e) => historyClicked(e, index)}
                        >
                            {Object.keys(historyItem).map((key) => (
                                <span key={key}>
                                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                                </span>
                            ))}
                            <Button
                                className="float-end"
                                variant="danger"
                                size="sm"
                                onClick={(e) => removeHistoryClicked(e, index)}
                            >
                                &times;
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Container>
    );
};
