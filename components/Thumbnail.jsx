import Image from "next/image";
import { ThumbUpIcon } from '@heroicons/react/outline'
import { forwardRef, useState } from "react";
import Modal from "./common/Modal";
import auth from '../components/services/authService';

const Thumbnail = forwardRef(({ result, }, ref) => {
    const [modalStat, setModalStat] = useState(false)

    const BASE_URL = 'https://image.tmdb.org/t/p/original';
    const imgSrc = `${BASE_URL}${result.poster_path}` || `${BASE_URL}${result.backdrop_path}`;

    return (
        <>
            {
                auth.getCurrentUser() && modalStat && <Modal
                    modalStat={modalStat}
                    setModalStat={setModalStat}
                    result={result}
                    imgSrc={imgSrc}
                />
            }
            <div
                onClick={() => {
                    setModalStat(!modalStat);
                }}

                ref={ref} className="p-4 m-1 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 ">
                <Image
                    alt={result.title || ''}
                    src={imgSrc}
                    layout="responsive"
                    height={800}
                    width={680}
                    className="object-cover bg-[#fff] rounded-md"
                    quality='50'
                    loading="lazy"
                    sizes="100vw"

                />
                <div className="p-8">
                    <p className="truncate max-w-md">{result.overview}
                    </p>
                    <h2 className="mt-1 text-2xl text-white transition-all ease-in-out duration-100 group-hover:font-bold">
                        {result.title || result.original_name}
                    </h2>
                    <p className="flex items-center opacity-0 group-hover:opacity-100">
                        {
                            result.media_type && `${result.media_type} ·`
                        }
                        {' '}
                        {result.release_date || result.first_air_date} · {' '}
                        <ThumbUpIcon className="h-5 mx-2" />{result.vote_count}
                    </p>
                </div>
                <div>
                </div>
            </div>
        </>

    );
})

Thumbnail.displayName = "Thumbnail";
export default Thumbnail;
