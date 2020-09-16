import React from 'react';
import {Container,Row,Col} from "react-bootstrap";
import { getUser } from '../Utils/Common';


class EmptyChatWindows extends React.Component {
    render() {
        const user = getUser();
        const obj = JSON.parse(user);
        return (
            <Container>
                <Row>
                    <Col md={12}>
                       Welcome! {obj.firstName}
                    </Col>
                </Row>
            </Container>
        ); 
    }
}

export default EmptyChatWindows;