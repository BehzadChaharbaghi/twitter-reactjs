import React from 'react';
import Tweet from "./Tweet";

const TweetList = ({data}) => {
    return (
        <div>
            {data.map(tweets => (<Tweet data={tweets}/>))}
        </div>
    );
};

export default TweetList;