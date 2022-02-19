import React from 'react';
import Header from '../components/Header';
import auth from '../components/services/authService'
import http from '../components/services/httpService'
import { useEffect, useState } from 'react';
import Results from '../components/Results';
import { useRouter } from 'next/router';
import Sorting from '../components/common/Sorting';

async function fetchingSaved() {
    const { data } = await http.post('/myCollections', { email: auth.getCurrentUser().email })
    return data
}

function SavedCollection() {
    const [savedMovies, setSavedMovies] = useState([])
    const [totalOfMovies, setTotalOfMovies] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (!auth.getCurrentUser()) return router.push('/login')
        fetchingSaved()
            .then(res => {
                console.log(res)
                setSavedMovies(res)
                setTotalOfMovies(res.length)
            })
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            <div>
                <Header />
                <div className='container w-full h-auto m-auto p-0 flex justify-between'>
                    <Sorting />
                    <p className='px-4 py-2 bg-slate-500 rounded-full'>{totalOfMovies}</p>
                </div>
                <Results results={savedMovies} setSavedMovies={setSavedMovies} />
            </div>
        </>
    );
}

export default SavedCollection;

