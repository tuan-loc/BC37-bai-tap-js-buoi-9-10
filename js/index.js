var staffList = [];

function createStaff() {
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var day = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var positionStaff = document.getElementById("chucvu").value;
  var hour = +document.getElementById("gioLam").value;

  var isFormValid = validateForm(
    account,
    fullName,
    email,
    password,
    day,
    salary,
    positionStaff,
    hour
  );
  if (!isFormValid) return;

  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].account === account) {
      alert("Tài khoản nhân viên đã tồn tại!!!");
      return;
    }
  }

  var newStaff = new Staff(
    account,
    fullName,
    email,
    password,
    day,
    salary,
    positionStaff,
    hour
  );

  staffList.push(newStaff);

  renderStaffs();

  setStaffList();

  document.getElementById("formUser").reset();
}

function validateForm(
  account,
  fullName,
  email,
  password,
  day,
  salary,
  positionStaff,
  hour
) {
  var isValid = true;

  isValid &= required(account, "tbTKNV") && length(account, "tbTKNV", 4, 6);
  isValid &= required(fullName, "tbTen") && string(fullName, "tbTen");
  isValid &= required(email, "tbEmail") && checkEmail(email, "tbEmail");
  isValid &=
    required(password, "tbMatKhau") && checkPassword(password, "tbMatKhau");
  isValid &= required(day, "tbNgay") && checkDate(day, "tbNgay");
  isValid &= checkSalary(salary, "tbLuongCB", 1000000, 20000000);
  isValid &= checkPosition(positionStaff, "tbChucVu");
  isValid &= checkHour(hour, "tbGiolam", 80, 200);

  var arrSpan = document.querySelectorAll(".sp-thongbao");
  for (var i = 0; i < arrSpan.length; i++) {
    if (arrSpan[i].innerHTML !== "") {
      arrSpan[i].style.display = "inline-block";
    } else {
      arrSpan[i].style.display = "none";
    }
  }

  return isValid;
}

function renderStaffs(data) {
  if (!data) data = staffList;

  var tableHTML = "";
  for (var i = 0; i < data.length; i++) {
    tableHTML += `<tr>
        <td>${data[i].account}</td>
        <td>${data[i].fullName}</td>
        <td>${data[i].email}</td>
        <td>${data[i].day}</td>
        <td>${data[i].positionStaff}</td>
        <td>${data[i].totalSalary()}</td>
        <td>${data[i].typeStaff()}</td>
        <td>
          <button class="btn btn-danger" onclick="deleteStaff('${
            data[i].account
          }')">Xóa</button>

          <button class="btn btn-success" data-toggle="modal"
          data-target="#myModal" onclick="getUpdateStaff('${
            data[i].account
          }')">Sửa</button>
        </td>
    </tr>`;
  }

  document.getElementById("tableDanhSach").innerHTML = tableHTML;
}

function deleteStaff(account) {
  var index = findByAccount(account);
  if (index === -1) {
    alert("Tài khoản nhân viên không tồn tại");
    return;
  }
  staffList.splice(index, 1);

  setStaffList();
  renderStaffs();
}

function findByAccount(account) {
  for (var i = 0; i < staffList.length; i++) {
    if (staffList[i].account === account) {
      return i;
    }
  }
  return -1;
}

function setStaffList() {
  var staffListJSON = JSON.stringify(staffList);
  localStorage.setItem("StaffList", staffListJSON);
}

function getStaffList() {
  var staffListJSON = localStorage.getItem("StaffList");
  if (!staffListJSON) return;
  staffList = mapData(JSON.parse(staffListJSON));

  renderStaffs();
}

function mapData(staffListLocal) {
  var result = [];

  for (var i = 0; i < staffListLocal.length; i++) {
    var oldStaff = staffListLocal[i];
    var newStaff = new Staff(
      oldStaff.account,
      oldStaff.fullName,
      oldStaff.email,
      oldStaff.password,
      oldStaff.day,
      oldStaff.salary,
      oldStaff.positionStaff,
      oldStaff.hour
    );
    result.push(newStaff);
  }
  return result;
}

window.onload = function () {
  getStaffList();
};

function getUpdateStaff(account) {
  document.getElementById("btnCapNhat").style.display = "inline-block";
  document.getElementById("btnThemNV").style.display = "none";

  var index = findByAccount(account);
  if (index === -1) return alert("Tài khoản nhân viên không tồn tại!");

  var staff = staffList[index];

  document.getElementById("tknv").value = staff.account;
  document.getElementById("name").value = staff.fullName;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.day;
  document.getElementById("luongCB").value = staff.salary;
  document.getElementById("chucvu").value = staff.positionStaff;
  document.getElementById("gioLam").value = staff.hour;

  document.getElementById("tknv").disabled = true;
}

function updateStaff() {
  var account = document.getElementById("tknv").value;
  var fullName = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var day = document.getElementById("datepicker").value;
  var salary = +document.getElementById("luongCB").value;
  var positionStaff = document.getElementById("chucvu").value;
  var hour = +document.getElementById("gioLam").value;

  var isFormValid = validateForm(
    account,
    fullName,
    email,
    password,
    day,
    salary,
    positionStaff,
    hour
  );
  if (!isFormValid) return;

  var index = findByAccount(account);

  var staff = staffList[index];

  staff.fullName = fullName;
  staff.email = email;
  staff.password = password;
  staff.day = day;
  staff.salary = salary;
  staff.positionStaff = positionStaff;
  staff.hour = hour;

  setStaffList();
  renderStaffs();

  document.getElementById("btnDong").click();
  document.getElementById("formUser").reset();
}

function searchStaffs() {
  var keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();
  var result = [];

  for (var i = 0; i < staffList.length; i++) {
    var typeStaff = staffList[i].typeStaff().toLowerCase();

    if (typeStaff.includes(keyword)) {
      result.push(staffList[i]);
    }
  }

  renderStaffs(result);
}

function hideButtonUpdate() {
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "inline-block";
  document.getElementById("tknv").disabled = false;
}

function required(value, spanId) {
  if (value.length === 0) {
    document.getElementById(spanId).innerHTML = "*Trường này bắt buộc nhập!";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}

function length(value, spanId, min, max) {
  if (value.length < min || value.length > max) {
    document.getElementById(
      spanId
    ).innerHTML = `*Độ dài phải từ ${min} đến ${max} kí tự`;
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}

function string(value, spanId) {
  var pattern =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML =
    "*Chỉ chấp nhận kí tự từ a đến z!";
  return false;
}

function checkEmail(value, spanId) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;

  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML = "*Email không hợp lệ!";
  return false;
}

function checkPassword(value, spanId) {
  var pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;

  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML =
    "*Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)";
  return false;
}

function checkDate(value, spanId) {
  var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML = "*Ngày làm không hợp lệ!";
  return false;
}

function checkSalary(value, spanId, min, max) {
  if (value < min || value > max) {
    document.getElementById(
      spanId
    ).innerHTML = `*Lương cơ bản phải từ ${min} đến ${max}`;
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}

function checkPosition(value, spanId) {
  if (value === "") {
    document.getElementById(spanId).innerHTML = "*Vui lòng chọn chức vụ!";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}

function checkHour(value, spanId, min, max) {
  if (value < min || value > max) {
    document.getElementById(
      spanId
    ).innerHTML = `*Số giờ làm trong tháng phải từ ${min} giờ đến ${max} giờ`;
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
}

function cancel() {
  document.getElementById("formUser").reset();
}
