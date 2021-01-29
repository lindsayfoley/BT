import React, { FunctionComponent, useEffect, useState}  from 'react';
import SearchResults, { TArticleList } from '../SearchResults';

const NEWS_API_URL = 'https://newsapi.org/v2';
const API_KEY = '11e41bf5c1b548a29424441eeeaf3906';

const getArticles = async (article: string) => {
    const response = await fetch(`${NEWS_API_URL}/everything?q${article}&api${API_KEY}`);
    return await response.json();
}

const mockArticleList: TArticleList = [
    { title: 'headline', author: 'me', description: 'this is a test' },
    { title: 'headline2', author: 'me2', description: 'this is a test2' }
];

const SearchForm: FunctionComponent = () => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [articleResults, setArticleResults] = useState<object | null>(null);
    const [hasErrored, setHasErrored] = useState<boolean>(false);

    useEffect(() => {
        handleButtonClick();
    });

    const handleOnChange = () => {
        setSearchTerm('');
    }

    const handleButtonClick = async () => {
        if (searchTerm) {
            try {
                const data = await getArticles(searchTerm);
                setArticleResults(data.articles);
            } catch(e) {
                setHasErrored(true);
            }
        }
    }

    return (
        <section>
            <h1>BT React Code Test - by Lindsay Foley - 28/1/21</h1>
            {hasErrored && (
                <h3>Sorry! We can't find that article, try searching again...</h3>
            )}
            <form>
                <label>What news article can I get you?</label>
                <input type="text" onChange={handleOnChange} />
                <button onClick={handleButtonClick}>Search</button>
            </form>
            {articleResults && (
                <SearchResults {...mockArticleList} />
            )}
        </section>
    )
}

export default SearchForm;