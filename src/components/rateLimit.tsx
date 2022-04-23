import { ExclamationIcon } from '@heroicons/react/solid';

const RateLimit: React.FunctionComponent = () => {
	return (
		<div className='rounded-md bg-yellow-50 p-4 md:container md:max-w-screen-xl md:mx-auto'>
			<div className='flex'>
				<div className='flex-shrink-0'>
					<ExclamationIcon className='h-5 w-5 text-yellow-400' aria-hidden='true' />
				</div>
				<div className='ml-3'>
					<h3 className='text-sm font-medium text-yellow-800'>Whoops! Your on a cooldown!</h3>
					<div className='mt-2 text-sm text-yellow-700'>
						<p>Rate Limited by GitHub API. Please try again in a bit!</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RateLimit;