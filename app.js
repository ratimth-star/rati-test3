const API = "https://script.google.com/macros/s/AKfycbzDxdrmVUI32IdeHuX5Bh1AonZmKSZy0xVDP3XncNAsUBUwA6LrvjjDM1ONiQo5vjA/exec";

async function save() {
  const hn = document.getElementById("hn").value;
  const location = document.getElementById("location").value;
  const score = document.getElementById("score").value;

  const level = score >= 7 ? "🔴 High" : score >= 5 ? "🟡 Medium" : "🟢 Low";

  const data = {
    hn, location, score, level,
    red: score >= 7,
    user: "rati.mth@gmail.com"
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

  const tbody = document.getElementById("table");
  tbody.innerHTML = data.map(d => `
    <tr>
      <td>${d.hn}</td>
      <td>${d.score}</td>
      <td>${d.level}</td>
      <td>${new Date(d.time).toLocaleString()}</td>
    </tr>
  `).join("");
}

document.getElementById("search").addEventListener("input", e=>{
  const val = e.target.value;
  document.querySelectorAll("#table tr").forEach(row=>{
    row.style.display = row.innerText.includes(val) ? "" : "none";
  });
});

load();
