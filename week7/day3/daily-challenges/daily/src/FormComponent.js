import React from "react";

function FormComponent(props) {
    return (
        <main className="max-w-lg mx-auto p-6 font-sans">
            {/* Form Header */}
            <h1 className="text-2xl font-bold text-center mb-6">Sample form</h1>

            {/* Form Section */}
            <div className="bg-white border border-gray-300 rounded-sm p-6 mb-6">
                <form onSubmit={props.handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div>
                        <label className="block font-bold text-gray-900 mb-2">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={props.data.firstName}
                            onChange={props.handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-gray-900 mb-2">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={props.data.lastName}
                            onChange={props.handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block font-bold text-gray-900 mb-2">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={props.data.age}
                            onChange={props.handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600"
                        />
                    </div>

                    {/* Gender Radio */}
                    <div>
                        <label className="block font-bold text-gray-900 mb-2">Gender</label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={props.data.gender === "male"}
                                    onChange={props.handleChange}
                                    className="h-4 w-4 text-gray-700 border-gray-400 focus:ring-gray-500"
                                />
                                <span className="ml-2 text-gray-700">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={props.data.gender === "female"}
                                    onChange={props.handleChange}
                                    className="h-4 w-4 text-gray-700 border-gray-400 focus:ring-gray-500"
                                />
                                <span className="ml-2 text-gray-700">Female</span>
                            </label>
                        </div>
                    </div>

                    {/* Destination Select */}
                    <div>
                        <label className="block font-bold text-gray-900 mb-2">Select your destination</label>
                        <select
                            name="destination"
                            value={props.data.destination}
                            onChange={props.handleChange}
                            className="w-full px-3 py-2 border border-gray-400 rounded-none focus:outline-none focus:border-gray-600 appearance-none bg-white"
                        >
                            <option value="">Please Choose a destination</option>
                            <option value="Japan">Japan</option>
                            <option value="Brazil">Brazil</option>
                            <option value="France">France</option>
                        </select>
                    </div>

                    {/* Horizontal Divider */}
                    <hr className="border-gray-300 my-4" />

                    {/* Dietary Restrictions */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Dietary restrictions:</h2>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="nutsFree"
                                    checked={props.data.nutsFree}
                                    onChange={props.handleChange}
                                    className="h-4 w-4 text-gray-700 border-gray-400 rounded-none focus:ring-gray-500"
                                />
                                <span className="ml-2 text-gray-700">Nuts free</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="lactoseFree"
                                    checked={props.data.lactoseFree}
                                    onChange={props.handleChange}
                                    className="h-4 w-4 text-gray-700 border-gray-400 rounded-none focus:ring-gray-500"
                                />
                                <span className="ml-2 text-gray-700">Lactose free</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="vegan"
                                    checked={props.data.vegan}
                                    onChange={props.handleChange}
                                    className="h-4 w-4 text-gray-700 border-gray-400 rounded-none focus:ring-gray-500"
                                />
                                <span className="ml-2 text-gray-700">Vegan</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full py-2 bg-gray-200 text-gray-900 font-medium border border-gray-400 rounded-none hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                        Submit
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div className="bg-white border border-gray-300 rounded-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Entered information:</h2>
                <div className="space-y-3 text-gray-700">
                    <p><span className="font-medium">Your name:</span> {props.data.firstName} {props.data.lastName}</p>
                    <p><span className="font-medium">Your age:</span> {props.data.age}</p>
                    <p><span className="font-medium">Your gender:</span> {props.data.gender}</p>
                    <p><span className="font-medium">Your destination:</span> {props.data.destination}</p>
                    <p><span className="font-medium">Your dietary restrictions:</span></p>
                    <div className="ml-4 space-y-1">
                        <p><span className="font-medium">Nuts free:</span> {props.data.nutsFree ? "Yes" : "No"}</p>
                        <p><span className="font-medium">Lactose free:</span> {props.data.lactoseFree ? "Yes" : "No"}</p>
                        <p><span className="font-medium">Vegan meal:</span> {props.data.vegan ? "Yes" : "No"}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default FormComponent;