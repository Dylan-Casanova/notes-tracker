// dependecies 
const express = require('express');
const path = require('path');
const fs = require('fs');

//setting up Express app
const app = express();
const PORT = process.env.PORT || 3000;

//setting up Express app tp handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//setting routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname,'db.json'));
})
//takes a Json response with keys "title" and "text" 
// and adds a new note object with that message to the db.json file
app.post('api/notes',(req, res) => {
    fs.readFile(path.join(__dirname, "db.json"), "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        const notes =JSON.parse(response);
        const noteRequest = req.body;
        const newNoteId = notes.length + 1;
        const newNote ={
            id: newNoteId,
            title: noteRequest.title,
            text: noteRequest.text,
        };
        notes.push(newNote);
        res.json(newnote);
        fs.readFile(path.join(__dirname, 'db.json'),JSON.stringify(notes, null,2), function(err){
        if (err) throw err;
    });
});
});
// Deletes the note object with proper id from db.json file, returns the deleted note; 
//if id null, then returns false
app.delete("/api/notes/:id", function(req, res) {
    const deleteId = req.params.id;
    fs.readFile("db.json", "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }
        let notes = JSON.parse(response);
        if (deleteId <= notes.length) {
            // Method to remove an element from an array obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
            res.json(notes.splice(deleteId-1,1));
            // Reassign the ids of all notes
            for (let i=0; i<notes.length; i++) {
                notes[i].id = i+1;
            }
            fs.writeFile("db.json", JSON.stringify(notes, null, 2), function(err) {
                if (err) throw err;
            });
        } else {
            res.json(false);
        }
        

    });
    
});
//starts server
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
