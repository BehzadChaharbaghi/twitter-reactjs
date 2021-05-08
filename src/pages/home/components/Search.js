import React, {useEffect, useState} from 'react';

const Search = () => {

    const [query, setQuery] = useState();

    useEffect(() => {
        if (!query)
            return;
        console.log(query);
    }, [query])

    return (
        <div>
            <input value={query} onChange={e => setQuery(e.target.value)}/>
        </div>
    );
};

export default Search;