const rimraf = require('rimraf');
afterAll(() => {
  rimraf('./data/data.musicxml', () => {
    console.log('🤖 [Automata] musicXML source deleted');
  });
});
