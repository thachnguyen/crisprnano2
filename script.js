document.getElementById('loadButton').addEventListener('click', function() {
    const url = prompt("Enter the URL of the FASTA file:");

    if (url) {
        fetchFasta(url);
    }
});

function fetchFasta(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            let sequence = '';

            for (const line of lines) {
                if (line.startsWith('>')) {
                    continue; // Skip the header line
                }
                sequence += line.trim();
            }

            displayFasta(sequence);
        })
        .catch(error => console.error('Error fetching FASTA:', error));
}

function displayFasta(sequence) {
    const fastaContent = document.getElementById('fastaContent');
    fastaContent.textContent = sequence;
}
