import { useEffect } from 'react'
import auth from '../services/authService';

function Logout() {
    useEffect(() => {
        auth.logout()
        window.location = '/'
    })
    if (auth.getCurrentUser()) window.location = '/'
    return null
}



export default Logout;  