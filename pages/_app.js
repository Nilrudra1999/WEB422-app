import "@/styles/globals.css";
import { SWRConfig } from 'swr';
import { Provider } from 'jotai';
import Layout from '../components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

// SWR fetcher functionality implementation included along with the layout
export default function MyApp({ Component, pageProps }) {
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
