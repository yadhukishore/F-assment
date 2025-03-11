import React from 'react';
import { useForm } from 'informed';

const ALoginForm = () => {
  const { values, setFieldValue, handleSubmit } = useForm();
  
  // Handle form submission
  const onSubmit = (event) => {
    event.preventDefault();
    
    console.log('Email:', values.email);
    console.log('Password:', values.password);
  };
  
  return (
    <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input 
        type="text" 
        id="email" 
        value={values.email || ''} 
        onChange={(e) => setFieldValue('email', e.target.value)} 
        className="w-full p-2 mt-1 rounded border-gray-300"/>
      
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Password</label>
      <input 
        type="password" 
        id="password" 
        value={values.password || ''} 
        onChange={(e) => setFieldValue('password', e.target.value)} 
        className="w-full p-2 mt-1 rounded border-gray-300"/>
      
      <button type="submit" className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold 
rounded">Submit</button>
    </form>
  );
};
  
export default ALoginForm;
