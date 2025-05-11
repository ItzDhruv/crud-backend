const express = require('express');
const routes = express.Router();
const Contact = require('../models/Contact');


// create data

routes.post('/contact', async (req, res) => {
try{
    const newContact = new Contact(req.body);
    await newContact.save()
    .then((savedContact) => {
        console.log('Contact created:', savedContact);
        res.status(201).json({ message: 'Contact created successfully'});
    })
    .catch((error) => {
        console.error('Error saving contact:', error);
        res.status(500).json({ message: 'Failed to save contact' });
    })


} catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Failed to create new contact' });
}
})

// Read data
// Fetch all contacts
routes.get('/contact', async (req, res) => {
    try{
        Contact.find()
        .then((contacts) => {
            console.log('Contacts fetched:', contacts);
            res.status(200).json(contacts);
        })
    }catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
})

// Fetch a contact by ID

routes.get('/contact/:id', async (req, res) => {
    try{
        const contactId = req.params.id; 
        Contact.findById(contactId)
        .then((contact) => {
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            console.log('Contact fetched:', contact);
            res.status(200).json(contact);
        })
    }catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Failed to fetch contacts' });
    }
})

routes.get('/search',async (req, res) => {
try{
const searchTerm = req.query.searchTerm;
const searchRegex = new RegExp(searchTerm,"i")
await Contact.find({
    $or: [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
    ]
})
.then((contacts) => {
    console.log('Contacts fetched:', contacts);
    res.status(200).json(contacts);
})
.catch((error) => {

    console.error('Error searching contacts:', error);
    res.status(500).json({ message: 'Failed to search contacts' });
})
} catch (error) {
    console.error('Error searching contacts:', error);
    res.status(500).json({ message: 'Failed to search contacts' });
}
})

// Update data


routes.put('/contact/:id', async (req, res) => {

    try{
        const contactId = req.params.id;
        const updatedData = req.body;
        await Contact.findOneAndUpdate({ _id: contactId }, updatedData, { new: true })
        .then((updatedContact) => {
            if (!updatedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            console.log('Contact updated:', updatedContact);
            res.status(200).json({ message: 'Contact updated successfully' },{ updatedContact });
        })
    }
    catch(error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ message: 'Failed to update contact' });
    }
})

// Delete data


routes.delete('/contact/:id', async (req, res) => {
    try{
        const contactId = req.params.id;
        await Contact.findByIdAndDelete(contactId)
        .then((deletedContact) => {
            if (!deletedContact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            console.log('Contact deleted:', deletedContact);
            res.status(200).json({ message: 'Contact deleted successfully' });
        })

    }catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Failed to delete contact' });
    }
})

module.exports = routes;