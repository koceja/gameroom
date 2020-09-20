import React from 'react';
import Page from '../page.js';

import './groups.css';

function Content() {
    return (<div id="groups">Groups</div>);
}

function Home() {
    return (
        <Page
            page="groups"
            noFooter={true}
            content={<Content />}
        />
    );
	
}

export default Home;
