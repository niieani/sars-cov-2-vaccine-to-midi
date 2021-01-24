import MidiWriter from "midi-writer-js";
import { nucleotides, features, vaccine } from "./vaccine";

const mapping = {
  C: "C4",
  G: "G4",
  A: "A4",
  // hi-hat:
  Ψ: "G#2"
};

type Nucleotides = keyof typeof mapping;

const mapped2 = nucleotides.map((nucleotide, index) => {
  const featureIndex = features.findIndex(
    ([beforeIndex]) => index < beforeIndex
  );
  const [nextFeatureStartIndex, feature] = features[featureIndex] ?? [
    vaccine.length,
    "end"
  ];
  const [featureStartIndex] =
    featureIndex === 0 ? [0] : features[featureIndex - 1];
  const pitch = mapping[nucleotide as Nucleotides];
  const channel = nucleotide === "Ψ" ? 2 : 1;
  return {
    pitch,
    channel,
    duration: "8t",
    velocity: index % 3 ? 70 : 50,
    marker: featureStartIndex === index ? feature : undefined
  };
});

// export const mapped = [
//   {
//     pitch: vaccine.cap.map((nucleotide) => mapping[nucleotide as Nucleotides]),
//     duration: "2",
//     sequential: true,
//     marker: "cap"
//   },
//   {
//     pitch: vaccine["5'-UTR"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "4t",
//     sequential: true,
//     wait: "1",
//     marker: "5'-UTR",
//     map: (index, event) =>
//       index % 3 === 0 ? { ...event, velocity: 80 } : event
//   },
//   {
//     pitch: vaccine["sig"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "4",
//     sequential: true,
//     wait: "1",
//     marker: "sig",
//     map: (index, event) =>
//       index % 4 === 0 ? { ...event, velocity: 80 } : event
//   },
//   {
//     pitch: vaccine["SARS-CoV-2 spike"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "8",
//     sequential: true,
//     wait: "1",
//     marker: "SARS-CoV-2 spike",
//     map: (index, event) =>
//       index % 4 === 0 ? { ...event, velocity: 80 } : event
//   },
//   {
//     pitch: vaccine["SARS-CoV-2 spike stop codons"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "8",
//     sequential: true,
//     wait: "1",
//     marker: "SARS-CoV-2 spike stop codons",
//     map: (index, event) =>
//       index % 4 === 0 ? { ...event, velocity: 80 } : event
//   },
//   {
//     pitch: vaccine["3'-UTR"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "8t",
//     sequential: true,
//     wait: "1",
//     marker: "3'-UTR",
//     map: (index, event) =>
//       index % 3 === 0 ? { ...event, velocity: 80 } : event
//   },
//   {
//     pitch: vaccine["poly(A)-30"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "8",
//     sequential: true,
//     wait: "1",
//     marker: "poly(A)-30",
//     map: (index, event) =>
//       index % 4 === 0 ? { ...event, velocity: 80 } : event
//   },
//   {
//     pitch: vaccine["nucleotide linker"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "4",
//     sequential: true,
//     wait: "2",
//     marker: "nucleotide linker",
//     map: (index, event) =>
//       index % 4 === 0 ? { ...event, velocity: 80 } : event
//   },
//   {
//     pitch: vaccine["poly(A)-70"].map(
//       (nucleotide) => mapping[nucleotide as Nucleotides]
//     ),
//     duration: "16",
//     sequential: true,
//     wait: "2",
//     marker: "poly(A)-70",
//     map: (index, event) =>
//       index % 8 === 0 ? { ...event, velocity: 80 } : event
//   }
// ];
