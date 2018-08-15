describe('[Quintes parallèles]', () => {
  describe('Contrôle des quintes voix à voix', () => {
    for (let i = 1; i < chords.length; i++) {
      let firstChord = chords[i - 1];
      let secondChord = chords[i];
      assertions = [{
        test: firstChord[1].midiValue - firstChord[0].midiValue === 7
          && secondChord[1].midiValue - secondChord[0].midiValue === 7,
        message: `Accords ${i} et ${i + 1} : Quintes parallèles entre la basse et le ténor.`,
      }, {
        test: firstChord[2].midiValue - firstChord[0].midiValue === 7
        && secondChord[1].midiValue - secondChord[0].midiValue === 7,
        message: `Accords ${i} et ${i + 1} : Quintes parallèles entre la basse et l'alto.`,
      }, {
        test: firstChord[3].midiValue - firstChord[0].midiValue === 7
        && secondChord[3].midiValue - secondChord[0].midiValue === 7,
        message: `Accords ${i} et ${i + 1} : Quintes parallèles entre la basse et la soprane.`,
      }, {
        test: firstChord[2].midiValue - firstChord[1].midiValue === 7
        && secondChord[2].midiValue - secondChord[1].midiValue === 7,
        message: `Accords ${i} et ${i + 1} : Quintes parallèles entre le ténor et l'alto.`,
      }, {
        test: firstChord[3].midiValue - firstChord[1].midiValue === 7
        && secondChord[3].midiValue - secondChord[1].midiValue === 7,
        message: `Accords ${i} et ${i + 1} : Quintes parallèles entre le ténor et la soprane.`,
      }, {
        test: firstChord[3].midiValue - firstChord[2].midiValue === 7
        && secondChord[3].midiValue - secondChord[2].midiValue === 7,
        message: `Accords ${i} et ${i + 1} : Quintes parallèles entre la soprane et l'alto.`,
      }];
      assertions.forEach(assertion => test(assertion.message, () => expect(assertion.test).toBe(false)));
    }
  });
});
