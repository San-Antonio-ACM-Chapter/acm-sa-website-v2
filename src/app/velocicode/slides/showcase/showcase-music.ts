export type MusicTrack = {
  file: string; // filename without extension
  title: string;
  type?: string; // defaults to "mp3"
};

// Add files to /public/velocicode/music/ and list them here in playback order.
export const SHOWCASE_MUSIC: MusicTrack[] = [
    { file: "tradecontrols", title: "Trade Controls" },
    { file: "dova_instavista_master", title: "Instavista" },
    { file: "kulakovka-fashion-house-283179", title: "Fashion" },
    { file: "kulakovka-lounge-house-295877", title: "Kulakovka Lounge" },
    { file: "prettyjohn1-house-526226", title: "Pretty John" },
    { file: "televisedfella-better-melodic-house-edm-televised-fella-269640", title: "Televised Fella"},
    { file: "9jackjack8-i-feel-house-beat-404555", title: "I Feel"},
    { file: "9jackjack8-evening-house-beat-289826", title: "Evening Beat"}
];
