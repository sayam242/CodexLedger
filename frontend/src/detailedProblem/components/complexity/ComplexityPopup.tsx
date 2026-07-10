import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ComplexityPopupProps {
  timeComplexityOptions: string[];
  spaceComplexityOptions: string[];
  correctTimeComplexity: string;
  correctSpaceComplexity: string;
  reasoning: string;
  onSubmit: () => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

export default function ComplexityPopup({
  timeComplexityOptions,
  spaceComplexityOptions,
  correctTimeComplexity,
  correctSpaceComplexity,
  reasoning,
  onSubmit,
  onClose,
  isOpen,
}: ComplexityPopupProps) {
  const [selectedTimeComplexity, setSelectedTimeComplexity] = useState<string>("");
  const [selectedSpaceComplexity, setSelectedSpaceComplexity] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!selectedTimeComplexity || !selectedSpaceComplexity) return;

    setIsSubmitting(true);
    try {
      await onSubmit();
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = !selectedTimeComplexity || !selectedSpaceComplexity || isSubmitting;

  const getOptionStyle = (
    isSelected: boolean,
    correctAnswer: string,
    option: string
  ): React.CSSProperties => {
    if (!isSubmitted) return {};

    if (option === correctAnswer) {
      return { color: "#16a34a", fontWeight: 600 };
    }

    if (isSelected && option !== correctAnswer) {
      return { color: "#dc2626", fontWeight: 600 };
    }

    return { color: "#6b7280" };
  };

  const getRadioClassName = (
    isSelected: boolean,
    correctAnswer: string,
    option: string
  ) => {
    if (!isSubmitted) {
      return "";
    }

    if (option === correctAnswer) {
      return "border-green-600 data-checked:bg-green-600";
    }

    if (isSelected && option !== correctAnswer) {
      return "border-red-600 data-checked:bg-red-600";
    }

    return "opacity-50";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complexity Analysis Quiz</DialogTitle>
          <DialogDescription>
            {isSubmitted
              ? "Here are the results of your analysis."
              : "Great job solving this problem! Let's analyze your solution's complexity."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 min-h-[200px]">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Time Complexity</h4>
            <RadioGroup
              value={selectedTimeComplexity}
              onValueChange={isSubmitted ? () => {} : setSelectedTimeComplexity}
              className="grid grid-cols-2 gap-2"
            >
              {timeComplexityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`time-${option}`}
                    disabled={isSubmitted}
                    className={getRadioClassName(
                      selectedTimeComplexity === option,
                      correctTimeComplexity,
                      option
                    )}
                  />
                  <label
                    htmlFor={`time-${option}`}
                    className="text-sm"
                    style={getOptionStyle(
                      selectedTimeComplexity === option,
                      correctTimeComplexity,
                      option
                    )}
                  >
                    {option}
                    {isSubmitted && option === correctTimeComplexity && " ✓"}
                    {isSubmitted &&
                      selectedTimeComplexity === option &&
                      option !== correctTimeComplexity &&
                      " ✗"}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Space Complexity</h4>
            <RadioGroup
              value={selectedSpaceComplexity}
              onValueChange={isSubmitted ? () => {} : setSelectedSpaceComplexity}
              className="grid grid-cols-2 gap-2"
            >
              {spaceComplexityOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`space-${option}`}
                    disabled={isSubmitted}
                    className={getRadioClassName(
                      selectedSpaceComplexity === option,
                      correctSpaceComplexity,
                      option
                    )}
                  />
                  <label
                    htmlFor={`space-${option}`}
                    className="text-sm"
                    style={getOptionStyle(
                      selectedSpaceComplexity === option,
                      correctSpaceComplexity,
                      option
                    )}
                  >
                    {option}
                    {isSubmitted && option === correctSpaceComplexity && " ✓"}
                    {isSubmitted &&
                      selectedSpaceComplexity === option &&
                      option !== correctSpaceComplexity &&
                      " ✗"}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div
            className={`text-xs text-gray-500 bg-gray-50 p-3 rounded transition-opacity ${
              isSubmitted ? "opacity-100" : "opacity-0 h-0 overflow-hidden p-0 m-0"
            }`}
          >
            <strong>Explanation:</strong> {reasoning}
          </div>
        </div>

        <div className="flex justify-end">
          {!isSubmitted ? (
            <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
