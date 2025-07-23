async function getWeatherSummary(city) {
  try {
    // Step 1: Fetch user data to get city (mocked as user’s address.city)
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await userResponse.json();
    const cityName = user.address.city; // Get city from user data

    // Step 2: Fetch today’s weather (mocked as post 1)
    const weatherResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const weather = await userResponse.json();
    const weatherToday = post1;


    // Step 3: Fetch tomorrow’s forecast (mocked as post 2)
    // Use fetch('https://jsonplaceholder.typicode.com/posts/2')
    const weatherResponseTmr = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    const weatherTmr = await userResponse.json();
    const weatherTomorrow = post2;
    // Step 4: Return summary string
    // Example: "In [cityName], today’s weather is [post1.title]. Tomorrow’s forecast is [post2.title]."
    let str = `In ${cityName}, today's weather is ${post1}. Tmorrow's forecast is ${post2}`
  } catch (error) {
    return `Error fetching weather: ${error.message}`;
  }
}

// Test the function
(async () => {
  const summary = await getWeatherSummary();
  console.log(summary);
})();