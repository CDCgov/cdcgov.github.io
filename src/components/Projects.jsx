// FEATURE: Jordon: Retrieve API data, and throw into a database for x time before expire, or sessionStorageCache, to prevent client rate limiting?
// TODO: Jordon: Make a proper response.status === 403. Alerting the user of limit via RateLimit Component.
// TODO: Retrieve Data and if check, convert: const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
import axios from 'axios';
import RateLimit from './rateLimit';
import { useState, useEffect, useMemo } from 'react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { Combobox } from '@headlessui/react';

console.clear();
const Projects = () => {
	let apiData = [
		{ id: 1, projectName: '' },
		{ id: 2, projectName: '' },
	];

	const [projects, setProjects] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	const [query, setQuery] = useState('');
	const [selectedProject, setSelectedProject] = useState();

	const endpoints = useMemo(
		() => [
			'https://api.github.com/users/CDCGov/repos?page=1&per_page=100',
			'https://api.github.com/users/CDCGov/repos?page=2&per_page=100',
			'https://api.github.com/users/CDCGov/repos?page=3&per_page=100',
			'https://api.github.com/users/CDCGov/repos?page=4&per_page=100',
		],
		[],
	);

	axios.all(endpoints.map((endpoint) => axios.get(endpoint)));

	useEffect(() => {
		axios
			.all(endpoints.map((endpoint) => axios.get(endpoint)))
			.catch((error) => {
				setErrorMessage(error);
			})
			.then(
				axios.spread((...responses) => {
					setProjects([...responses[0].data, ...responses[1].data, ...responses[2].data, ...responses[3].data]);
				}),
			);
	}, [endpoints]);

	let propId = Object.getOwnPropertyNames(apiData);

	for (let i = 0; i < projects.length; i++) {
		if (propId.length < projects.length) {
			apiData.unshift({
				id: i,
				projectName: projects[i].name,
				projectLang: projects[i].language,
			});
		}
	}

	// TODO: Separate the search component into another file, for easier maintenance.
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	const filterApiData =
		query === ''
			? apiData
			: apiData.filter((projectData) => {
					return projectData.projectName.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<div className='projects bg-slate-900'>
			{errorMessage !== null && <RateLimit />}
			{/* Search Component */}
			<Combobox
				as='div'
				value={selectedProject}
				onChange={setSelectedProject}
				className='md:container md:max-w-screen-xl md:mx-auto'
			>
				<Combobox.Label className='block text-sm font-medium text-gray-300'>Search by Project Name:</Combobox.Label>
				<div className='relative mt-1'>
					<Combobox.Input
						className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
						onChange={(event) => setQuery(event.target.value)}
						placeholder='Search'
						displayValue={(projectData) => projectData && projectData.projectName}
					/>

					<Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
						<SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</Combobox.Button>

					{filterApiData.length > 0 && (
						<Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{filterApiData.map((projectData) => (
								<Combobox.Option
									key={projectData.id}
									value={projectData}
									className={({ active }) =>
										classNames(
											'relative cursor-default select-none py-2 pl-3 pr-9',
											active ? 'bg-indigo-600 text-black' : 'text-gray-900',
										)
									}
								>
									{({ active, selected }) => (
										<>
											<span className={classNames('block truncate', selected && 'font-semibold')}>{projectData.projectName}</span>

											{selected && (
												<span
													className={classNames(
														'absolute inset-y-0 right-0 flex items-center pr-4',
														active ? 'text-black' : 'text-indigo-600',
													)}
												>
													<CheckIcon className='h-5 w-5' aria-hidden='true' />
												</span>
											)}
										</>
									)}
								</Combobox.Option>
							))}
						</Combobox.Options>
					)}
				</div>
			</Combobox>
			{/* Search Component End */}
			<div className='relative bg-slate-900 pt-5 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-28 lg:px-8'>
				<div className='absolute inset-0'>
					<div className='h-1/3 sm:h-2/3' />
				</div>
				<div className='relative max-w-7xl mx-auto'>
					<div className='mt-10 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none'>
						{/* Card Section Start */}
						{projects.map((project) => (
							<div key={project.id} className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
								<div className='flex-1 bg-gray-50 p-6 flex flex-col justify-between'>
									<div className='flex-1'>
										<p className='text-sm font-medium text-blue-700'>{project.language}</p>
										<a href={project.html_url} target='_blank' rel='noreferrer noopener' className='hover:underline'>
											<p className='text-xl font-semibold text-gray-900'>{project.name}</p>
										</a>
										<p className='mt-3 text-base text-gray-600'>{project.description}</p>
									</div>
									<div className='mt-6 flex items-center'>
										<div className='ml-3'>
											<p className='text-sm font-medium text-gray-900'>
												<a href={project.language} className='hover:underline'>
													{project.full_name}
												</a>
											</p>
											<div className='flex space-x-1 text-sm text-gray-500'>
												<p>{project.created_at}</p>
												<span aria-hidden='true'> </span>
												<a href={project.html_url} target='_blank' rel='noreferrer noopener' className='text-black'>
													View Code
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Projects;
