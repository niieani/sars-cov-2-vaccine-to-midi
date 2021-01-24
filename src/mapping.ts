import { nucleotides, features, vaccine } from "./vaccine";

const mapping = {
  C: "C4",
  G: "G4",
  A: "A4",
  // hi-hat:
  Ψ: "G#2"
};

type Nucleotides = keyof typeof mapping;

export const mapped = nucleotides.map((nucleotide, index) => {
  const [featureStartIndex, nextFeatureStartIndex, feature, codons] =
    features.find(([, beforeIndex]) => index < beforeIndex) ||
    ([vaccine.length, vaccine.length, "end", false] as const);
  const indexWithinFeature = index - featureStartIndex;
  const pitch = mapping[nucleotide as Nucleotides];
  const channel = nucleotide === "Ψ" ? 2 : 1;
  const groupBy = codons ? 3 : 4;
  const beat = indexWithinFeature % groupBy === 0;
  return {
    pitch,
    channel,
    duration: codons ? "8t" : "8",
    velocity: beat ? 70 : 50,
    marker: featureStartIndex === index ? feature : undefined
  };
});
