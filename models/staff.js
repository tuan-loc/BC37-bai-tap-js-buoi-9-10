function Staff(
  account,
  fullName,
  email,
  password,
  day,
  salary,
  positionStaff,
  hour
) {
  this.account = account;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
  this.day = day;
  this.salary = salary;
  this.positionStaff = positionStaff;
  this.hour = hour;
  this.totalSalary = function () {
    if (positionStaff === "Giám đốc") {
      return this.salary * 3;
    }
    if (positionStaff === "Trưởng phòng") {
      return this.salary * 2;
    }
    if (positionStaff === "Nhân viên") {
      return this.salary;
    }
  };
  this.typeStaff = function () {
    if (hour >= 192) {
      return "Xuất sắc";
    }
    if (hour >= 176) {
      return "Giỏi";
    }
    if (hour >= 160) {
      return "Khá";
    }
    return "Trung bình";
  };
}
