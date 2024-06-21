// Fungsi untuk membaca file khodam/list.txt
async function fetchKhodamList() {
  const response = await fetch("assets/khodam/list.txt");
  const text = await response.text();
  return text.split("\n").filter((khodam) => khodam.trim() !== "");
}

// Fungsi hash sederhana untuk menghasilkan nilai dari string
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Conversi ke bilangan bulat
  }
  return Math.abs(hash);
}

// Fungsi untuk memilih khodam berdasarkan nama
function getKhodamByName(name, khodamList) {
  const index = hashCode(name) % khodamList.length;
  return khodamList[index];
}

// Variabel untuk data dan paginasi
let data = [];
let filteredData = [];
let currentPage = 1;
const rowsPerPage = 5;
const maxPageButtons = 5;

document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("input");
  const checkButton = document.getElementById("checkButton");
  const result = document.getElementById("result");
  const list = document.getElementById("list");
  const pagination = document.getElementById("pagination");
  const resetButton = document.getElementById("resetButton");
  const search = document.getElementById("search");

  const khodamList = await fetchKhodamList();

  // Memuat data dari localStorage
  const storedData = JSON.parse(localStorage.getItem("data")) || [];
  if (storedData.length) {
    data = storedData;
    filterData(); // Filter data saat halaman pertama dibuka
    displayList();
    setupPagination();
  }

  checkButton.addEventListener("click", () => {
    const name = input.value.trim();
    if (name === "") {
      alert("Masukan nama terlebih dahulu!");
      return;
    }

    const khodam = getKhodamByName(name, khodamList);

    // Cek apakah data sudah ada
    const existingIndex = data.findIndex(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (existingIndex !== -1) {
      // Mengarahkan ke halaman yang sama jika data sudah ada
      currentPage = Math.floor(existingIndex / rowsPerPage) + 1;
      filterData();
      displayList();
      setupPagination();
      return;
    }

    result.textContent = `Nama: ${name}, Khodam: ${khodam}`;

    data.push({ name, khodam });
    localStorage.setItem("data", JSON.stringify(data));
    currentPage = Math.ceil(data.length / rowsPerPage);
    filterData();
    displayList();
    setupPagination();
  });

  resetButton.addEventListener("click", () => {
    result.textContent = "";
    data = [];
    localStorage.removeItem("data");
    currentPage = 1;
    filterData();
    displayList();
    setupPagination();
  });

  search.addEventListener("input", () => {
    currentPage = 1; // Reset ke halaman pertama setelah pencarian
    filterData();
    displayList();
    setupPagination();
  });

  function filterData() {
    const searchTerm = search.value.toLowerCase();
    filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.khodam.toLowerCase().includes(searchTerm)
    );
  }

  function displayList() {
    list.innerHTML = "";
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = filteredData.slice(start, end);

    paginatedItems.forEach((item) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `<td>${item.name}</td><td>${item.khodam}</td>`;
      list.appendChild(newRow);
    });
  }

  function setupPagination() {
    pagination.innerHTML = "";
    const pageCount = Math.ceil(filteredData.length / rowsPerPage);

    if (pageCount <= 1) return;

    const createPageButton = (page) => {
      const button = document.createElement("button");
      button.textContent = page;
      button.className = "pagination-button";
      if (page === currentPage) {
        button.classList.add("disabled", "active");
      }
      button.addEventListener("click", () => {
        currentPage = page;
        displayList();
        setupPagination();
      });
      pagination.appendChild(button);
    };

    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.textContent = "Prev";
      prevButton.className = "pagination-button";
      prevButton.addEventListener("click", () => {
        currentPage--;
        displayList();
        setupPagination();
      });
      pagination.appendChild(prevButton);
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(
      pageCount,
      currentPage + Math.floor(maxPageButtons / 2)
    );

    if (endPage - startPage + 1 < maxPageButtons) {
      if (currentPage <= Math.floor(maxPageButtons / 2)) {
        endPage = Math.min(pageCount, startPage + maxPageButtons - 1);
      } else {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      createPageButton(i);
    }

    if (currentPage < pageCount) {
      const nextButton = document.createElement("button");
      nextButton.textContent = "Next";
      nextButton.className = "pagination-button";
      nextButton.addEventListener("click", () => {
        currentPage++;
        displayList();
        setupPagination();
      });
      pagination.appendChild(nextButton);
    }
  }
});
