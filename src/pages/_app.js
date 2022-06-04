import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;