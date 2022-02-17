import Image from "next/image";
import { ArrowSmLeftIcon, TrashIcon } from '@heroicons/react/outline';
import http from '../services/httpService';
import auth from "../services/authService";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function Modal({ modalStat, setModalStat, result, imgSrc }) {

    const user = auth.getCurrentUser()
    const router = useRouter()

    const handleSave = async movieInfo => {
        const filteredMovie = new FilterMovieInfo(movieInfo)
        try {
            const { data } = await http.post(`/save`, { filteredMovie, email: user.email })
            if (data === 'Movie already exist!') return toast.warning('Movie already exist!');
            if (data === 'Added to collections') return toast.success('Added to collections');
            else return toast.error(data)

        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async movieId => {
        http.post(`/deleteMovie/${movieId}`, { email: user.email })
            .then(res => {
                router.reload('/savedCollections')
                toast.info(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className=' fixed top-0 left-0 w-screen h-screen bg-[#3A687A4d] flex flex-col justify-center items-center z-20 overflow-scroll'>
                <div className=" w-full  xsm:w-11/12 container z-50 bg-[#090e2a] rounded-lg xsm:overflow-scroll xsm:my-4">
                    <div className="shadow-lg bg-[#090e2a0a] w-full flex items-center justify-start p-4  rounded-tl-md rounded-tr-md xsm:sticky xsm:top-0 xsm:z-50 xsm:bg-[#090e2a]">
                        <div className="w-8 cursor-pointer">
                            <ArrowSmLeftIcon className=" hover:text-white h-8 " onClick={() => setModalStat(!modalStat)} />
                        </div>
                        <div className="w-full text-center">
                            {result.title || result.original_title || result.name}
                        </div>
                    </div>
                    <div className="rounded-lg  bg-[#090e2a] w-full flex flex-row-reverse xsm:flex xsm:flex-col xsm:py-4">
                        <div className="w-11/12 p-2 h-auto xsm:w-full">
                            <Image
                                alt={result.title || ''}
                                src={imgSrc}
                                width={1000}
                                height={1000}
                                className=" object-cover rounded-md border border-black shadow-lg"
                            />
                        </div>
                        <div className="w-full">
                            <section className="p-4 mx-6 bg-[#64748b1a] rounded-lg border border-black shadow-lg xsm:m-2">
                                <p>Overview:</p>
                                <p>{result.overview}</p>
                            </section>
                            <div className="mx-6 my-4 flex justify-around  items-center">
                                {
                                    !result.movie_id && <button onClick={() => handleSave(result)} className="bg-[#3fcc56] px-4 py-2 rounded-lg text-white text-base font-extralight hover:bg-orange-300 ">Add to favorite</button>
                                }
                                {
                                    result.movie_id && <button onClick={() => handleDelete(result.movie_id)} className=" bg-red-800  font-extralight rounded-full text-base text-white h-12 w-12 text-center hover:animate-pulse"><TrashIcon className="m-auto text-white h-6 text-center w-6 shadow-lg" /></button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;

class FilterMovieInfo {
    constructor(movieInfo) {
        const {
            vote_count,
            overview,
            original_title,
            poster_path,
            backdrop_path,
            release_date,
            title,
            id,
            media_type,
            name,
            first_air_date
        } = movieInfo

        this.vote_count = vote_count
        this.overview = overview
        this.title = original_title || title || name
        this.poster_path = poster_path || backdrop_path
        this.release_date = release_date || first_air_date
        this.id = id
        this.media_type = media_type
    }

}

