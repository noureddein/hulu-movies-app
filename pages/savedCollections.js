import React from 'react';
import Header from '../components/Header';
import auth from '../components/services/authService'
import http from '../components/services/httpService'
import { useEffect, useState } from 'react';
import Results from '../components/Results';
import { useRouter } from 'next/router';


async function fetchingSaved() {
    const { data } = await http.post('/myCollections', { email: auth.getCurrentUser().email })
    return data
}

function SavedCollection() {
    const [savedMovies, setSavedMovies] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (!auth.getCurrentUser()) return router.push('/login')
        fetchingSaved()
            .then(res => {
                res.delete = 'ok'
                setSavedMovies(res)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div>
                <Header />
                <Results results={savedMovies} setSavedMovies={setSavedMovies} />
            </div>
        </>
    );
}

export default SavedCollection;

