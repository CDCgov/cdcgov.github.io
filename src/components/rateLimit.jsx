import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon } from '@heroicons/react/outline';

export default function Example() {
	const [open, setOpen] = useState(true);

	const cancelButtonRef = useRef(null);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={setOpen}>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
							<div className='sm:flex sm:items-start'>
								<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-50 sm:mx-0 sm:h-10 sm:w-10'>
									<ExclamationIcon className='h-6 w-6 text-yellow-400' aria-hidden='true' />
								</div>
								<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
									<Dialog.Title as='h3' className='text-lg leading-6 font-medium text-gray-900'>
										Whoops!
									</Dialog.Title>
									<div className='mt-2'>
										<p className='text-sm text-gray-500'>
											Rate Limited by GitHub API. If you think this is a mistake, please check your internet connection and try
											again.
										</p>
										{'\n'}
										<p className='mt-2 text-sm text-gray-500'>
											Troubleshooting Tips: Try using a VPN. If you already are, switch your proxy.
										</p>
									</div>
								</div>
							</div>
							<div className='mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex'>
								<button
									type='button'
									className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm'
									onClick={() => setOpen(false)}
								>
									Okay
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}