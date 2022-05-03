import Projects from '../components/Projects';
import Search from '../components/Search';

const Home = () => {
	return (
		<div className='h-full bg-slate-900'>
			<div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
				<div className='text-center'>
					<h2 className='text-lg font-semibold text-blue-200 tracking-wide uppercase'>FOSS @ CDC</h2>
					<p className='mt-1 text-2xl font-bold text-gray-200 sm:text-3xl sm:tracking-tight lg:text-4xl'>
						Free, Open-Source Software Built By CDC
					</p>
					<p className='max-w-xl mt-5 mx-auto text-xl text-gray-300'>
						Tools for Managing, Visualizing, Analyzing Public Health Data
					</p>
				</div>
			</div>

		
			<Projects />
		</div>
	);
};

export default Home;