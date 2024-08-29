// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch the state name from the URL or user input
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get('state'); // Get the state name from URL

    if (!state) {
        alert('No state provided.');
        return;
    }

    // Update the state name in the header
    document.getElementById('state-name').innerText = state;

    // Example API endpoint (Replace with a real one)
    const apiEndpoint = `https://api.example.com/destinations?state=${state}`;

    // Fetch data from the API
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            // Populate the destination section
            const destinationList = document.getElementById('destination-list');
            data.destinations.forEach(destination => {
                const reviews = destination.reviews.map(review => `
                    <p><strong>${review.user}:</strong> ${review.comment} <em>(${review.rating} stars)</em></p>
                `).join('');
                
                const destinationCard = `
                    <div class="card destination">
                        <img src="${destination.imageUrl}" alt="${destination.name}">
                        <h3>${destination.name}</h3>
                        <p>${destination.description}</p>
                        <a href="${destination.videoUrl}" target="_blank">Watch Video</a>
                        <div class="reviews">
                            <h4>Reviews:</h4>
                            ${reviews}
                        </div>
                    </div>
                `;
                destinationList.innerHTML += destinationCard;
            });

            // Populate the hotel section
            const hotelList = document.getElementById('hotel-list');
            data.hotels.forEach(hotel => {
                const reviews = hotel.reviews.map(review => `
                    <p><strong>${review.user}:</strong> ${review.comment} <em>(${review.rating} stars)</em></p>
                `).join('');
                
                const hotelCard = `
                    <div class="card hotel">
                        <img src="${hotel.imageUrl}" alt="${hotel.name}">
                        <h3>${hotel.name}</h3>
                        <p>${hotel.description}</p>
                        <div class="reviews">
                            <h4>Reviews:</h4>
                            ${reviews}
                        </div>
                    </div>
                `;
                hotelList.innerHTML += hotelCard;
            });

            // Populate the food spots section
            const foodSpotList = document.getElementById('food-spot-list');
            data.foodSpots.forEach(foodSpot => {
                const reviews = foodSpot.reviews.map(review => `
                    <p><strong>${review.user}:</strong> ${review.comment} <em>(${review.rating} stars)</em></p>
                `).join('');
                
                const foodSpotCard = `
                    <div class="card food-spot">
                        <img src="${foodSpot.imageUrl}" alt="${foodSpot.name}">
                        <h3>${foodSpot.name}</h3>
                        <p>${foodSpot.description}</p>
                        <div class="reviews">
                            <h4>Reviews:</h4>
                            ${reviews}
                        </div>
                    </div>
                `;
                foodSpotList.innerHTML += foodSpotCard;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
