// Pobieranie elementów DOM
const formMecz = document.getElementById('formMecz');
const tabelaMeczeBody = document.querySelector('#tabelaMecze tbody');
const szukajInput = document.getElementById('szukajInput');
const wynikiSzukaj = document.getElementById('wynikiSzukaj');

let mecze = JSON.parse(localStorage.getItem('mecze')) || [];

// Funkcja do zapisu meczy w localStorage
function zapiszMecze() {
  localStorage.setItem('mecze', JSON.stringify(mecze));
}

// Funkcja do odświeżenia listy meczy w tabeli
function pokazMecze() {
  tabelaMeczeBody.innerHTML = '';
  mecze.forEach((mecz, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${mecz.data}</td>
      <td>${mecz.przeciwnik}</td>
      <td>${mecz.ocena}</td>
      <td>${mecz.najlepszy}</td>
    `;
    tabelaMeczeBody.appendChild(tr);
  });
}

// Obsługa dodawania meczu
formMecz.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formMecz);

  const nowyMecz = {
    data: formData.get('data'),
    przeciwnik: formData.get('przeciwnik'),
    ocena: formData.get('ocena'),
    najlepszy: formData.get('najlepszy'),
    z1jaguar: formData.get('z1jaguar'),
    z2jaguar: formData.get('z2jaguar'),
    z3jaguar: formData.get('z3jaguar'),
    z1przeciwnik: formData.get('z1przeciwnik'),
    z2przeciwnik: formData.get('z2przeciwnik'),
    z3przeciwnik: formData.get('z3przeciwnik'),
    opisy: {
      opis1: formData.get('opis1'),
      opis2: formData.get('opis2'),
      opis3: formData.get('opis3'),
      opis4: formData.get('opis4'),
      opis5: formData.get('opis5'),
      opis6: formData.get('opis6'),
      opis7: formData.get('opis7'),
    },
    ocenyZawodnikow: {
      ocenaNaj: formData.get('ocenaNaj'),
      ocena1j: formData.get('ocena1j'),
      ocena2j: formData.get('ocena2j'),
      ocena3j: formData.get('ocena3j'),
      ocena1p: formData.get('ocena1p'),
      ocena2p: formData.get('ocena2p'),
      ocena3p: formData.get('ocena3p'),
    }
  };

  mecze.push(nowyMecz);
  zapiszMecze();
  pokazMecze();
  formMecz.reset();

  // Ukryj sekcje opisy i oceny
  document.getElementById('sekcjaOpisy').classList.add('d-none');
  document.getElementById('sekcjaOceny').classList.add('d-none');
  document.getElementById('toggleOpisy').checked = false;
  document.getElementById('toggleOceny').checked = false;
});

// Obsługa pokazywania sekcji opisu i oceny (z HTML)
document.getElementById('toggleOpisy').addEventListener('change', function () {
  document.getElementById('sekcjaOpisy').classList.toggle('d-none', !this.checked);
});

document.getElementById('toggleOceny').addEventListener('change', function () {
  document.getElementById('sekcjaOceny').classList.toggle('d-none', !this.checked);
});

// Wyszukiwanie zawodników
szukajInput.addEventListener('input', () => {
  const query = szukajInput.value.toLowerCase();
  wynikiSzukaj.innerHTML = '';

  if (!query) return;

  mecze.forEach(mecz => {
    const zawodnicy = [
      mecz.najlepszy,
      mecz.z1jaguar,
      mecz.z2jaguar,
      mecz.z3jaguar,
      mecz.z1przeciwnik,
      mecz.z2przeciwnik,
      mecz.z3przeciwnik
    ].map(z => z.toLowerCase());

    if (zawodnicy.some(z => z.includes(query))) {
      const div = document.createElement('div');
      div.textContent = `Mecz ${mecz.data} vs ${mecz.przeciwnik}, Najlepszy: ${mecz.najlepszy}, Ocena meczu: ${mecz.ocena}`;
      wynikiSzukaj.appendChild(div);
    }
  });
});

// Pokaz meczy od razu po załadowaniu
pokazMecze();

