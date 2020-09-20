import React from 'react';
import Page from '../page.js';

function Content() {
    return (<div>profile</div>);
}

function Home() {
    return (
        <Page
            page="profile"
            noFooter={false}
            content={<Content />}
        />
    );
	
}

export default Home;
