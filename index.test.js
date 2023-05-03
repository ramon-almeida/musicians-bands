const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
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
        const band = await Band.create({name:'Iron Maiden', genre: "Heavy Metal"})
        expect(band.name).toBe('Iron Maiden');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musician = await Musician.create({name: 'Dave Murray', instrument: 'Guitar'})
        expect(musician.instrument).toBe('Guitar');
    })

    test('can update a Band', async () => {
        // TODO - test updating a band
        const newBand = await Band.create({name:'Iron Maiden', genre: "Heavy Metal"})
        // Retrieve the band from the database
        const band = await Band.findOne({ where: { id: newBand.id } });
         // Update the name and genre
        band.name = 'Guns & Roses';
        band.genre = 'Rock';
        // Save the changes
        await band.save();
        const updatedBand = await Band.findOne({ where: { id: newBand.id } });
        expect(updatedBand.name).toBe('Guns & Roses');
        expect(updatedBand.genre).toBe('Rock');
    })

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        const newMusician = await Musician.create({name: 'Dave Murray', instrument: 'Guitar'})
        const musician = await Musician.findOne({ where: { id: newMusician.id } });
        musician.name = 'Slash';
        musician.instrument = 'Guitar';
        await musician.save()
        const updatedMusician = await Musician.findOne({where: {id: newMusician.id}});
        expect(updatedMusician.name).toBe('Slash');
        expect(updatedMusician.instrument).toBe('Guitar');
       
    })

    test('can delete a Band', async () => {
    
            // Create a new Band
            const newBand = await Band.create({ name: 'Iron Maiden', genre: 'Heavy Metal' });
          
            // Check that the Band exists
            const bandExistsBeforeDeletion = await Band.findOne({ where: { id: newBand.id } });
            expect(bandExistsBeforeDeletion).toBeTruthy();
          
            // Delete the Band
            await Band.destroy({ where: { id: newBand.id } });
          
            // Check that the Band no longer exists
            const bandExistsAfterDeletion = await Band.findOne({ where: { id: newBand.id } });
            expect(bandExistsAfterDeletion).toBeFalsy();
          });
    });

    test('can delete a Musician', async () => {
        
            // Create a new Band
            const newMusician = await Musician.create({ name: 'Slash', instrument: 'Guitar' });
          
            // Check that the Band exists
            const musicianExistsBeforeDeletion = await Musician.findOne({ where: { id: newMusician.id } });
            expect(musicianExistsBeforeDeletion).toBeTruthy();
          
            // Delete the Band
            await Musician.destroy({ where: { id: newMusician.id } });
          
            // Check that the Band no longer exists
            const musicianExistsAfterDeletion = await Musician.findOne({ where: { id: newMusician.id } });
            expect(musicianExistsAfterDeletion).toBeFalsy();
    });
    
