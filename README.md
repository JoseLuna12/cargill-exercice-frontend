## Project information
The project was built on react using Material UI and React Hooks.

### To start the project
- `npm start`

### Organization
The main organization of the project is:

- App.js        -> here is the React Router system
- pages         -> in this folder are stored all the pages 
- layout        -> in this folder there is the main layout of the project
- components    -> in this folder there are many reusable components

## Functionalities
- See a list of all Farms
- Edit each Farm
- Erase a Farm
- See every Pond for every Farm
- Add a Pond to a Farm
- Edit each Pond
- Erase a Pond
- Get the total size of a farm
- Feed each Pond`s shrimps ( save the time where the shrimps where feeded last time )

## Backend
The Backend of this project is on a separeted folder. All the http requests are made to the link: `http://localhost:8000/api`, port `8000`

### Quick setup for the Backend
- Download the Express project
- Run `npm install` to install dependencies
- Connect to a MongoDb database locally or online
    - Open the `app.js` file and replace the url inside de `mongoose.connect(<url>)` function
    - Database name `"cargill_shrimp"`
    - Collection name `"farms"` is used to store all Farms data
    - Collection name `"ponds"` is used to store all Ponds data