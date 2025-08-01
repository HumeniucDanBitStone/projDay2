import multer, {Multer} from "multer";

import randomCodeGen from "./../util/randomCodeGen.js";

function getFileExtension(file: Express.Multer.File): string {
    let fileExtension: string | undefined = file.originalname.split(".").pop()
    return fileExtension ? fileExtension : "jpg"
}

const photoMiddleware: Multer = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'files/1/')
        },
        filename: (req, file, callback) => {
            callback(
                null,
                randomCodeGen.generatePhotoString(32) + '.' +
                getFileExtension(file)
            )
        }
    })
})

export default photoMiddleware