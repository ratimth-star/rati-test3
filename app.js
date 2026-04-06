const API = "https://script.google.com/macros/s/AKfycbzDxdrmVUI32IdeHuX5Bh1AonZmKSZy0xVDP3XncNAsUBUwA6LrvjjDM1ONiQo5vjA/exec";

function login(){
  const email = document.getElementById("email").value;
  if(!email){
    document.getElementById("loginStatus").innerText = "กรุณากรอก email";
    return;
  }
  localStorage.setItem("user", email);
  showApp();
}

function logout(){
  localStorage.removeItem("user");
  location.reload();
}

function showApp(){
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("appPage").classList.remove("hidden");
  load();
}

window.onload = () => {
  if(localStorage.getItem("user")){
    showApp();
  }
};

async function save() {
  const hn = document.getElementById("hn").value;
  const location = document.getElementById("location").value;
  const score = parseInt(document.getElementById("score").value);

  const level = score >= 7 ? "🔴 High" : score >= 5 ? "🟡 Medium" : "🟢 Low";

  const data = {
    hn, location, score, level,
    red: score >= 7,
    user: localStorage.getItem("user")
  };

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "text/plain"},
    body: JSON.stringify(data)
  });

  alert("บันทึกแล้ว");
  load();
}

async function load(){
  const res = await fetch(API);
  const data = await res.json();

  let red=0, yellow=0, green=0;

  const tbody = document.getElementById("table");
  tbody.innerHTML = data.map(d => {
    if(d.score >=7) red++;
    else if(d.score>=5) yellow++;
    else green++;

    return `
    <tr>
      <td>${d.hn}</td>
      <td>${d.score}</td>
      <td>${d.level}</td>
      <td>${new Date(d.time).toLocaleString()}</td>
    </tr>`;
  }).join("");

  document.getElementById("summary").innerHTML = `
    🔴 ${red} | 🟡 ${yellow} | 🟢 ${green}
  `;
}

document.getElementById("search")?.addEventListener("input", e=>{
  const val = e.target.value;
  document.querySelectorAll("#table tr").forEach(row=>{
    row.style.display = row.innerText.includes(val) ? "" : "none";
  });
});
