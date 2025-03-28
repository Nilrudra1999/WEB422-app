/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 04/07/2025
*
********************************************************************************/
import { useState } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "../lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { getFavourites, getHistory } from "../lib/userData";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();
    const [, setFavouritesList] = useAtom(favouritesAtom);
    const [, setSearchHistory] = useAtom(searchHistoryAtom);

    async function updateAtoms() { // updates favourites and history from API fetched data
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const result = await authenticateUser(user, password);
            if (result) {
                await updateAtoms(); // Fetch favourites/history before redirect
                router.push("/api/user/favourites");
            }
        } catch (err) {
            setError("Invalid username or password.");
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: "400px" }} className="p-4 shadow">
                <Card.Body>
                    <h2 className="mb-3 text-center">Login</h2>
                    <p className="text-center">Enter your credentials to log in.</p>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
