export type PredictionLabel = "Real" | "Fake";

export type Prediction = {
  label: PredictionLabel;
  fake_confidence: number;
  real_confidence: number;
}
