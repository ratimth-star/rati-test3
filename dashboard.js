const API = "https://script.google.com/macros/s/AKfycbzDxdrmVUI32IdeHuX5Bh1AonZmKSZy0xVDP3XncNAsUBUwA6LrvjjDM1ONiQo5vjA/exec";

async function loadData(){
  const res = await fetch(API);
  const data = await res.json();
  render(data);
}

function render(data){
  const tbody = document.getElementById("table");
  tbody.innerHTML = data.map(d => `
    <tr>
      <td>${d.hn}</td>
      <td>${d.score}</td>
      <td>${d.level}</td>
      <td>${d.time}</td>
    </tr>
  `).join("");
}

document.getElementById("searchHN").addEventListener("input", e=>{
  const val = e.target.value;
  document.querySelectorAll("#table tr").forEach(row=>{
    row.style.display = row.innerText.includes(val) ? "" : "none";
  });
});

loadData();
