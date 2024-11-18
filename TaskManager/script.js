// vv DATE_DISPLAY vv //

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var ending = "th";
const date = new Date();
// Initial declarations for the date and time display

ending = getEnding(date);
// Adds appropriate ending to the date

minuteText = checkMinutes(date);
// Calls checkMinutes function to get correct formatting for minutes displayed

secondText = checkSeconds(date);
// Calls checkSeconds function to get correct formatting for seconds displayed

dateText = "Today's date: " + date.getDate() + ending + " of " + months[date.getMonth()] + ", " + date.getFullYear() + " " + date.getHours() + ":" + minuteText + ":" + secondText;
// Adds a 0 in front of minutes if it's less than 10

document.getElementById("date").innerHTML = dateText;
// Formatting of the text for the date and time that shows up initially

setInterval(updateTime, 1000);
// calls updateTime() once every second

function updateTime() {
    const date = new Date();
    ending = getEnding(date);
    minuteText = checkMinutes(date);
    secondText = checkSeconds(date);
    dateText = "Today's date: " + date.getDate() + ending + " of " + months[date.getMonth()] + ", " + date.getFullYear() + " " + date.getHours() + ":" + minuteText + ":" + secondText;
    document.getElementById("date").innerHTML = dateText;
}
// Fetches new Date object, and then updates the dateText with new date and time

function getEnding(date) {
    if (date.getDate() > 3 && date.getDate() <= 20) {
        ending = "th"
    } else if (date.getDate().toString().endsWith("1")) {
        ending = "st";
    } else if (date.getDate().toString().endsWith("2")) {
        ending = "nd"
    } else if (date.getDate().toString().endsWith("3")) {
        ending = "rd"
    } else {
        ending = "th";
    }
    return ending;
}
// Function used to get appropriate ending for date displayed

function checkMinutes(date) {
    if (date.getMinutes() < 10) {
        minuteText = "0" + date.getMinutes();
    } else {
        minuteText = date.getMinutes();
    }
    return minuteText;
}
// Function used to add a "0" in front of minutes so it displays 00 - 09 correctly

function checkSeconds(date) {
    if (date.getSeconds() < 10) {
        secondText = "0" + date.getSeconds();
    } else {
        secondText = date.getSeconds();
    }
    return secondText;
}
// Function used to add a "0" in front of seconds so it displays 00 - 09 correctly

// ^^ DATE_DISPLAY ^^ //

// vv INDEX.HTML vv //

if (location.pathname === "/index.html") {
    // Makes sure that the current page open is the index
    // Used to load all the below code that is relevant to said page

    // vv TASK_MANAGER vv //
    const todos = document.querySelectorAll(".todo");
    // Gathers all elements within the class "todo" in variable "todos"

    const all_status = document.querySelectorAll(".status");
    // Gathers all elements within the class "status" in variable "all_status"

    todos.forEach((todo) => {
        todo.addEventListener("dragstart", dragStart);
        todo.addEventListener("dragend", dragEnd);
    });
    // Goes through every element within the "todo" class and adds eventlisteners for both dragstart and dragend events

    function dragStart() {
        draggableTodo = this;
        setTimeout(() => {
            this.classList.add("being_dragged");
            // Hides the initial location of the task
        }, 0);
    }
    // Function is called when "dragstart" event occurs
    // Simply adds a reference to object and also adds said object to class "being_dragged" to make its initial position disappear

    function dragEnd() {
        setTimeout(() => {
            draggableTodo.classList.remove("being_dragged");
            // Shows the task when dropped
            draggableTodo = null;
            // Sets draggable object to null to prevent it from being referenced in future unless it is selected again
        }, 0);
    }
    // Function is called when "dragend" event occurs
    // Simply removes class "being_dragged" from object to allow it to reappear in the dropped section and removes reference

    all_status.forEach((status) => {
        status.addEventListener("dragover", dragOver);
        status.addEventListener("dragenter", dragEnter);
        status.addEventListener("dragleave", dragLeave);
        status.addEventListener("drop", dragDrop);
    });
    // Goes through every element within the "status" class and adds eventlisteners for dragover, dragenter, dragleave and drop events

    function dragOver(e) {
        e.preventDefault();
    }
    // Function is called when "dragover" event occurs
    // This functions only purpose is to prevent the default action from occuring when a droppable element is dragged over this container

    function dragEnter() {
        this.classList.add("drag_enter");
    }
    // Adds object to "drag_enter" class, adding a dashed border around it

    function dragLeave() {
        this.classList.remove("drag_enter");
    }
    // Removes object from "drag_enter" class, removing the dashed border

    function dragDrop() {
        this.classList.remove("drag_enter");
        this.appendChild(draggableTodo);
    }
    // Removes object from "drag_enter" class, removing the dashed border
    // Also appends the droppable element to itself as a child

    // vv MODAL vv //

    const btns = document.querySelectorAll("[data-target-modal]");
    const close_modals = document.querySelectorAll(".close-modal");
    const overlay = document.getElementById("overlay");

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            document.querySelector(btn.dataset.targetModal).classList.add("active");
            // Opens modal
            overlay.classList.add("active");
            // Activates overlay
            document.getElementById('task_input').focus();
            // Focuses on input
        });
    });
    // Adds eventlistener for click to the button associated with the targetModal

    close_modals.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = btn.closest(".modal");
            document.getElementById("task_input").value = "";
            // Removes text from input window
            modal.classList.remove("active");
            // Closes modal
            overlay.classList.remove("active");
            // Disables overlay
        });
    });
    // Adds eventlistener for click for the cross on the right of the modal to close the modal

    window.onclick = (event) => {
        if (event.target == overlay) {
            const modals = document.querySelectorAll(".modal");
            document.getElementById("task_input").value = "";
            // Removes text from input window
            modals.forEach((modal) => modal.classList.remove("active"));
            // Closes modal
            overlay.classList.remove("active");
            // Disables overlay
        }
    }
    // Acts exactly like the cross on the modal display, however, event occurs not on button click but on window click

    // ^^ MODAL ^^ //

    // vv TASK_CREATION vv //

    const task_submit = document.getElementById("task_submit");
    task_submit.addEventListener("click", (e) => {
        e.preventDefault();
        // Prevents submit button from performing a refresh

        const input_value = document.getElementById("task_input").value;
        // Gets input from user from modal form

        if (input_value === "") {
            alert("Please enter a task description.");
            document.getElementById('task_input').focus();
            // Focuses on input
            return;
        }
        // Ensures the user has put text in the input, otherwise alerts them to do so

        const todo_div = document.createElement("div");
        // Creates a div container for the task

        const text = document.createTextNode(input_value);
        // Creates a text node using the input from the user

        todo_div.appendChild(text);
        // Appends textnode a child to the task div

        todo_div.classList.add("todo")
        todo_div.setAttribute("draggable", "true");

        const span = document.createElement("span");
        // Create and add a span

        const span_text = document.createTextNode("\u00D7");
        // Custom text code for cross

        span.classList.add("close");
        // Adds class "close" to the span element

        span.appendChild(span_text);
        // Appends the text, (cross symbol), to the span

        span.addEventListener("click", () => {
            span.parentElement.remove();
        });
        // Event listener for the span to remove the task

        todo_div.appendChild(span);
        // Appends the span element as a child to the task div

        no_status.appendChild(todo_div);
        // Direct use of the id "no_status" to append todo_div as child to the first column "No Status" as child

        todo_div.addEventListener("dragstart", dragStart);
        todo_div.addEventListener("dragend", dragEnd);
        // Adds event listeners to the tasks to allow them to be dragged and dropped

        document.getElementById("task_input").value = "";
        task_modal.classList.remove("active");
        overlay.classList.remove("active");
        // Sets the input window in the modal window to blank, and deactivates both the modal and the overlay
    });

    // ^^ TASK_CREATION ^^ //

    const remove_task_btns = document.querySelectorAll(".close");
    remove_task_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.parentElement.remove();
        });
    });
    // Adds event listener to pre-existing tasks

    // ^^ TASK_MANAGER ^^ //

    // vv WEATHER_APP vv //

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countrySelect = document.getElementById("country");
            const countryNames = data.map(country => country.name.common).sort();
            // Extracts common names and sort alphabetically

            countryNames.forEach(commonName => {
                const option = document.createElement("option");
                option.value = commonName;
                option.textContent = commonName;
                countrySelect.appendChild(option);
            });
            // Adds options to the select dropdown element

        })
        .catch(error => {
            console.error('Error fetching countries data: ', error);
            alert('Error fetching countries data. Please try again.');
        });
    // Fetch event that gets countries from a json and adds them to select element

    function getWeather() {
        const apiKey = "129971bbc2155cb59fc8eba04536dadc";
        // Personal API key from home.openweathermap.org used to fetch weather data

        const country = document.getElementById("country").value;
        // Country variable collected from user input

        if (!country) {
            alert("Please enter the name of a country");
            return;
        }
        // Alerts user if they haven't filled anything in for country

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${country}&appid=${apiKey}`;
        // URL setups to query openweathermap with selected country and api key

        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
                // Calls displayWeather function with data from URL query
            })
            .catch(error => {
                console.error("Error fetching current weather data: ", error);
                alert("Could not fetch weather data for this country. Sorry!");
            });
        // Fetch event that gets current weather from a json and calls displayWeather()

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                displayHourlyForecast(data.list);
                // Calls displayHourlyForecast function with data list from URL query
            })
            .catch(error => {
                console.error("Error fetching hourly forecast data: ", error);
            });
        // Fetch event that gets upcoming forecast from a json and calls displayHourlyForecast()
    }

    function displayWeather(data) {
        const tempDivInfo = document.getElementById("temp_div");
        const weatherInfoDiv = document.getElementById("weather_info");
        const weatherIcon = document.getElementById("weather_icon");
        const hourlyForecastDiv = document.getElementById("hourly_forecast");
        // Fetching all the div elements from html

        weatherInfoDiv.innerHTML = "";
        hourlyForecastDiv.innerHTML = "";
        tempDivInfo.innerHTML = "";
        // Clear any pre-existing content in div containers

        if (data === "404") {
            document.getElementById("p_weather_info").innerHTML = data.message;
            // Displays error message if URL query returns 404 error
        } else {
            const countryName = data.name;
            const temperature = Math.round(data.main.temp - 273.15);
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            // Collects the name, temperature, description and image + alt description from data

            document.getElementById("p_temp").innerHTML = temperature + "°C";
            document.getElementById("p_country_name").innerHTML = countryName;
            document.getElementById("p_description").innerHTML = description;
            weatherIcon.src = iconUrl;
            weatherIcon.alt = description;
            // Places all collected data into HTML

            showImage();
            // Calls showImage() function 
        }
    }
    // Function using data from URL Query to openweathermap that populates the different div containers
    // For the weather app section on the website with current weather information

    function displayHourlyForecast(hourlyData) {
        const hourlyForecastDiv = document.getElementById("hourly_forecast");
        const next24Hours = hourlyData.slice(0, 5);
        // Gets the first 5 items from the hourlyData list

        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            // Goes through every item from the data list and fetches the date to get the hour of the day, the temperature at this hour (rounded to nearest int)
            // Also fetches img icon for the weather at this hour

            const hourlyItemDiv = document.createElement('div');
            hourlyItemDiv.classList.add('hourly_item');
            // Creates a div container to hold the below elements

            const hourSpan = document.createElement('span');
            hourSpan.textContent = `${hour}:00`;
            // Creates a span element for the hour of the day and appends it as text

            const img = document.createElement('img');
            img.src = iconUrl;
            img.alt = "Hourly Weather Icon";
            // Creates an img element for the image icon and appends it

            const tempSpan = document.createElement('span');
            tempSpan.textContent = `${temperature}°C`;
            // Creates span element for temperature and appends it as text

            hourlyItemDiv.appendChild(hourSpan);
            hourlyItemDiv.appendChild(img);
            hourlyItemDiv.appendChild(tempSpan);
            // Appends elements to hourlyItemDiv

            hourlyForecastDiv.appendChild(hourlyItemDiv);
            // Appends hourlyItemDiv to hourlyForecastDiv
        });
        hourlyForecastDiv.classList.add("shown");
        // Shows the div that holds the hourly forecast
    }
    // Function that accepts the data.list from URL Query for the forecast to display the upcoming forecast every 3 hours for the day

    function showImage() {
        const weatherIcon = document.getElementById("weather_icon");
        weatherIcon.classList.add("shown");
    }
    // Function used to display the icon img for the current weather

    // ^^ WEATHER_APP ^^ //
}
// ^^ INDEX.HTML ^^ //