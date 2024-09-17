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
    ],
  },

  // Daha fazla firma ve şube
];
const UserSidebar = ({
  user,
}: {
  user: {
    username: string;
  };
}) => {
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
            <CollapsibleContent className="pl-4 pt-4 space-y-2">
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
            </CollapsibleContent>
          </Collapsible>
        ))}

        {/* Additional Admin Features */}
      </div>
      <div className="mt-auto flex flex-col gap-5">
        <h2 className="text-gray-700 text-sm">{user.username}</h2>
      </div>
    </div>
  );
};

export default UserSidebar;
