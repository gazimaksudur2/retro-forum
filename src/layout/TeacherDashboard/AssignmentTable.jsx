import { IoMdAdd } from 'react-icons/io';
import SubmittedAssignment from './SubmittedAssignment';
import CreateAssignment from './CreateAssignment';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AssignmentTable = ({course}) => {
    // const assignments = ['a', 'b', 'c'];
    const [assignments, setAssignments] = useState([]);
    const axiosSecure = useAxiosSecure();
    
    useEffect(()=>{
        axiosSecure.get(`assignments?course_title=${course?.course_title}&instructor=${course?.instructor}`)
        .then(res=>{
            setAssignments(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[course]);

    const pushNew = (doc)=>{
        setAssignments([...assignments, doc]);
    }

    return (
        <div className='p-3 w-full'>
            <div>
                <CreateAssignment  course={course} pushNew={pushNew}/>
                <section className="container px-4 mx-auto">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800">Assignments</h2>

                                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{assignments?.length} Posted</span>
                            </div>

                            {/* <p className="mt-1 text-sm text-gray-500">These companies have purchased in the last 12 months.</p> */}
                        </div>
                        <div>
                            <button onClick={() => document.getElementById('my_modal_1').showModal()} className='flex justify-center items-center gap-1 bg-green-600 px-3 py-2 rounded-badge text-white hover:bg-green-400 active:scale-95'>
                                <IoMdAdd size={25} />
                                Create
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col mt-6 ">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    <button className="flex items-center gap-x-3 focus:outline-none">
                                                        <span>Assignment Title</span>

                                                        <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1" />
                                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                                        </svg>
                                                    </button>
                                                </th>


                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    Description
                                                </th>

                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    Status
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Assigned At</th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Deadline</th>

                                                <th scope="col" className="relative py-3.5 px-4">

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {
                                                assignments.map((assign, idx) => <SubmittedAssignment key={idx} assign={assign} />)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                        <div className="text-sm text-gray-500">
                            Page <span className="font-medium text-gray-700">1 of 10</span>
                        </div>

                        <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                            <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>

                                <span>
                                    previous
                                </span>
                            </a>

                            <a href="#" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100">
                                <span>
                                    Next
                                </span>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>


            </div>
        </div>
    );
};

export default AssignmentTable;