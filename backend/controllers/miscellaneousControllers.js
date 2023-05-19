const lists = require('../dataBaseScripts/lists');

exports.getAllHospitals = async (req, res, next) => {
    try {
        var hospitals = JSON.parse(JSON.stringify(lists.hospitalsArray));

        res.status(200).json({ hospitals });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAllSpecialities = async (req, res, next) => {
    try {
        var specialities = JSON.parse(JSON.stringify(lists.specialitiesArray));

        res.status(200).json({ specialities });
    } catch (error) {
        console.log(error);
        next(error);
    }
}
