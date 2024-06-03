import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import db from "./src/db"
import { follow, getFollowers } from './src/controller/follow';
import router from "./src/routes";
import path from "path";
import cors from "cors"


dotenv.config();
const port = process.env.PORT || 3090

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use(router);


app.get("/", async (req: Request, res: Response) => {
    const listUser = await db.user.findMany();
    const singleUser = await db.user.findFirst({
        where: {
            id: 2,
        },
    });

    res.send({
        listUser,
        singleUser,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
