const input = document.querySelector(".input1");
const plus = document.querySelector(".plus");
const todaylist = document.querySelector(".todaylist");
const todaycount = document.querySelector(".todaycount");
const complecount = document.querySelector(".complecount");
const total = document.querySelector(".num1");
const pending = document.querySelector(".num2");
const completed = document.querySelector(".num3");
const percent = document.querySelector(".num4");
const complist = document.querySelector(".complelist");

let comparr = getcomp();
let todayarr = gettoday();

updatenum();
updatetoday();
updatecomp();

plus.addEventListener("click", function (e) {
  e.preventDefault();
  addtoday();
  updatenum();
  savetoday();
  savecomp();
});

todaylist.addEventListener("click", function (e) {
  const checkbox = e.target.closest(".checkbox1");

  if (!checkbox) return;

  const task = checkbox.closest(".task-indi");

  const text = task.querySelector(".indi-text").innerText;

  todayarr = todayarr.filter((item) => item !== text);

  comparr.push(text);

  savetoday();
  savecomp();
  updatetoday();
  updatecomp();
  updatenum();
});

todaylist.addEventListener("click", function (e) {
  const del = e.target.closest(".delete");

  if (!del) return;

  const task = del.closest(".task-indi");

  const text = task.querySelector(".indi-text").innerText;

  todayarr = todayarr.filter((item) => item !== text);

  savetoday();
  savecomp();
  updatetoday();
  updatecomp();
  updatenum();
});

complist.addEventListener("click", function (e) {
  const checkbox = e.target.closest(".checkbox2");

  if (!checkbox) return;

  const task = checkbox.closest(".task-indi");

  const text = task.querySelector(".indi-text").innerText;

  comparr = comparr.filter((item) => item !== text);

  todayarr.push(text);

  savetoday();
  savecomp();
  updatetoday();
  updatecomp();
  updatenum();
});

complist.addEventListener("click", function (e) {
  const del = e.target.closest(".delete");

  if (!del) return;

  const task = del.closest(".task-indi");

  const text = task.querySelector(".indi-text").innerText;

  comparr = comparr.filter((item) => item !== text);

  savetoday();
  savecomp();
  updatetoday();
  updatecomp();
  updatenum();
});

function addtoday() {
  const temp = input.value.trim();
  if (temp.length > 0) {
    todayarr.push(temp);
    input.value = "";
    updatetoday();
  }
}

function updatecomp() {
  complist.innerHTML = "";
  comparr.forEach((value, index) => {
    const ele = createcomp(value);
    complist.appendChild(ele);
  });
}

function createcomp(value) {
  const ele = document.createElement("div");
  ele.className = "task-indi";
  ele.innerHTML = `<div class="checkbox checkbox2"><i class="ri-checkbox-circle-line"></i></div>
                        <div class="indi-text head-text  comple-text">${value}</div>
                        <div class="delete"><i class="ri-delete-bin-6-line"></i></div>
    `;
  return ele;
}

function updatetoday() {
  todaylist.innerHTML = "";
  todayarr.forEach((value, index) => {
    const ele = createtoday(value);
    todaylist.appendChild(ele);
  });
}
function createtoday(value) {
  const ele = document.createElement("div");
  ele.className = "task-indi";
  ele.innerHTML = `<div class="checkbox checkbox1"><i class="ri-checkbox-blank-circle-line"></i></div>
                        <div class="indi-text head-text">${value}</div>
                        <div class="delete"><i class="ri-delete-bin-6-line"></i></div>
                        `;
  return ele;
}
function updatenum() {
  const a = todayarr.length;
  const b = comparr.length;
  todaycount.innerText = a;
  complecount.innerText = b;
  total.innerText = a + b;
  pending.innerText = a;
  completed.innerText = b;
  if (a == 0 && b == 0) {
    percent.innerText = "0" + "%";
  } else {
    let z = Math.floor((b / (a + b)) * 100);
    percent.innerText = z + "%";
  }
}

function savetoday(){
    const today_save=JSON.stringify(todayarr);
    localStorage.setItem("today",today_save);
}

function gettoday(){
    const temp=localStorage.getItem("today")||"[]";
    return JSON.parse(temp);
}

function savecomp(){
    const comp_save=JSON.stringify(comparr);
    localStorage.setItem("complete",comp_save);
}

function getcomp(){
    const temp=localStorage.getItem("complete")||"[]";
    return JSON.parse(temp);
}

function showSidebar(){
    const sidebar=document.querySelector('.sidebar');
    sidebar.style.display='flex';
}
function closeSidebar(){
    const sidebar=document.querySelector('.sidebar');
    sidebar.style.display='none';
}