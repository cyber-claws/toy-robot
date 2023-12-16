import * as readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion() {
    rl.question('Enter a command (type "exit" to quit): ', (answer) => {
        // Handle the input
        if (answer === 'exit') {
            console.error("Exiting the CLI!");
            rl.close(); // This will end the program
        } else {
            console.log(`You entered: ${answer}`);

            // Continue asking questions
            askQuestion();
        }
    });
}

// Start the loop
askQuestion();
