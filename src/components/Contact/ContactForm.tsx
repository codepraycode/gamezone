"use client";

import { useContactForm } from "@/hooks/useForm";

export default function ContactForm() {
    const { handleSubmitContactForm } = useContactForm();
    return (
        <form onSubmit={handleSubmitContactForm}>
            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                <div className="w-full">
                    <label htmlFor="firstName" className="block mb-2.5">
                        First Name <span className="text-red">*</span>
                    </label>

                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Jhon"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="lastName" className="block mb-2.5">
                        Last Name <span className="text-red">*</span>
                    </label>

                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Deo"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                <div className="w-full">
                    <label htmlFor="subject" className="block mb-2.5">
                        Subject
                    </label>

                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Type your subject"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="phone" className="block mb-2.5">
                        Phone
                    </label>

                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    />
                </div>
            </div>

            <div className="mb-7.5">
                <label htmlFor="message" className="block mb-2.5">
                    Message
                </label>

                <textarea
                    name="message"
                    id="message"
                    rows={5}
                    placeholder="Type your message"
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                ></textarea>
            </div>

            <button
                type="submit"
                className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
                Send Message
            </button>
        </form>
    );
}
