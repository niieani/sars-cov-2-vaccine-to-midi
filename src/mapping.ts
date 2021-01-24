import { nucleotides, features, vaccine } from "./vaccine";

const mapping = {
  C: { pitch: "C4", channel: 1 },
  G: { pitch: "G3", channel: 2 },
  A: { pitch: "A3", channel: 3 },
  // hi-hat:
  Ψ: { pitch: "G#2", channel: 4 }
};

type Nucleotides = keyof typeof mapping;

export const mapped = nucleotides.map((nucleotide, index) => {
  const [featureStartIndex, nextFeatureStartIndex, feature, codons] =
    features.find(([, beforeIndex]) => index < beforeIndex) ||
    ([vaccine.length, vaccine.length, "end", false] as const);
  const indexWithinFeature = index - featureStartIndex;
  const mapped = mapping[nucleotide as Nucleotides];
  const groupBy = codons ? 3 : 4;
  const beat = indexWithinFeature % groupBy === 0;
  return {
    ...mapped,
    duration: codons ? "8t" : index >= 3879 ? "16" : index < 2 ? "2" : "8",
    velocity: beat ? 80 : 50,
    marker: featureStartIndex === index ? feature : undefined
  };
});
