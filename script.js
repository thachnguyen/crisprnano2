
    // Get the input field and recommendations container
    const inputField = document.getElementById('inputField');
    const recommendationsContainer = document.getElementById('recommendations');

    // Read the text file
    fetch('genename.txt')
        .then(response => response.text())
        .then(data => {
            // Split the data into lines and create a list of recommendations
            const lines = data.split('\n');
            const recommendations = lines.map(line => line.trim()).filter(Boolean);

            // Listen for input events on the input field
            inputField.addEventListener('input', function() {
                // Get the current value of the input field
                const value = inputField.value.trim().toLowerCase();

                // Filter the recommendations based on the input value
                const filteredRecommendations = recommendations.filter(recommendation => recommendation.toLowerCase().includes(value));

                // Update the recommendations container with the filtered recommendations
                updateRecommendations(filteredRecommendations);
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the file:', error);
        });

    // Function to update the recommendations container
    function updateRecommendations(recommendations) {
        // Clear the recommendations container
        recommendationsContainer.innerHTML = '';

        // Create a dropdown menu and append it to the container
        const select = document.createElement('select');
        recommendations.forEach(recommendation => {
            const option = document.createElement('option');
            option.textContent = recommendation;
            option.value = recommendation;
            select.appendChild(option);
        });
        recommendationsContainer.appendChild(select);

        // Listen for change events on the dropdown menu
        select.addEventListener('change', function() {
            // Set the value of the input field to the selected value
            inputField.value = select.value;
        });
    }
