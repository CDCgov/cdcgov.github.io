// TODO: Jordon: Filterable, Sortable, by Alphabetical, Watchers, size, forks, etc. Just like the official page.
// Suggestion, Jordon: Images for projects are a bit redundant? Consumes data, slows client?
import { SelectorIcon } from '@heroicons/react/solid';
import TitleHeader from '../components/TitleHeader';
import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import Head from 'next/head';

console.clear();
const Home = ({ projects }) => {
	const [query, setQuery] = useState('');
	const [selectedProject, setSelectedProject] = useState();

	// const [sortBy, setSortBy] = useState('alphabetical');
	// const [sortOrder, setSortOrder] = useState('ascending');

	const filterApiData = !query
		? projects
		: projects.filter((projects) => {
				return projects.name.toLowerCase().includes(query.toLowerCase());
		  });

	let projectSearch = projects.filter((projectItem) => {
		return projectItem.name.toLowerCase().includes(query.toLowerCase());
	});

	const searchText = (event) => {
		setQuery(event.target.value);
	};

	const searchOnClick = (projects) => {
		setQuery(projects.name);
	};

	const formatDate = (str) => {
		return str.substring(0, 10);
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	return (
		<>
			<Head>
				<title>FOSS @ CDC</title>
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				<meta name='description' content="CDC's Open Source Portfolio" />
			</Head>

			<TitleHeader />
			{/* Search Component Start */}
			<Combobox
				as='div'
				value={selectedProject}
				onChange={setSelectedProject}
				className='md:container md:max-w-screen-xl md:mx-auto'
			>
				<div className='relative w-3/4 laptop:w-full container sm:max-w-screen-xl mx-auto'>
					<p className='block text-sm font-medium text-gray-800'>
						Search by Project Name:
						<p className='text-sm mb-1 font-medium text-gray-800'>
							Total Projects: <span>{projects.length}</span>
						</p>
					</p>
					<Combobox.Input
						className='w-full rounded-sm border border-gray-400 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm'
						onChange={searchText.bind(this)}
						placeholder='Search'
						displayValue={(projects) => projects && projects.name}
					/>

					<Combobox.Button className='absolute inset-y-0 right-0 flex rounded-r-sm px-2 focus:outline-none'>
						<SelectorIcon className='h-5 w-5 text-gray-500' aria-hidden='true' />
					</Combobox.Button>

					{filterApiData.length > 0 && (
						<Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{filterApiData.map((projects) => (
								<Combobox.Option
									key={projects.id}
									value={projects}
									onClick={searchOnClick.bind(this, projects)}
									className={({ active }) =>
										classNames(
											'relative cursor-default select-none py-2 pl-3 pr-9',
											active ? 'bg-CDCBlue text-black' : 'text-gray-900',
										)
									}
								>
									{({ active, selected }) => (
										<>
											<span className={classNames('block truncate', selected && 'font-semibold')}>{projects.name}</span>
											{selected && (
												<span
													className={classNames(
														'absolute inset-y-0 right-0 flex projectCards-center pr-4',
														active ? 'text-black' : 'text-CDCBlue',
													)}
												></span>
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
			<div className='relative bg-gray-50 pt-5 pb-20 px-4 sm:px-6 lg:pt-8 lg:pb-28 lg:px-8'>
				<div className='absolute inset-0'>
					<div className='h-1/3 sm:h-2/3' />
				</div>
				<div className='relative max-w-7xl mx-auto'>
					<div className='mt-4 tablet:mt-7 laptop:mt-10 max-w-xl mx-auto grid gap-6 lg:grid-cols-3 lg:max-w-none'>
						{/* Card Section Start */}
						{projectSearch.map((projectCard) => (
							<div key={projectCard.id} className='flex flex-col rounded-md shadow-md shadow-gray-300 overflow-hidden'>
								<div className='flex-1 bg-white p-6 flex flex-col justify-between'>
									<div className='flex-1'>
										<p className='text-sm font-medium text-CDCBlue'>{projectCard.language}</p>
										<a href={projectCard.html_url} target='_blank' rel='noreferrer noopener' className='hover:underline'>
											<p className='text-xl font-semibold text-gray-900'>{projectCard.name}</p>
										</a>
										<p className='mt-3 text-sm tablet:text-base text-gray-700'>{projectCard.description}</p>
									</div>
									<div className='mt-3 tablet:mt-6 flex projectCards-center'>
										<div className='ml-2'>
											<div className='flex space-x-3'>
												<p className='text-sm font-medium text-gray-800'>{projectCard.forks} Forks</p>
												<p className='text-sm font-medium text-gray-800'>{projectCard.open_issues} Issues</p>
											</div>
											<div className='flex space-x-1 text-sm text-gray-500 mt-1'>
												<p>{formatDate(projectCard.created_at)}</p>
												<span aria-hidden='true'> </span>
												<a href={projectCard.html_url} target='_blank' rel='noreferrer noopener' className='text-black'>
													<button
														type='button'
														className='inline-flex items-center px-2 py-1 tablet:px-2.5 tablet:py-1.5 border border-gray-400 shadow-sm text-xs font-medium rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
													>
														View Code
													</button>
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
		</>
	);
};

// SEE: https://nextjs.org/docs/basic-features/data-fetching/overview
export async function getStaticProps() {
	// TODO: Jordon: Make Pages dynamic instead of static so you don't need to maintain.
	const pages = [1, 2, 3, 4, 5];
	const endpoints = pages.map((page) => `https://api.github.com/users/CDCGov/repos?page=${page}&per_page=100`);

	// Use axios?
	const projects = await Promise.all(endpoints.map((endpoint) => fetch(endpoint).then((res) => res.json())));

	return {
		props: {
			projects: projects.flat(),
		},
		revalidate: 350,
	};
}

export default Home;