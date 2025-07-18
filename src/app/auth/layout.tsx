import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
          {children}
          {/* <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
            <div className="relative items-center justify-center  flex z-1">
              <GridShape />
              <div className="flex flex-col items-center max-w-xs">
       
                <p className="text-center text-4xl text-white dark:text-white/60">
                  SCG P
                </p>
              </div>
            </div>
          </div> */}
          <div className="w-full lg:w-1/2 h-full bg-gray-200 hidden lg:grid relative ">

            <div className="relative items-center justify-center  flex z-1">
              <GridShape />
              <div className="flex flex-col jus items-center ">

                <p className="text-center text-4xl text-white dark:text-white/60">
                  <Image
                    width={200}
                    height={200}
                    src="/images/logo/logo_scgp.png"
                    alt="grid"
                    className=" "
                  />
                </p>
                <p className="text-2xl mt-4">บริษัท ฟินิคซ พัลพ แอนด์ เพเพอร์ จำกัด (มหาชน) </p>
                <p className="text-2xl mt-2"> ระบบลงทะเบียนเข้าอบรม ออนไลน์  </p>
              </div>
            </div>

            <div className="flex justify-end items-end">
              <Image
                width={450}
                height={450}
                src="/images/logo/auth.png"
                alt="grid"
                className=" absolute"
              />
            </div>


            {/* <div className="flex flex-col items-start px-16 py-32   ">
              <Image
                width={200}
                height={200}
                src="/images/logo/logo_scgp.png"
                alt="grid"
                className=" "
              />
              <p className="text-2xl mt-4">บริษัท ฟินิคซ พัลพ แอนด์ เพเพอร์ จำกัด (มหาชน) </p>
              <p className="text-2xl mt-2"> ระบบลงทะเบียนเข้าอบรม ออนไลน์  </p>
            </div>
            <div className="flex justify-end items-end">
              <Image
                width={450}
                height={450}
                src="/images/logo/auth.png"
                alt="grid"
                className=" absolute"
              />
            </div> 
            
            */}


          </div>
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
