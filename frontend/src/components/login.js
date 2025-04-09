import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Alert, Button, Card, Container, Form} from 'react-bootstrap';

const Login = ({setToken}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {email, password});
            setToken(response.data.token);
            navigate('/admin');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <Container className="py-5">
            <Card className="mx-auto" style={{maxWidth: '400px'}}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <h2>Login</h2>
                    </Card.Title>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>

                    {message && (
                        <Alert variant="danger" className="mt-3">
                            {message}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;