const noteFrequencies = {
    A0: 27.5, B0: 30.87, C1: 32.7, D1: 36.71, E1: 41.2, F1: 43.65, G1: 49.0,
    A1: 55.0, B1: 61.74, C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.0,
    A2: 110.0, B2: 123.47, C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0,
    A3: 220.0, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0,
    A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
    A5: 880.0, B5: 987.77, C6: 1046.5, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98,
    A6: 1760.0, B6: 1975.53, C7: 2093.0, D7: 2349.32, E7: 2637.02, F7: 2793.83, G7: 3135.96,
    A7: 3520.0, B7: 3951.07, C8: 4186.01,
};
/**
 * Play a melody given as an array of note names and durations.
 * @param melody - Array of note-duration pairs, e.g., [['C4', 500], ['D4', 500]].
 */
export async function playMelody(melody) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        for (const [note, duration] of melody) {
            const frequency = noteFrequencies[note];
            if (!frequency)
                continue; // Skip invalid notes
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.type = 'sine'; // You can use 'square', 'triangle', 'sawtooth', etc.
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start();
            await new Promise((resolve) => {
                setTimeout(() => {
                    oscillator.stop();
                    resolve(null);
                }, duration);
            });
        }
        audioContext.close();
    }
    catch (error) {
        console.error('Error playing melody:', error);
    }
}
