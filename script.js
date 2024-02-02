document.addEventListener('DOMContentLoaded', function () {
    const output = document.querySelector('.output');
    const buttons = document.querySelectorAll('.btn, .btnresult');

    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent;

            if (buttonText === 'C') {
                // Clear the calculator
                currentInput = '';
            } else if (buttonText === '=') {
                // Calculate and update the result
                try {
                    currentInput = eval(currentInput);
                } catch (error) {
                    currentInput = 'Error';
                }
            } else {
                // Append the button text to the current input
                currentInput += buttonText;
            }

            // Update the display
            updateDisplay();
        });
    });

    function updateDisplay() {
        // Display the current input
        output.value = currentInput;
    }
});
