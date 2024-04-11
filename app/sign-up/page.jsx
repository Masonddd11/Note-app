"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log;

      setEmail('');
      setPassword('');
      setModalIsOpen(true); // Open the modal
      setErrorMessage(''); // Clear the error message

      // Close the modal and redirect to the sign-in page after 2 seconds
      setTimeout(handleClose, 2000);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already in use'); // Set the error message
      }
    }
  }

  const handleClose = () => {
    setModalIsOpen(false);
    router.push("/sign-in");
  };

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
      <h1 className=' text-3xl'>Sign Up</h1>
        
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-10"
        >
          Sign Up
        </button>

        <div>
          If you have an account, please <a href="/sign-in" className="text-indigo-600 hover:text-indigo-900">sign in</a>.
        </div>

        <Modal
          open={modalIsOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: 400, 
            bgcolor: 'background.paper', 
            border: '2px solid #000', 
            boxShadow: 24, 
            p: 4 
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Signup Successful
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              You will be redirected to the sign-in page in 2 seconds...
            </Typography>
          </Box>
        </Modal>
      </form>
    </div>
  );
}