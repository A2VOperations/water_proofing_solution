import dbConnect from "./backend/dbConfig/db.js";
import Service from "./backend/models/Service.js";
import Work from "./backend/models/Work.js";
import mongoose from "mongoose";

async function checkLinks() {
    await dbConnect();
    const services = await Service.find({});
    const works = await Work.find({});
    
    console.log("Services with links:");
    services.forEach(s => {
        if (s.youtubeLinks && s.youtubeLinks.length > 0) {
            console.log(s.title, s.youtubeLinks);
        }
    });

    console.log("Works with links:");
    works.forEach(w => {
        if (w.youtubeLinks && w.youtubeLinks.length > 0) {
            console.log(w.title, w.youtubeLinks);
        }
    });

    mongoose.disconnect();
}

checkLinks();
