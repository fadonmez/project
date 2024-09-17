import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
            overtime: 5,
          },
          {
            id: 2,
            firstName: "Ayşe",
            lastName: "Demir",
            position: "Designer",
            startDate: "2021-03-15",
            overtime: 2,
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
            overtime: 4,
          },
          {
            id: 4,
            firstName: "Fatma",
            lastName: "Aydın",
            position: "Accountant",
            startDate: "2021-07-25",
            overtime: 7,
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
            overtime: 7,
          },
          {
            id: 6,
            firstName: "Elif",
            lastName: "Çelik",
            position: "Waiter",
            startDate: "2023-02-05",
            overtime: 2,
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
            overtime: 8,
          },
          {
            id: 8,
            firstName: "Derya",
            lastName: "Köksal",
            position: "Receptionist",
            startDate: "2022-04-10",
            overtime: 2,
          },
          // Diğer çalışanlar
        ],
      },
    ],
  },
  // Daha fazla firma ve şube
];

export const getCompanyAndBranchNames = (
  companyId: string,
  branchId: string
) => {
  const company = companies.find((c) => c.id === parseInt(companyId));
  if (company) {
    const branch = company.branches.find((b) => b.id === parseInt(branchId));
    return {
      companyName: company.name,
      branchName: branch ? branch.name : "Şube Bulunamadı",
      employees: branch ? branch.employees : [],
    };
  }
  return {
    companyName: "Firma Bulunamadı",
    branchName: "Şube Bulunamadı",
    employees: [],
  };
};
