const {Band} = require('./Band');
const {Musician} = require('./Musician');
const {Song} = require('./Song');

/**
 * TODO: Create assoications between Musician and Band models
 * 
 *  Clue#1:  Each musician instance must belong to a band
 *  Clue#2: Bands can have multiple musicians
 * 
 *  To complete this task, you'll have to use the functions .belongsTo() and .hasMany() 
 */

Musician.belongsTo(Band);
Band.hasMany(Musician);
// Song.belongsToMany(Band, { through:
//  "band_song"});
// Band.belongsToMany(Song, {through:
//  "song_band"});


module.exports = {
    Band,
    Musician,
    Song,
};