"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { user } from "@/constants/user";

const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();
const timeSlots = Array.from(
  { length: 24 * 2 },
  (_, i) =>
    `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`
);

const EmployeeDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const employeeId = params.id;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const days = daysInMonth(currentMonth, currentYear);

  const today = new Date().getDate();
  const yesterday = today - 1;

  const [attendance, setAttendance] = useState(
    Array.from({ length: days }, (_, index) => ({
      entryTime: "",
      exitTime: "",
      isEditable:
        index + 1 === today || index + 1 === yesterday || user.role === "admin",
    }))
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const handleSelectChange = (
    index: number,
    type: "entryTime" | "exitTime",
    value: string
  ) => {
    const updatedAttendance = [...attendance];
    updatedAttendance[index][type] = value;
    setAttendance(updatedAttendance);
  };

  const handleSave = () => {
    if (selectedDay !== null) {
      const dayAttendance = attendance[selectedDay];
      console.log(
        `Gün ${selectedDay + 1}: Giriş - ${dayAttendance.entryTime}, Çıkış - ${
          dayAttendance.exitTime
        }`
      );
    }
  };

  const isEditableDay =
    selectedDay !== null && attendance[selectedDay]?.isEditable;
  const isSaveButtonDisabled =
    !isEditableDay ||
    !attendance[selectedDay]?.entryTime ||
    !attendance[selectedDay]?.exitTime;

  return (
    <div className="max-w-[1000px] mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">
        Çalışan ID: {employeeId} için Giriş/Çıkış Saatleri
      </h1>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        Geri
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Gün</TableHead>
            <TableHead>Giriş Saati</TableHead>
            <TableHead>Çıkış Saati</TableHead>
            <TableHead>Eksik Mesai</TableHead>
            <TableHead>Fazla Mesai</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendance.map((day, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Select
                  value={day.entryTime}
                  onValueChange={(value) => {
                    handleSelectChange(index, "entryTime", value);
                    setSelectedDay(index); // Update selected day on change
                  }}
                  disabled={!day.isEditable}
                >
                  <SelectTrigger className="w-[180px]">
                    {day.entryTime || "Saat Seç"}
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={day.exitTime}
                  onValueChange={(value) => {
                    handleSelectChange(index, "exitTime", value);
                    setSelectedDay(index); // Update selected day on change
                  }}
                  disabled={!day.isEditable}
                >
                  <SelectTrigger className="w-[180px]">
                    {day.exitTime || "Saat Seç"}
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              {/* Eksik ve Fazla Mesai Hesaplaması */}
              <TableCell>{/* Eksik Mesai */}</TableCell>
              <TableCell>{/* Fazla Mesai */}</TableCell>
              <TableCell>
                {index === selectedDay && (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                    onClick={handleSave}
                    disabled={isSaveButtonDisabled}
                  >
                    Kaydet
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeDetails;
