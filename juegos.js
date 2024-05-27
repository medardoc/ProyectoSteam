// Hacer una solicitud al servidor para obtener los juegos
document.addEventListener('DOMContentLoaded', () => {
    fetch('/juegos')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('juegosTableBody');
            data.forEach(juego => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${juego.nombre}</td>
                    <td>${juego.descripcion}</td>
                    <td><a href="${juego.Enlace}" target="_blank">Ver Juego</a></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error al cargar los juegos:', error));
});
