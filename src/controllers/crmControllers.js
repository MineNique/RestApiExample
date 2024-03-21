import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel.js";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = async (req, res) => {
	try {
		const newContact = new Contact(req.body);
		const savedContact = await newContact.save();
		res.json(savedContact);
	} catch (err) {
		if (err.name === "ValidationError") {
			const validationErrors = {};
			for (const field in err.errors) {
				validationErrors[field] = err.errors[field].message;
			}
			res.status(400).json({
				errors: validationErrors,
				message: "Contact validation failed",
			});
		} else {
			res.status(500).send("Internal server error");
		}
	}
};

export const getContacts = (req, res) => {
	Contact.find({})
		.then((contacts) => {
			res.json(contacts);
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
};

export const getContactWithId = (req, res) => {
	Contact.findById(req.params.contactId)
		.then((contact) => {
			if (!contact) {
				return res.status(404).json({ message: "Contact not found" });
			}
			res.json(contact);
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
};

export const updateContact = (req, res) => {
	Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, {
		new: true,
	})
		.then((contact) => {
			if (!contact) {
				return res.status(404).json({ message: "Contact not found" });
			}
			res.json(contact);
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
};

export const deleteContact = (req, res) => {
	Contact.findByIdAndDelete(req.params.contactId)
		.then((contact) => {
			if (!contact) {
				return res.status(404).json({ message: "Contact not found" });
			}
			res.status(200).json({ message: "Successfully deleted" });
		})
		.catch((error) => {
			res.status(500).json({ message: error.message });
		});
};
