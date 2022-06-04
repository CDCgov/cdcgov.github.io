import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html className='h-full bg-gray-50'>
				<Head />
				<body className='h-full bg-gray-50'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;