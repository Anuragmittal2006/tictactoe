document.addEventListener('DOMContentLoaded', () => {

    const board = document.getElementById('board');

    const celebrationDiv = document.getElementById('celebration');

    const playAgainBtn = document.getElementById('playAgainBtn');

    const changeThemeBtn = document.getElementById('changeThemeBtn');

    let currentPlayer = 'X';

    const cells = new Array(9).fill(null);

    function createCell(index) {

        const cell = document.createElement('div');

        cell.className = 'cell';

        cell.addEventListener('click', () => handleCellClick(index));

        board.appendChild(cell);

    }

    function renderBoard() {

        board.innerHTML = '';

        cells.forEach((value, index) => {

            createCell(index);

            const cell = board.children[index];

            cell.textContent = value;

        });

        applyTheme();

    }

    function handleCellClick(index) {

        if (!cells[index]) {

            cells[index] = currentPlayer;

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            renderBoard();

            checkWinner();

        }

    }

    function checkWinner() {

        const winningCombos = [

            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows

            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns

            [0, 4, 8], [2, 4, 6]             // Diagonals

        ];

        for (const combo of winningCombos) {

            const [a, b, c] = combo;

            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {

                celebrateWinner();

                return;

            }

        }

        if (!cells.includes(null)) {

            alert('It\'s a draw!');

            resetGame();

        }

    }

    function celebrateWinner() {

        playCelebration();

    }

    function resetGame() {

        cells.fill(null);

        renderBoard();

    }

    function handleTouchStart() {

        playAgainBtn.classList.add('tap-animation');

    }

    function handleTouchEnd() {

        playAgainBtn.classList.remove('tap-animation');

        resetGame();

    }

    function playCelebration() {

        celebrationDiv.classList.remove('hidden');

        // Load and display video ad on Play Again

        (adsbygoogle = window.adsbygoogle || []).push({});

        playAgainBtn.addEventListener('click', () => {

            celebrationDiv.classList.add('hidden');

            resetGame(); // Reset the game on Play Again

        });

        playAgainBtn.addEventListener('touchstart', handleTouchStart);

        playAgainBtn.addEventListener('touchend', handleTouchEnd);

    }

    function handleThemeChange() {

        applyTheme();

    }

    function applyTheme() {

        // Add your theme-changing logic here

        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

        document.body.style.backgroundColor = randomColor;

    }

    changeThemeBtn.addEventListener('click', handleThemeChange);

    renderBoard();

});