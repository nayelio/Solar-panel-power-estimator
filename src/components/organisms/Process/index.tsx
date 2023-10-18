import { useState } from "react";

export default function Process() {
  const [step, setStep] = useState<number>(0);
  return <div>{step == 1}</div>;
}
