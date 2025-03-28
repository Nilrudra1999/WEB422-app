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
import { registerUser } from "../lib/authenticate";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

export default function Register() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords do not match!");
            return;
        }
        try {
            const result = await registerUser(user, password, password2);
            if (result) router.push("/api/user/login");
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: "400px" }} className="p-4 shadow">
                <Card.Body>
                    <h2 className="mb-3 text-center">Register</h2>
                    <p className="text-center">Create an account to continue.</p>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100">Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};
