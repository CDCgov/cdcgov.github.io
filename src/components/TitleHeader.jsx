const TitleHeader = () => {
	return (
		<div className='h-full bg-gray-50'>
			<div className='max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8'>
				<div className='text-center'>
					<h2 className='text-base tablet:text-lg font-semibold text-blue-600 tracking-wide uppercase'>FOSS @ CDC</h2>
					<p className='mt-1 text-lg tablet:text-2xl laptop:text-4xl font-bold text-gray-800 sm:tracking-tight'>
						Free, Open-Source Software Built By CDC
					</p>
					<p className='max-w-xl mt-5 mx-auto text-base tablet:text-xl text-gray-700'>
						Tools for Managing, Visualizing, Analyzing Public Health Data
					</p>
					<p className='text-sm text-gray-800 mt-2'>
						A remake of{' '}
						<a href='https://cdcgov.github.io' className='text-bold underline text-blue-600' target='_blank' rel='noreferrer noopener'>
							CDC Portal Site
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default TitleHeader;