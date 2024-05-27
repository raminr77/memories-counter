import { ROUTES } from "./shared/constants/routes.ts";

export function Error404() {
  return (
    <div className='w-full flex items-center justify-center flex-col h-screen'>
      <div className='font-bold text-4xl text-red-600 mb-2'>404</div>
      <h1 className='font-bold text-lg'>Page Not Found!</h1>
      <p className='text-sm mt-2'>It happens! Now, let’s try to get you back on track.</p>
      <a
         href={ROUTES.HOME}
        className='text-xs mt-6 border-b border-solid p-2 hover:border-red-500 hover:text-red-500'
      >
        Home Page
      </a>
    </div>
  );
}
