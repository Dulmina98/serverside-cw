import React, {useState} from 'react';
import {Alert, Button, Card, Col, Container, Row, Table} from 'react-bootstrap';

const AdminDashboard = ({token}) => {
    const [keys, setKeys] = useState([]);
    const [message, setMessage] = useState('');

    return (
        <Container className="py-5">
            <Card>
                <Card.Body>
                    <Row className="mb-4">
                        <Col>
                            <Card.Title as="h2">Admin Dashboard</Card.Title>
                        </Col>
                        <Col className="text-end">
                            <Button variant="primary">
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
        </Container>
    );
};

export default AdminDashboard;