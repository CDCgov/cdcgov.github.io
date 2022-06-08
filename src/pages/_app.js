import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>FOSS @ CDC</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta name='description' content="CDC's Open Source Portfolio" />
			</Head>

			<Component {...pageProps} />
		</>
	);
};

export default MyApp;