
import React from 'react';
import Header from '../components/Header'
import Content from '../components/Content'

import { Container } from '@material-ui/core';

export default function Main() {

    return (
        <Container>
            <Header/>
            <Content/>
        </Container>
    );
}
