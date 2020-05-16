module.exports = {

    // SEND FILE TO CLOUDINARY
    async UploadImage(img) {

        const cloudinary = require('cloudinary').v2;

        cloudinary.config({
            cloud_name: 'ltorresi',
            api_key: '558786579585546',
            api_secret: 'Z_h2HFBeeglXIr7OJb8CBTRYeIA'
        });               

        const img64 = 'data:image/jpg;base64,' + img;

        await cloudinary.uploader.upload(img64, function (error, result) {
            /* console.log(result.url, error) */
            if (result != null) {
                _result = result.url;
            }
            console.log(error);
        });

        return _result;
    }
}