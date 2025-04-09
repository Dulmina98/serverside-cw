import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row, Table} from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = ({token}) => {
    const [keys, setKeys] = useState([]);
    const [message, setMessage] = useState('');
    const [countryName, setCountryName] = useState('');
    const [countryDetails, setCountryDetails] = useState(null);
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        const fetchKeys = async () => {
            try {
                const response = await axios.get('/admin', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setKeys(response.data.keys);
            } catch (error) {
                setMessage('Failed to load API keys');
            }
        };
        fetchKeys();
    }, [token]);

    const generateKey = async () => {
        try {
            await axios.post(
                '/admin/keys/generate',
                {},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setMessage('API key generated');
            const response = await axios.get('/admin', {
                headers: {Authorization: `Bearer ${token}`},
            });
            setKeys(response.data.keys);
        } catch (error) {
            setMessage('Failed to generate key');
        }
    };

    const revokeKey = async (id) => {
        try {
            await axios.post(
                `/admin/keys/${id}/revoke`,
                {},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setMessage('API key revoked');
            const response = await axios.get('/admin', {
                headers: {Authorization: `Bearer ${token}`},
            });
            setKeys(response.data.keys);
        } catch (error) {
            setMessage('Failed to revoke key');
        }
    };

    const fetchCountryDetails = async () => {
        if (!countryName) {
            setFetchError('Please enter a country name');
            return;
        }
        if (!keys.length) {
            setFetchError('Please generate an API key first');
            return;
        }
        const activeKey = keys.find((key) => key.is_active)?.api_key;
        if (!activeKey) {
            setFetchError('No active API key available');
            return;
        }

        try {
            const response = await axios.get(`/api/countries/${countryName}`, {
                headers: {'X-API-Key': activeKey},
            });
            setCountryDetails(response.data);
            setFetchError('');
            const keysResponse = await axios.get('/admin', {headers: {Authorization: `Bearer ${token}`}});
            setKeys(keysResponse.data.keys);
        } catch (error) {
            setFetchError(error.response?.data?.error || 'Failed to fetch country details');
            setCountryDetails(null);
        }
    };

    return (
        <Container className="py-5">
            <Card>
                <Card.Body>
                    <Row className="mb-4">
                        <Col>
                            <Card.Title as="h2">Admin Dashboard</Card.Title>
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary" onClick={generateKey}>
                                Generate New API Key
                            </Button>
                        </Col>
                    </Row>

                    {message && (
                        <Alert
                            variant={message.includes('Failed') ? 'danger' : 'success'}
                            className="mb-4"
                        >
                            {message}
                        </Alert>
                    )}

                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>API Key</th>
                            <th>Created</th>
                            <th>Last Used</th>
                            <th>Usage Count</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {keys.map((key) => (
                            <tr key={key.id}>
                                <td>{key.api_key}</td>
                                <td>{key.created_at}</td>
                                <td>{key.last_used || 'Never'}</td>
                                <td>{key.usage_count}</td>
                                <td>
                    <span
                        className={`badge ${
                            key.is_active ? 'bg-success' : 'bg-danger'
                        }`}
                    >
                      {key.is_active ? 'Active' : 'Revoked'}
                    </span>
                                </td>
                                <td>
                                    {key.is_active && (
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => revokeKey(key.id)}
                                        >
                                            Revoke
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Card className="mt-4">
                <Card.Body>
                    <Card.Title as="h3">Fetch Country Details</Card.Title>
                    <Form.Group className="mb-3">
                        <Row className="align-items-center">
                            <Col xs={12} md={8} className="mb-2 mb-md-0">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter country name (e.g., Japan)"
                                    value={countryName}
                                    onChange={(e) => setCountryName(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} md={4}>
                                <Button variant="primary" onClick={fetchCountryDetails} className="w-100">
                                    Fetch Details
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>

                    {fetchError && (
                        <Alert variant="danger" className="mb-3">
                            {fetchError}
                        </Alert>
                    )}

                    {countryDetails && (
                        <div>
                            <h4>{countryDetails.name}</h4>
                            <p>
                                <strong>Capital:</strong> {countryDetails.capital?.join(', ') || 'N/A'}
                            </p>
                            <p>
                                <strong>Currency:</strong>{' '}
                                {Object.values(countryDetails.currency)[0]?.name || 'N/A'} (
                                {Object.keys(countryDetails.currency)[0]})
                            </p>
                            <p>
                                <strong>Languages:</strong>{' '}
                                {Object.values(countryDetails.languages).join(', ') || 'N/A'}
                            </p>
                            <img
                                src={countryDetails.flag}
                                alt={`${countryDetails.name} flag`}
                                style={{maxWidth: '100px'}}
                                onError={(e) => {
                                    e.target.src = 'https://demofree.sirv.com/nope-not-here.jpg';
                                }}
                            />
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminDashboard;