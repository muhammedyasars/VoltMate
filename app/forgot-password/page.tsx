// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import Button from '@/components/ui/button';
// import { api } from '@/lib/api-client';
// import { useToast } from '@/hooks/use-toast';
// import { ToastContainer } from '@/components/ui/Toast';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const { toasts, addToast, removeToast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!email) {
//       addToast('Please enter your email address', 'error');
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       // In a real app, this would call your API
//       // await api.post('/auth/forgot-password', { email });
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setIsSuccess(true);
//     } catch (error) {
//       addToast('Failed to send password reset email', 'error');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <ToastContainer toasts={toasts} removeToast={removeToast} />
      
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
//             <i className="ri-charging-pile-2-line text-white text-2xl"></i>
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
//           Forgot your password?
//         </h2>
//         <p className="mt-2 text-center text-gray-600">
//           Enter your email address and we'll send you a link to reset your password.
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10">
//           {isSuccess ? (
//             <div className="text-center">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <i className="ri-mail-check-line text-2xl text-green-600"></i>
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Check your email
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 We've sent a password reset link to <strong>{email}</strong>. 
//                 Please check your inbox and follow the instructions to reset your password.
//               </p>
//               <div className="flex flex-col space-y-3">
//                 <Link href="/login">
//                   <Button variant="outline" className="w-full">
//                     Back to Login
//                   </Button>
//                 </Link>
//                 <button 
//                   onClick={handleSubmit}
//                   className="text-primary-600 font-medium hover:text-primary-700"
//                 >
//                   Didn't receive the email? Click to resend
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   isLoading={isSubmitting}
//                 >
//                   <i className="ri-mail-send-line mr-2"></i>
//                   Send Reset Link
//                 </Button>
//               </div>
              
//               <div className="text-center mt-4">
//                 <Link href="/login" className="text-primary-600 font-medium hover:text-primary-700">
//                   <i className="ri-arrow-left-line mr-1"></i>
//                   Back to login
//                 </Link>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }