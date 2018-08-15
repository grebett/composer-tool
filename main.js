const { DOMParser } = require('xmldom');
const fs = require('fs');
const NOTES_PER_MEASURE = 2;
const { NOTES_TO_MIDI_TABLE } = require('./tables');

// ===============
//    TOOLING    |
// ===============

const getMidiValue = note => {
  return (
    NOTES_TO_MIDI_TABLE.find(el => el.step === note.step && el.octave === note.octave).midi +
    parseInt(note.alteration || 0, 10)
  );
};

// ============
//    MAIN    |
// ============

const getChords = (filename = './data/data.musicxml') => {
  try {
    const chords = [];
    const data = fs.readFileSync(filename);
    const stripped = data.toString().replace(/  |\n/g, '');
    const parsed = new DOMParser().parseFromString(stripped);
    const measures = Array.from(parsed.documentElement.getElementsByTagName('measure'));
    let i = -1;
    // for each measure, sort the note into chords
    measures.forEach((measure, index) => {
      const children = Array.from(measure.childNodes);
      let staff = 'top';
      children.forEach(child => {
        if (child.nodeName === 'note') {
          // first we ignore the note if it is only a rest
          if (child.firstChild.nodeName === 'rest') {
            return;
          } else if (child.firstChild.nodeName !== 'chord') {
            i++;
          }
          if (!chords[i]) {
            chords[i] = { top: [], bottom: [] };
          }
          chords[i][staff].push(child);
        } else if (child.nodeName === 'backup') {
          // backup means we reached the end of the bar and need to go back to check the other staff
          i = -1 + index * NOTES_PER_MEASURE;
          staff = 'bottom';
        }
      });
    });
    // for each chords, concat staff to form a single chord
    const concatedChords = chords.map(chord => chord.bottom.concat(chord.top));
    // for each concated chord, map them to a more readable values
    const formattedChords = concatedChords.map(chord => {
      return chord.map(note => {
        let pitch = note.getElementsByTagName('pitch')[0];
        const getIfExist = property =>
          pitch.getElementsByTagName(property)[0]
            ? pitch.getElementsByTagName(property)[0].firstChild.nodeValue
            : null;
        const step = getIfExist('step');
        const octave = getIfExist('octave');
        const alteration = getIfExist('alter');
        return {
          step,
          octave,
          alteration,
          midiValue: getMidiValue({ step, octave, alteration }),
        };
      });
    });
    return formattedChords;
  } catch (e) {
    console.error('OUPS', e);
  }
};

module.exports = getChords;
