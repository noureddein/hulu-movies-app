import Image from 'next/image';
import { useRouter } from 'next/router'
import HeaderItem from './HeaderItem';
import {
    HomeIcon,
    BadgeCheckIcon,
    CollectionIcon,
    LightningBoltIcon,
    SearchIcon,
    UserAddIcon,
    LoginIcon,
    LogoutIcon,
    UserCircleIcon
} from "@heroicons/react/outline";
import auth from './services/authService';



function Header() {
    const router = useRouter();
    const username = auth.getCurrentUser() || ''
    return (
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center">
            <div className="flex flex-grow justify-evenly max-w-2xl">
                <HeaderItem title='HOME' Icon={HomeIcon} />
                <HeaderItem title='TRENDING' Icon={LightningBoltIcon} />
                <HeaderItem title='VERIFIED' Icon={BadgeCheckIcon} />
                <HeaderItem title='COLLECTIONS' Icon={CollectionIcon} slugLink='/savedCollections' />
                <HeaderItem title='SEARCH' Icon={SearchIcon} />
                {
                    auth.getCurrentUser() ?
                        <>
                            <HeaderItem title='LOGOUT' Icon={LogoutIcon} slugLink='/logout' />
                            <span>
                                <HeaderItem title={`Welcome,${username.username}`} Icon={UserCircleIcon} slugLink='' />
                            </span>
                        </>

                        :
                        <>
                            <HeaderItem title='LOGIN' Icon={LoginIcon} slugLink='/login' />
                            <HeaderItem title='REGISTER' Icon={UserAddIcon} slugLink='/signUp' />
                        </>
                }

            </div>
            <Image
                src="https://links.papareact.com/ua6"
                width={200}
                height={100}
                alt="Hulu Logo"
                className="object-contain"
            />
        </header>
    );
}

export default Header;

