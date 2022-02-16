import { useRouter } from 'next/router';
import fetching from '../utlis/requests';


function Nav() {
    const router = useRouter()
    return (
        <nav className='relative'>
            {/* 
                px: padding X-axis
                sm: small breakpoint
                last: last-child 
                pr: padding right
            */}
            <div className='flex px-10 sm:px-20 text-2xl whitespace-nowrap space-x-10 sm:space-x-20 overflow-x-scroll scrollbar-hide'>
                {
                    Object.entries(fetching)
                        .map(([key, { title, url }]) =>
                        (
                            <h2
                                onClick={() => router.push(`?genre=${key}`)}
                                key={key}
                                className='last:pr-24 cursor-pointer transition duration-100 transform hover:scale-125 hover:text-white active:text-red-500'
                            >
                                {title}
                            </h2>))
                }
            </div>
            <div className='absolute top-0 right-0 bd-gradient-to-l from-[#06202A] h-10 w-1/12' />
        </nav>
    );
}

export default Nav;