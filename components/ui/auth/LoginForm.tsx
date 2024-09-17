// components/LoginForm.tsx

import React from "react";
import { Label } from "../label";
import { Input } from "../input";
import { Button } from "../button";
import Link from "next/link";
import { user } from "@/constants/user";

export default function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Giriş Yap
        </h2>

        <form className="space-y-4">
          <div>
            <Label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Kullanıcı Adı
            </Label>
            <Input
              type="text"
              name="username"
              id="username"
              required
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Şifre
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              required
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href={`/dashboard?company=${user.companyId}&branch=${user.branchId}`}
              className="w-full"
            >
              {" "}
              <Button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Giriş Yap
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
