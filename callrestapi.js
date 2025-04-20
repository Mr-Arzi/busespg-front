var url = "http://localhost:8080/api/buses";
// var url = "https://restapi-mrarzi.onrender.com/api/buses";

function postBus() {
  const busId = $('#busId').val();
  const plate = $('#plate').val();
  const brand = $('#brand').val();
  const model = $('#model').val();
  const year = $('#year').val();
  const status = $('#status').val();
  const comments = $('#comments').val();

  const busData = {
    plate,
    brand,
    model,
    year,
    status,
    comments
  };

  if (busId) {
    // UPDATE
    $.ajax({
      url: `${url}/${busId}`,
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(busData),
      success: function () {
        alert("Autobús actualizado correctamente.");
        resetForm();
        getBuses();
      },
      error: function () {
        alert("Error al actualizar.");
      }
    });
  } else {
    // CREATE
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(busData),
      success: function () {
        alert("Autobús creado correctamente.");
        resetForm();
        getBuses();
      },
      error: function () {
        alert("Error al crear.");
      }
    });
  }
}

function getBuses() {
  $.getJSON(url, function (res) {
    const arrBuses = res.buses;
    let htmlTable = '<table border="1"><tr><th>ID</th><th>Placa</th><th>Marca</th><th>Modelo</th><th>Año</th><th>Estado</th><th>Comentarios</th><th>Acciones</th></tr>';

    arrBuses.forEach(function (bus) {
      htmlTable += `<tr>
        <td>${bus.id}</td>
        <td>${bus.plate}</td>
        <td>${bus.brand}</td>
        <td>${bus.model}</td>
        <td>${bus.year}</td>
        <td>${bus.status}</td>
        <td>${bus.comments}</td>
        <td>
          <button onclick="editBus(${bus.id})">Editar</button>
          <button onclick="deleteBus(${bus.id})">Eliminar</button>
        </td>
      </tr>`;
    });

    htmlTable += '</table>';
    $('#resultado').html(htmlTable);
  });
}

function deleteBus(id) {
  if (confirm(`¿Estás seguro de eliminar el autobús con ID ${id}?`)) {
    $.ajax({
      url: `${url}/${id}`,
      type: 'DELETE',
      success: function () {
        alert(`Autobús ${id} eliminado correctamente.`);
        getBuses();
      },
      error: function () {
        alert('Error al eliminar autobús.');
      }
    });
  }
}

function editBus(id) {
  $.getJSON(url, function (res) {
    const bus = res.buses.find(b => b.id === id);
    if (bus) {
      $('#plate').val(bus.plate);
      $('#brand').val(bus.brand);
      $('#model').val(bus.model);
      $('#year').val(bus.year);
      $('#status').val(bus.status);
      $('#comments').val(bus.comments);
      $('#busId').val(bus.id);
      $('#submitBtn').text('Actualizar');
    }
  });
}

function resetForm() {
  $('#plate').val('');
  $('#brand').val('');
  $('#model').val('');
  $('#year').val('');
  $('#status').val('');
  $('#comments').val('');
  $('#busId').val('');
  $('#submitBtn').text('Guardar');
}

