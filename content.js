const apiKey = 'YOUR_YELP_API_KEY'; // Replace with your Yelp API key
const businessName = 'Business Name'; // Replace with the business name you want to search for

// Function to fetch Yelp reviews
async function fetchYelpReviews(businessName) {
  const response = await fetch(`https://api.yelp.com/v3/businesses/search?term=${businessName}&location=India`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  const data = await response.json();
  if (data.businesses && data.businesses.length > 0) {
    const businessId = data.businesses[0].id;
    const reviewsResponse = await fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    const reviewsData = await reviewsResponse.json();
    return reviewsData.reviews;
  }
  return [];
}

async function displayYelpReviews() {
  const reviews = await fetchYelpReviews(businessName);

  if (reviews.length > 0) {
    const overlay = document.createElement('div');
    overlay.className = 'yelp-reviews-overlay';

    reviews.forEach(review => {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'yelp-review';
      reviewElement.innerHTML = `
        <p><strong>${review.user.name}</strong></p>
        <p>${review.text}</p>
        <p>Rating: ${review.rating}</p>
      `;
      overlay.appendChild(reviewElement);
    });

    document.body.appendChild(overlay);
  }
}

const button = document.createElement('button');
button.textContent = 'Show Yelp Reviews';
button.className = 'yelp-review-button';
button.onclick = displayYelpReviews;
document.body.appendChild(button);
