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
app.delete('/api/notes/:id', (req, res) => {
    const delteId = req.params.id;
    fs.readFile('db.json','utf8',(req, res) => {
        if (err) {
            console.log(err);
        }; 
        let notes =JSON.parse(res);
        if(deleteId <= notes.length){
            //method to remove an element from an array
            res.json(notes.splice(deleteId-1,1));
            // resetting ids for all notes
            for (let i=0; i<notes.length; i++){
                notes[i].id = i+1
            };
            fs.writeFile('db.json', JSON.stringify(notes,null,2), function(err) {
                if (err) throw err;
                console.log(err);
            });
        } else {
            res.json(false);
        }

    });
    //server begins to listen
    app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
