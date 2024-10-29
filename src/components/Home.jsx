import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center max-w-2xl">
                Welcome to <span className="text-black">&lt;</span>
                <span className='text-blue-700'>Pass</span>
                <span className="text-black">Haven/&gt;</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                PassHaven is a secure password manager that helps you store and manage your passwords safely.
                Our app uses advanced encryption techniques to ensure your sensitive information is always protected.
            </p>

            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-500 mb-2">AES Encryption</h3>
                    <p className="text-gray-600">
                        We utilize AES (Advanced Encryption Standard) to encrypt your passwords before storing them in our database,
                        ensuring that only you can access your sensitive data.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-500 mb-2">Responsive User Interface</h3>
                    <p className="text-gray-600">
                        Our intuitive design makes it easy for you to manage your passwords, with a seamless experience on both web and mobile.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-500 mb-2">Cross-Platform Support</h3>
                    <p className="text-gray-600">
                        Access your passwords securely from any device. PassHaven is available on web browsers, ensuring you can manage your passwords anywhere.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-500 mb-2">Secure Backup</h3>
                    <p className="text-gray-600">
                        Your data is securely backed up, so you never have to worry about losing your passwords. We take data integrity seriously.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-500 mb-2">Web Extension for Autofill</h3>
                    <p className="text-gray-600">
                        Autofill your login credentials across websites with our web extension for effortless, secure access.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-blue-500 mb-2">Easy Password Generation</h3>
                    <p className="text-gray-600">
                        Generate strong, random passwords with our built-in password generator, making it easier to keep your accounts secure.
                    </p>
                </div>
            </div>

            <h2 className="text-3xl font-semibold text-blue-600 mt-12 mb-4 text-center">Why Choose PassHaven?</h2>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                At PassHaven, we prioritize your security and privacy. Our application is built with the latest technology to ensure that
                your passwords are protected. Experience peace of mind knowing that your sensitive information is safe with us.
            </p>
        </div>
    );
};

export default Home;
