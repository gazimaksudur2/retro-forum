const ReviewSlide = ({review}) => {
    // console.log(review);
    return (
        <div>
            <section className="">
                <div className="max-w-6xl px-6 py-10 mx-auto">
                    <p className="text-xl font-medium text-blue-500 ">Testimonials</p>

                    <h1 className="mt-2 text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
                        What clients saying
                    </h1>

                    <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
                        <div className="absolute w-full bg-blue-600 -z-10 md:h-96 rounded-2xl"></div>

                        <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
                            <img className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl" src={review?.user_url} alt="client photo" />

                            <div className="mt-2 md:mx-6">
                                <div>
                                    <p className="text-xl font-medium tracking-tight text-white">{review?.user_name}</p>
                                    <p className="text-blue-200 ">{review?.course_title}</p>
                                </div>

                                <p className="mt-4 text-lg leading-relaxed text-white md:text-xl"> {review?.description}</p>

                                {/* <div className="flex items-center justify-between mt-6 md:justify-start">
                                    <button title="left arrow" className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    <button title="right arrow" className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-blue-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    );
};

export default ReviewSlide;