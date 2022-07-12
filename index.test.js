const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        /**
         * Create a new instance of a band using the Band Model
         *  Check to see if the name passed into the object is in fact the correct on the new instance
         **/

        const actualValue = await Band.create({
            name: "test",
            genre: "Pop"
        })
        expect(actualValue.name).toBe('test');
        expect(actualValue.genre).toBe('Pop');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        /**
         * Create a new instance of a musician using the Musician Model
         *  Check to see if the name or intrument passed into the object is infact the correct on the new instance
         **/
        const actualValue = await Musician.create({
            name:"Bob",
            instrument:"flute"
        })

        expect(actualValue.name).toBe("Bob");
        expect(actualValue.instrument).toBe("flute");
    })

    /*
     * Optional test to show associations:
        - I've completed this test for you
        - I've left it here for you to see how to go about testing associations 
    */

    test('Band can have many Musicians', async () => {
        await sequelize.sync({ force: true }); // recreate db
        let BigBang = await Band.create({ name: 'BIGBANG', genre: 'KPOP' }); //create band
        let GD = await Musician.create({ name: 'G-Dragon', instrument: 'Voice' }); //create musician
        let Top = await Musician.create({ name: 'TOP', instrument: 'Voice' }); //create musician
    
        await BigBang.addMusician(GD); //add musician to band
        await BigBang.addMusician(Top); //add musician to band
    
        const musicians = await BigBang.getMusicians(); //get all musicians in band - returns an array
    
        expect(musicians.length).toBe(2); //we've added two musicians, so the length should be two
        expect(musicians[0] instanceof Musician).toBeTruthy; //checks that the value at index 0 of the list - a musician object, is in fact a musician object
      });

      test('Can create songs', async()=> {
        const actualValue = await Song.create({
            name: "fun",
            year: 200,
        });
        console.log(actualValue.year);
        expect(actualValue).toBe("fun");
      });

      test('Song models', async () => {
        await sequelize.sync({ force: true });

        const actualValue = await Band.create({
            name: "test",
            genre: "Pop"
        })

        const actualValue2 = await Band.create({
            name: "test2",
            genre: "Pop"
        })

        const actualValue3 = await Song.create({
            title: "song1",
            year: 1999
        });

        const actualValue4 = await Song.create({
            title: "song2",
            year: 2000
        });


        await actualValue.addSong(actualValue3);
        await actualValue.addSong(actualValue4);
        await actualValue2.addSong(actualValue3);
        await actualValue2.addSong(actualValue4);

        let expectedValue = actualValue.getSongs();
        expect(expectedValue).toBe(2);
    })

})