"use client";
import React from "react";
import * as XLSX from "xlsx";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { getCompanyAndBranchNames } from "@/lib/utils";
import { user } from "@/constants/user";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  startDate: string;
  overtime: number;
};

// const defaultData: Employee[] = [
//   {
//     id: 1,
//     firstName: "Ali",
//     lastName: "Yılmaz",
//     position: "Developer",
//     startDate: "2022-01-10",
//     overtime: 5,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
//   {
//     id: 2,
//     firstName: "Ayşe",
//     lastName: "Demir",
//     position: "Designer",
//     startDate: "2021-03-15",
//     overtime: 2,
//   },
// ];

const columnHelper = createColumnHelper<Employee>();

const columns = [
  columnHelper.accessor("firstName", {
    header: () => "İsim",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("lastName", {
    header: () => "Soyisim",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("position", {
    header: () => "Pozisyon",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("startDate", {
    header: () => "Başlama Tarihi",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("overtime", {
    header: "Fazla Mesai",
    cell: (info) => <p>{info.renderValue()} Saat</p>,
    footer: (info) => info.column.id,
  }),
];

const Dashboard = () => {
  const searchParams = useSearchParams();

  const companyId = searchParams.get("company");
  const branchId = searchParams.get("branch");
  const { companyName, branchName, employees } = getCompanyAndBranchNames(
    companyId as string,
    branchId as string
  );
  const router = useRouter();
  const table = useReactTable({
    data: employees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (user.role !== "admin") {
    if (companyId !== user.companyId || branchId !== user.branchId) {
      return <div>Not Allowed</div>;
    }
  }

  const handleExport = () => {
    // Prepare header rows with company and branch info
    const headerRows = [
      ["Firma", ":", companyName], // Company info
      ["Şube", ":", branchName], // Branch info
      [], // Empty row for spacing
      ["İsim", "Soyisim", "Pozisyon", "Başlama Tarihi", "Fazla Mesai"], // Column headers
    ];

    // Prepare data rows
    const dataRows = employees.map((employee) => [
      employee.firstName,
      employee.lastName,
      employee.position,
      employee.startDate,
      `${employee.overtime} Saat`,
    ]);

    // Combine headers and data into one array
    const wsData = [...headerRows, ...dataRows];

    // Create a new workbook and add a worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Set column widths
    const columnWidths = [
      { wch: 15 }, // Width for "İsim" column
      { wch: 15 }, // Width for "Soyisim" column
      { wch: 20 }, // Width for "Pozisyon" column
      { wch: 15 }, // Width for "Başlama Tarihi" column
      { wch: 12 }, // Width for "Fazla Mesai" column
    ];
    ws["!cols"] = columnWidths;

    // Apply styles to headers
    const headerStyle = { font: { bold: true } };
    ["A4", "B4", "C4", "D4", "E4"].forEach((cell) => {
      if (ws[cell]) ws[cell].s = headerStyle;
    });

    // Export the workbook
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div>
      {user.role === "admin" && (
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={handleExport}
            disabled={employees.length === 0}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
          >
            Excel&apos;e Aktar
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Personel ekle
          </button>
        </div>
      )}

      <Table>
        <TableCaption>
          {companyName} {branchName} Personel Listesi
        </TableCaption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                router.push(`/dashboard/${row.original.id}`);
              }}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
