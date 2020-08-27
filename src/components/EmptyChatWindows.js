import React from 'react';
import {Container,Row,Col} from "react-bootstrap";

class EmptyChatWindows extends React.Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col md={12}>
                       Please start chat 
                    </Col>
                </Row>
            </Container>
        ); 
    }
}

export default EmptyChatWindows;