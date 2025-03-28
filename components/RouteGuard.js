/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay   Student ID: 134061175   Date: 04/07/2025
*
********************************************************************************/
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { isAuthenticated } from '@/lib/authenticate';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register', '/', '/search', '/_error'];

export default function RouteGuard(props) {
    const [authorized, setAuthorized] = useState(false);
    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();

    useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        return () => { router.events.off('routeChangeComplete', authCheck); };
    }, [router.pathname, router.events]);

    async function updateAtoms() {
        const favs = await getFavourites();
        const history = await getHistory();
        setFavourites(favs);
        setSearchHistory(history);
    };

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    };

    return <>{authorized && props.children}</>;
};
