"use client";
import api from "@/app/lib/axiosInstance";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, {  useState } from "react";
import { toast } from "react-toastify";

export default function SignInForm() {

  // System
  // const router = useRouter()


  const [showPassword, setShowPassword] = useState(false);

  // States
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // const { data: session } = useSession()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ e });

    try {
      const res = await api.post(`/api/auth/login`, { username, password })
      const { accessToken, id, username: userUsername, role } = res.data

      console.log(res.data);

      if (accessToken) {
        toast.success('เข้าสู่ระบบสำเร็จ')
        await signIn('credentials', {
         
          username: userUsername,
          id: id,
          role: role,
          accessToken: accessToken,
           redirect: true,
           callbackUrl: '/admin',
        })
     
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
    }

  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          กลับหน้าหลัก
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              เข้าสู่ระบบ
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              กรอก Username และ Password เพื่อเข้าสู่ระบบ!
            </p>
          </div>
          <div>

            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>

                  <Input
                    placeholder="Username"
                    type="text"
                    {...{
                      value: username,
                      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value),
                    }}
                  />

                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">


                    <Input
                      placeholder="password"
                      type={showPassword ? "text" : "password"}
                      {...{
                        value: password,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                          setPassword(e.target.value),
                      }}
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>

                {error && error}

                <div>
                  <Button className="w-full" size="sm" type="submit">
                    เข้าสู่ระบบ
                  </Button>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
