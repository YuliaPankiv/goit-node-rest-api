// import fs from "fs";
// import HttpError from "../helpers/HttpError.js";

// const checkContactId = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const contactDB = await fs.readFile("../db/contacts.json");
//     const contacts = JSON.parse(contactDB);

//     const contact = contacts.find((el) => el.id === id);
//     if (!contact) throw new HttpError(404, "Contact not found.");
//     req.contact = contact;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default checkContactId;
