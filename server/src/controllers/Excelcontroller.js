import { User, Rooms, Conference, PaymentHistory, Tour } from '../models/models.js';
import fs from 'fs';
import multer from 'multer';
import path from "path";
import { fileURLToPath } from "url";
import xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const upload = multer({dest : 'uploads/'});

export const UploadExcel = async(req, res) => {
    console.log("Upload called!");
    console.log(req.file);
    if(!req.file){
        return res.status(400).send("No File Uploaded");
    }

    const tempPath = req.file.path;
    console.log(`Temporary Path: ${tempPath}`);
    const targetPath = path.join(__dirname, '../../data/data.xlsx');
    console.log(`Target Path: ${targetPath}`);

    await fs.promises.copyFile(tempPath, targetPath);
    await fs.promises.unlink(tempPath);
    console.log("File uploaded");

    
    await Conference.destroy({ where: {}, truncate: true });
    await Tour.destroy({ where: {}, truncate: true });
    await Rooms.destroy({ where: {}, truncate: true });

    const workbook = xlsx.readFile(targetPath);

    for(const sheetName of workbook.SheetNames){
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        if(sheetName === 'User'){
            for(const row of data){
                await User.upsert({
                    email : row['email'],
                    phone_no : row['phone_no'],
                    password : row['password'],
                    admin : row['admin']
                });
            }
        }
        else if(sheetName === 'Conference'){
            for(const row of data){
                await Conference.create({
                    conference_price : row['conference_price'],
                    photography_price : row['photography_price'],
                    videographu_price : row['videographu_price'],
                    wedding_price : row['wedding_price']
                })
            }
            const userData = await Conference.findAll({
                attributes : ['id', 'conference_price', 'photography_price', 'videographu_price', 'wedding_price']
            });
            const userJson = userData.map(user => ({
                id : user.id,
                conference_price : user.conference_price,
                photography_price : user.photography_price,
                videographu_price : user.videographu_price,
                wedding_price : user.wedding_price
            }));
            const worksheet = xlsx.utils.json_to_sheet(userJson);
            workbook.Sheets['Conference'] = worksheet
            xlsx.writeFile(workbook, targetPath);
        }
        else if(sheetName === 'Tour'){
            for(const row of data){
                await Tour.create({
                    spiceGarden : row['spiceGarden'],
                    beeGarden : row['beeGarden'],
                    both : row['both']
                });
            }
            const tourData = await Tour.findAll({
                attributes : ['id', 'spiceGarden', 'beeGarden', 'both']
            });
            const tourJson = tourData.map(tour => ({
                id : tour.id,
                spiceGarden : tour.spiceGarden,
                beeGarden : tour.beeGarden,
                both : tour.both
            }));
            const worksheet = xlsx.utils.json_to_sheet(tourJson);
            workbook.Sheets['Tour'] = worksheet;
            xlsx.writeFile(workbook, targetPath);
        }
        else if(sheetName === 'Rooms'){
            for(const row of data){
                await Rooms.create({
                    adult_price : row['adult_price'],
                    child_price : row['child_price'],
                });
            }
            const roomData = await Rooms.findAll({
                attributes : ['id', 'adult_price', 'child_price']
            });
            const roomJson = roomData.map(room => ({
                id : room.id,
                adult_price : room.adult_price,
                child_price : room.child_price
            }));
            const worksheet = xlsx.utils.json_to_sheet(roomJson);
            workbook.Sheets['Rooms'] = worksheet;
            xlsx.writeFile(workbook, targetPath);
        }

    }
    fs.promises.unlink(targetPath);
    res.status(200).send("File uploaded");

}

export const DownloadExcel =  async(req, res) => {
    const users = await User.findAll({
        attributes : ['id', 'email', 'phone_no', 'password', 'admin']
    });
    console.log(users);
    const conferences = await Conference.findAll({
        attributes : ['id', 'conference_price', 'photography_price', 'videographu_price', 'wedding_price']
    });
    console.log(conferences);
    const tours = await Tour.findAll({
        attributes : ['id', 'spiceGarden', 'beeGarden', 'both']
    });
    console.log(tours);
    const rooms = await Rooms.findAll({
        attributes : ['id', 'adult_price', 'child_price']
    });
    console.log(rooms);
    const paymenthistories = await PaymentHistory.findAll({
        attributes : ['id', 'email', 'amount', 'startDate', 'endDate', 'startTime', 'endTime', 'period', 'time']
    });
    const workbook = xlsx.utils.book_new();
    const userSheet = xlsx.utils.aoa_to_sheet([['id', 'email', 'phone_no', 'password', 'admin'], ...users.map(user => [user.dataValues.id, user.dataValues.email, user.dataValues.phone_no, user.dataValues.password, user.dataValues.admin])]);
    const conferenceSheet = xlsx.utils.aoa_to_sheet([['id', 'conference_price', 'photography_price', 'videographu_price', 'wedding_price'], ...conferences.map(conference => [conference.dataValues.id, conference.dataValues.conference_price, conference.dataValues.photography_price, conference.dataValues.videographu_price, conference.dataValues.wedding_price])]);
    const tourSheet = xlsx.utils.aoa_to_sheet([['id', 'spiceGarden', 'beeGarden', 'both'], ...tours.map(tour => [tour.dataValues.id, tour.dataValues.spiceGarden, tour.dataValues.beeGarden, tour.dataValues.both])]);
    const roomSheet = xlsx.utils.aoa_to_sheet([['id', 'adult_price', 'child_price'], ...rooms.map(room => [room.dataValues.id, room.dataValues.adult_price, room.dataValues.child_price])]);
    const paymentSheet = xlsx.utils.aoa_to_sheet([['id', 'email', 'amount', 'startDate', 'endDate', 'startTime', 'endTime', 'period', 'time'], ...paymenthistories.map(paymenthistory => [paymenthistory.dataValues.id, paymenthistory.dataValues.email, paymenthistory.dataValues.amount, paymenthistory.dataValues.startDate, paymenthistory.dataValues.endDate, paymenthistory.dataValues.startTime, paymenthistory.dataValues.endTime, paymenthistory.dataValues.period, paymenthistory.dataValues.time])]);
    
    xlsx.utils.book_append_sheet(workbook, userSheet, 'Users')
    xlsx.utils.book_append_sheet(workbook, conferenceSheet, 'Conferences')
    xlsx.utils.book_append_sheet(workbook, tourSheet, 'Tours')
    xlsx.utils.book_append_sheet(workbook, roomSheet, 'Rooms')
    xlsx.utils.book_append_sheet(workbook, paymentSheet, 'Payment Histories')

    const tempFilePath = `temp-${Date.now()}.xlsx`;
    xlsx.writeFile(workbook, tempFilePath);

    res.download(tempFilePath, 'data.xlsx', (err) => {
        console.log(err);
        if(!res.headersSent){
        res.status(500).send("Error downloading file");
        }
    })
    fs.promises.unlink(tempFilePath);
}