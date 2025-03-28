import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import { SWRConfig } from 'swr';
import { Provider } from 'jotai';
import Layout from '../components/Layout.js';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../lib/authenticate.js";

// SWR fetcher functionality implementation included along with the layout
export default function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated() && router.pathname !== "/api/user/login" && router.pathname !== "/api/user/register") router.replace("/api/user/login"); 
            else setLoading(false);
        };
        checkAuth();
    }, [router.pathname]);

    if (loading && router.pathname !== "/api/user/login" && router.pathname !== "/api/user/register") {
        return null; // preventing flashing of unauthorized pages before redirect operation
    }

    return (
        <Provider> {/* Provides Jotai atom state globally */}
            <SWRConfig
                value={{
                    fetcher: async (url) => {
                        const res = await fetch(url);
                        if (!res.ok) {
                            const error = new Error('An error occurred while fetching the data.');
                            error.info = await res.json();
                            error.status = res.status;
                            throw error;
                        }
                        return res.json();
                    },
                }}
            >
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SWRConfig>
        </Provider>
    );
};
