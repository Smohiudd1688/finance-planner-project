# The Finance Your Future Application

This application allows a user to create a budget to take control of their finances. They can create the
different categories for their budget and track the money they spend.

## Getting Started

### FrontEnd Installation

1. Clone the repository and cd into the folder containing the project.
2. Install the neccessary dependencies using the code below.
    ```bash
    npm install --prefix client
    ```
3. Make sure Google Chrome is your default browser, it may not work correctly otherwise.
4. In terminal open the html file in the browser using the code below.
    ```bash
    npm start --prefix client
    ```

### BackEnd Installation

1. To install the server, starting at the root of the repository cd into the folder labeled phase-3-sinatra-react-project.
2. Run the following line in terminal to install the necessary gems.
    ```bash
    bundle install
    ```
3. Create the database in order to start using it, with the following code.
    ```bash
    rails db:create
    rails db:migrate
    ```
3. Once the gems are installed, run the following code to start up ther server.
    ```bash
    rails s
    ```
4. You are now ready to use the application!

## Usage
To use this application you can go to the [website](https://fitness-tracker-app.onrender.com/). A user can sign up by creating an account, once the account is created the can create the categories they want for their budget and add the money they set aside as the month progresses. A user may also travel to the wanted items tracker page and track any items they want to purchase in the future, and also travel to the budget breakdown page and get a visual breakdown of how their budget is allocated.

## Project Status
This application is completed for now.
