"use client";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "../button";
import Link from "next/link";

const companies = [
  {
    id: 1,
    name: "Kardeşler Dürüm",
    branches: [
      {
        id: 1,
        name: "Dörtyol Şubesi",
        employees: [
          {
            id: 1,
            firstName: "Ali",
            lastName: "Yılmaz",
            position: "Developer",
            startDate: "2022-01-10",
          },
          {
            id: 2,
            firstName: "Ayşe",
            lastName: "Demir",
            position: "Designer",
            startDate: "2021-03-15",
          },
          // Diğer çalışanlar
        ],
      },
      {
        id: 2,
        name: "Merkez Şubesi",
        employees: [
          {
            id: 3,
            firstName: "Mehmet",
            lastName: "Kara",
            position: "Manager",
            startDate: "2020-05-20",
          },
          {
            id: 4,
            firstName: "Fatma",
            lastName: "Aydın",
            position: "Accountant",
            startDate: "2021-07-25",
          },
          // Diğer çalışanlar
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Lezzet Lokantası",
    branches: [
      {
        id: 3,
        name: "Çarşı Şubesi",
        employees: [
          {
            id: 5,
            firstName: "Can",
            lastName: "Kaya",
            position: "Chef",
            startDate: "2022-08-10",
          },
          {
            id: 6,
            firstName: "Elif",
            lastName: "Çelik",
            position: "Waiter",
            startDate: "2023-02-05",
          },
          // Diğer çalışanlar
        ],
      },
      {
        id: 4,
        name: "Üniversite Şubesi",
        employees: [
          {
            id: 7,
            firstName: "Ege",
            lastName: "Yurt",
            position: "Cleaner",
            startDate: "2021-10-15",
          },
          {
            id: 8,
            firstName: "Derya",
            lastName: "Köksal",
            position: "Receptionist",
            startDate: "2022-04-10",
          },
          // Diğer çalışanlar
        ],
      },
    ],
  },
  // Daha fazla firma ve şube
];

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-100 text-white p-3 flex flex-col justify-between fixed top-5  h-[calc(100%-40px)] shadow-lg rounded-lg">
      <div className=" gap-5 flex flex-col overflow-auto">
        {companies.map((company) => (
          <Collapsible key={company.id}>
            <CollapsibleTrigger className="w-full flex justify-between items-center px-4 py-2 text-left text-sm font-medium text-gray-900 bg-gray-200 rounded-lg hover:bg-gray-300">
              {company.name}
              <span>▼</span>{" "}
              {/* Add an icon or arrow to indicate collapsibility */}
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-4 pt-4 space-y-2 flex flex-col gap-2">
              {company.branches.map((branch, index) => (
                <Link
                  key={index}
                  href={`/dashboard?company=${company.id}&branch=${branch.id}`}
                >
                  <Button className="w-full text-left px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200">
                    {branch.name}
                  </Button>
                </Link>
              ))}
              <Button className="w-full text-left px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600">
                Şube Ekle
              </Button>
            </CollapsibleContent>
          </Collapsible>
        ))}

        {/* Additional Admin Features */}
      </div>
      <div className="mt-auto flex flex-col gap-5">
        <button className="w-full bg-green-500 text-white py-2 rounded-lg">
          Firma Ekle
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
