import React from 'react'
import ContactCard from './ContactCard'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  //send form data
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(import.meta.env.VITE_YOUR_SERVICE_ID, import.meta.env.VITE_YOUR_TEMPLATE_ID, form.current, import.meta.env.VITE_YOUR_PUBLIC_KEY)
      .then((result) => {
        e.target.reset();
        alert("Message Sent Successfully")
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <>
      <div
        id='contact'
        className='relative overflow-hidden mt-16'>

        <div className='dark:text-white max-w-[1080px] mx-auto relative'>
          <h1 className='text-center text-4xl font-bold text-gray-900 dark:text-white' >Contact</h1>
          <p className='text-center opacity-50 mt-2 text-gray-600 dark:text-gray-400'>Let's discuss your Queries !</p>
          <div className='flex gap-5 p-2 flex-wrap mt-6' data-aos="zoom-out">
            {/* left */}
            <div className='flex flex-col gap-3'>

              <ContactCard name="Phone Number" value="+91-XXXXXXXXXX" href="tel:+918101865933" icon="fa-solid fa-phone" />
              <ContactCard name="Email Address" value="click.12345@gmail.com" href="mailto:pankaj.ky3007@gmailcom" icon="fa-solid fa-envelope" />
              <ContactCard name="Address" value="Asansol, West Bengal" href="https://maps.app.goo.gl/LjXYu15FdMgo91aB7" icon="fa-solid fa-location-dot" />
            </div>

            {/* right */}

            <form ref={form} onSubmit={sendEmail} className='flex  flex-wrap p-3 lg:p-5 bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 rounded-2xl shadow-lg dark:shadow-none backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-500/30 transition-all duration-500 flex-1 gap-4'>
              <div className='relative w-full lg:w-[48%]  '>
                <i className="fa-solid fa-user  absolute left-3 top-5 transform -translate-y-1/2"></i>
                <input type="text" name="user_name" placeholder='Name...' className='bg-transparent border-2 border-gray-600  rounded-md  pl-9 py-2 w-full  ' />
              </div>
              <div className='relative w-full lg:w-[49%]  '>
                <i className="fa-solid fa-envelope  absolute left-3 top-5 transform -translate-y-1/2"></i>
                <input type="text" name="user_email" placeholder='Email...' className='bg-transparent border-2 border-gray-600  rounded-md  pl-9 py-2 w-full  ' />
              </div>
              <div className='relative w-full h-[30%] lg:h-[50%]'>
                <i className="fa-brands fa-rocketchat  absolute left-3 top-5 transform -translate-y-1/2"></i>
                <textarea placeholder='Message...' name="message" className='w-[100%] bg-transparent border-2 border-gray-600 rounded-md py-1 h-full  pl-9 ' />
              </div>
              <input type='submit' value={"Send"} className='bg-cyan-500 hover:bg-cyan-600 px-3  py-2 rounded-md cursor-pointer' />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact