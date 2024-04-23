import React, {SVGProps} from 'react';
import {styled} from "styled-components";
import {Container, Row, Col, Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

/* Page template reference: https://www.bootdey.com/snippets/view/500-internal-server-error-page */

const Error = () => {
    const navigate = useNavigate();

    return (
        <ErrorPageStyle>
            <Container>
                <Row>
                    <Col sm="6">
                        <SVGComponent/>
                    </Col>
                    <Col sm="6">
                        <MessageBoxStyle className="message-box">
                            <h1 className="m-b-0">Oops!</h1>
                            <p>Error occurred.</p>
                        </MessageBoxStyle>
                        <div className='buttons-con'>
                            <div className='action-link-wrap'>
                                <Button onClick={() => navigate(-1)} variant='info'
                                        className='btn-custom waves-effect waves-light m-t-20'>Go Back</Button>{' '}
                                <Button onClick={() => navigate('/')} variant='info'
                                        className='btn-custom waves-effect waves-light m-t-20'>Go to Main page</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </ErrorPageStyle>
    );
};

/* converted to React component and optimized at https://www.svgviewer.dev/ */
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        className='svg-box'
        width={380}
        height={500}
        viewBox='0 0 837 1045'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
    >
        <g strokeWidth={6} fill='none' fillRule='evenodd'>
            <path
                d='m353 9 273.664 161v317L353 642 79.336 487V170z'
                stroke='#3bafda'
            />
            <path
                d='m78.5 529 68.5 40.186v79.125L78.5 687 10 648.311v-79.125z'
                stroke='#7266ba'
            />
            <path
                d='m773 186 54 31.539v62.098L773 310l-54-30.363v-62.098z'
                stroke='#f76397'
            />
            <path
                d='m639 529 134 78.847v155.245L639 839l-134-75.908V607.847z'
                stroke='#00b19d'
            />
            <path
                d='m281 801 102 60.025v118.187L281 1037l-102-57.788V861.025z'
                stroke='#fa0'
            />
        </g>
    </svg>
);

const ErrorPageStyle = styled.body`
    background: #f5f5f5;
    font-family: 'Noto Sans', sans-serif;
    margin: 0;
    color: #4c5667;
    overflow-x: hidden !important;
    padding-top: 40px;
`;

const MessageBoxStyle = styled.div`
    h1 {
        color: #252932;
        font-size: 98px;
        font-weight: 700;
        line-height: 98px;
        text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
    }
`

export default Error;