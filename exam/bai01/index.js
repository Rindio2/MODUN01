var selectedCardImage;
        var codeCVC_CVVCell;
        var editingRowIndex = -1;

        function addToCard(selectedCard) {
            var selectedCardSrc = selectedCard.getAttribute('src');
            selectedCardImage = selectedCardSrc;
        }

        function saveCardInfo() {
            var cardNumber = document.getElementById('cardNumber').value;
            var dayExpiry = document.getElementById('dayExpiry').value;
            var codeCVC_CVV = document.getElementById('codeCVC_CVV').value;

            var tableBody = document.getElementById('savedCardsBody');

            if (editingRowIndex === -1) {
                // Adding a new card
                var newRow = tableBody.insertRow();
                newRow.insertCell(0).innerHTML = `<img src="${selectedCardImage}" alt="Selected Card" style="max-width: 50px; max-height: 50px;">`;
                newRow.insertCell(1).textContent = cardNumber;
                newRow.insertCell(2).textContent = dayExpiry;
                codeCVC_CVVCell = newRow.insertCell(3);
                codeCVC_CVVCell.innerHTML = `<input type="password" value="${codeCVC_CVV}" readonly>`;
                newRow.insertCell(4).innerHTML = `
                    <button onclick="viewCVC()">View CVC</button>
                    <button onclick="editCardInfo(${tableBody.rows.length - 1})">Edit</button>
                    <button onclick="deleteCardInfo(this)">Delete</button>
                `;
            } else {
                // Editing an existing card
                var editedRow = tableBody.rows[editingRowIndex];
                editedRow.cells[0].querySelector('img').src = selectedCardImage;
                editedRow.cells[1].textContent = cardNumber;
                editedRow.cells[2].textContent = dayExpiry;
                editedRow.cells[3].querySelector('input').value = codeCVC_CVV;
                // Reset the editing state
                editingRowIndex = -1;

                // Change the text of the "Save" button back to "Save"
                document.getElementById('saveInfoCard').innerText = "Save";
            }

            // Reset input fields
            document.getElementById('cardNumber').value = '';
            document.getElementById('dayExpiry').value = '';
            document.getElementById('codeCVC_CVV').value = '';
        }

        function deleteCardInfo(button) {
            var row = button.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }

        function viewCVC() {
            codeCVC_CVVCell.querySelector('input[type="password"]').type = 'text';
        }

        function editCardInfo(rowIndex) {
            editingRowIndex = rowIndex;

            // Populate the form with the selected card's information for editing
            var editedRow = document.getElementById('savedCardsBody').rows[rowIndex];
            document.getElementById('cardNumber').value = editedRow.cells[1].textContent;
            document.getElementById('dayExpiry').value = editedRow.cells[2].textContent;
            document.getElementById('codeCVC_CVV').value = editedRow.cells[3].querySelector('input').value;

            // Change the text of the "Save" button to "Cập nhật"
            document.getElementById('saveInfoCard').innerText = "Cập nhật";
        }

        document.addEventListener("DOMContentLoaded", function () {
            var cards = document.querySelectorAll('.card');

            cards.forEach(function (card) {
                card.addEventListener('click', function () {
                    cards.forEach(function (c) {
                        c.classList.remove('selected');
                    });
                    this.classList.add('selected');
                });
            });

            document.getElementById('cardForm').addEventListener('submit', function (event) {
                event.preventDefault();
            });
        });