const { exec } = require('child_process')
const axios = require('axios');

console.log('Apply schema cho directus!!!');

exec('npm run apply', function (error, stdiout, stderr) {
    console.log('stdiout: ', stdiout);

    console.log('stderr: ', stderr);

    if (error) {
        console.log('Không thể apply schema: ', error);

        const environment = process.env.NODE_ENV;

        if (environment == 'production') {

            axios.post('https://discord.com/api/webhooks/1128600438728577024/AcO8Y5EdZfRBRL0J6gFYc2meFFMg1zpVg9_Lc_4-Eybtbag4aELoOyZT1AqeN-TWT_-e', {
                content: `Migrate directus failed rồi anh em ơi!!!`
            });
        }


    }

})