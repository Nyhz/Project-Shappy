import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import moment from 'moment';

export default function SummaryInfo(props) {

    const formatDate = (date) => { // TODO PASAR A UTILS
        return moment.utc(date).format('MMM Do, YYYY')
    }

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <div className='sum_image_container'>
                        <img src={props.group?.data.group.groupAvatar} alt="Group Avatar" />
                    </div>
                </Col>
                <Col xs={12}>
                    <div className='sum_info_container'>
                        <h2>{props.group?.data.group.name}</h2>
                        <br />
                        <p>From {formatDate(props.group?.data.group.createdAt)} to {formatDate(props.group?.data.group.endDate)}</p>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}
