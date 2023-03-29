import Link from 'next/link';
import Image from 'next/image';
import { useCallback } from 'react';
import sortByMonthName from '@/utils/sortByMonthName';
import GithubMonthlyCommit from '../Viz/GithubMonthlyCommit';

const ContactCard = ({ data }) => {

    const getCommitCountByMonthLogged = useCallback(() => {
        const sortedMonthName = sortByMonthName(Object.keys(data['superinference']['activity']['commit_count_per_month']), true)
        const sortedMonthCountLast12 = sortedMonthName.map(monthName => data['superinference']['activity']['commit_count_per_month'][monthName][0])
        // combine the two above into an object
        const commit_count_by_month = sortedMonthName.map(
            (monthName, index) => ({ x: monthName, y: Math.max(0, Math.log(sortedMonthCountLast12[index])) })
        )
        console.log(commit_count_by_month)
        return commit_count_by_month
    }, [data])

    return (
        <div className="col-span-12 md:col-span-4 text-white my-8 mx-1 self-start">
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Personal Details</h3>
            <div className="border-white border rounded-lg shadow-lg p-4">
                <div className="flex flex-row items-start">
                    <div className="flex flex-col basis-1/4">
                        <div className="avatar mr-2">
                            <div className="w-12 rounded-full">
                                <Image src={data['superinference']['profile']['avatar_url']}
                                    alt={data['fullname']}
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col basis-1/2">
                        <span className='leading-none font-semibold'>{data['fullname']}</span>
                        {/* social links */}
                        <div className="flex flex-row gap-x-2 mt-1">
                            {
                                data['website'] &&
                                <Link href={data['website']} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                    Website
                                </Link>
                            }
                            {
                                data['linkedin'] &&
                                <Link href={data['linkedin']} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                    LinkedIn
                                </Link>
                            }
                            <Link href={`https:github.com/${data['github_handle']}`} target="_blank" rel="noopener noreferrer" className='text-sm link-info hover:opacity-70'>
                                GitHub
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col basis-1/4">
                        <label htmlFor="enquire-modal"
                            className="btn btn-outline btn-xs rounded hover:bg-rose-700">Enquire</label>
                    </div>
                </div>
                <ul className="text-xs text-gray-400 mt-2">
                    <li>Availability: Part-time</li>
                    <li>Location: Remote / Anywhere in the world</li>
                    {/* <li>Location: Jakarta, Indonesia</li> */}
                    {/* <li>Valued Perks: Remote Working, Flexible Hours, Health Insurance, Growth Opportunities</li>
                            <li>Hiring Arrangements: Freelance / Fully Managed by Supertype</li> */}
                </ul>
            </div>

            <GithubMonthlyCommit data={getCommitCountByMonthLogged()} />
        </div>
    )
}

export default ContactCard
