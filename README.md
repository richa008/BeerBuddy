# BeerBuddy
BeerBuddy App using BreweryDb APIs

 1. Functionality
Beer Buddy is a SPA built in AngularJs that uses the BreweryDb API's to get data. The application lets you search for   beers by beer name, style, ABV    and IBU values. The search results are displayed in a table form.
BreweryDb - http://www.brewerydb.com/developers/docs
 
 2. How to start
    - Install node
    - Run npm install
    - Run node server.js, server starts at port 3000
    - Go to url http://localhost:3000/
 
 3. Libraries used
    - AngularJS
    - Bootstrap
 
 4. Technical Details
- The BreweryDb does not support jsonp. They also do not have CORS enabled so I could not make API calls from the browser. I set up a server using Express (server.js). The browser calls the server and the server makes BreweryDb API calls.
- Used the API's GET: /beers and GET: /search
- /beers takes the parameters abv, ibu and styleId. This API also searches by name and does sorting, but the name has a to be the full name of the beer. It does not do searches on partial names, which was a requirement. That is why I used the /search Api for beer name searches and /beers for filtering on abv, ibu and styleId
- Sorting happens on the client side, without making a service call. 
 
 5. Comments
    Since I am combining results of 2 different Api's, the results may not always be accurate when all filters are used together. To avoid this I would change the /beers API to also to partial searches. I am displaying only the first 50 results, I would also implement pagination so that more results can be displayed.  
