showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes"); Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: '¡Nota guardada!',
    showConfirmButton: false,
    timer: 900
  })
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card bg-warning" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Nota ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Borrar</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Aún no guardaste ninguna nota. Crea una y quedarán guardadas aquí!`;
  }
  
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la nota de forma permanente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();

      Swal.fire(
        'Eliminada',
        'La nota ha sido eliminada correctamente.',
        'success'
      )
    }
  });
}
function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  localStorage.setItem('selectedColor', color);
}

const selectedColor = localStorage.getItem('selectedColor');
if (selectedColor) {
  changeBackgroundColor(selectedColor);
}

document.getElementById('changeColorBtn').addEventListener('click', () => {
  fetch('colores.json')
      .then(response => response.json())
      .then(data => {
          const colores = data.colores;
          const randomColor = colores[Math.floor(Math.random() * colores.length)];
          changeBackgroundColor(randomColor);
      })
      .catch(error => {
          console.error('Hubo un error al cargar los colores:(', error);
      });
});

Swal.fire({
  title: 'Block de Notas Online',
  text: '¡Simple de usar! Solo escribe y tus notas quedarán guardadas en la web.',
  imageUrl: 'https://cdn.icon-icons.com/icons2/183/PNG/256/Notepad_22553.png',
  imageWidth: 100,
  imageHeight: 100,
  imageAlt: 'Notes',
})




