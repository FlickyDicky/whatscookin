export default function Home() {
    return (
        <main>
            <div className="relative overflow-hidden hero bg-secondary min-h-[35em] rounded-lg shadow-lg shadow-gray-300">
                <div className="mockup-phone absolute hidden top-auto bottom-[-15em] left-[-4.5em] hover:bottom-[-10em] transition-all duration-500 xl:left-3 lg:inline-block shadow-md shadow-gray-950">
                    <div className="camera"></div>
                    <div className="display">
                        <div className="artboard artboard-demo phone-1">
                            <div className="bg-gray-100 h-[100%] w-[100%] flex place-items-center justify-center flex-col">
                                <h1 className="text-2xl font-bold calistoga-regular text-neutral">
                                    whatscookin
                                </h1>
                                <p>Comming Soon to mobile</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute hidden rotate-[220deg] top-[-30%] right-[-10em] hover:top-[-23%] hover:rotate-[230deg] transition-all duration-300 xl:right-[-3em] lg:inline-block">
                    <img src={"images/frying-pan.png"} alt="" />
                </div>
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold calistoga-regular text-gray-100 md:text-6xl pointer-events-none">
                            whatscookin
                        </h1>
                        <p className="py-6 text-lg text-secondary-content px-1 md:px-0 pointer-events-none">
                            <span className="font-bold calistoga-regular">
                                whatscookin
                            </span>{" "}
                            is the ultimate platform to showcase your culinary
                            skills,{" "}
                            <b>find inspiration for your next meal</b>, and{" "}
                            <b>connect with fellow food lovers.</b> Turn your
                            passion for cooking into a thriving community.
                        </p>
                        <div className="flex gap-2 justify-center">
                            <button className="btn btn-gray-100">
                                Start Sharing
                            </button>
                            <button className="btn btn-outline">
                                See Recipes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
