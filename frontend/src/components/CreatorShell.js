import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGuideContext } from "../contexts/GuideContext";
import { Button } from "./ui";

const CreatorShell = ({ children }) => {
  const { creatorData, nextStep, prevStep } = useGuideContext();
  const location = useLocation();
  const navigate = useNavigate();

  const stepRoutes = {
    1: "/create/step/taxa",
    2: "/create/step/region",
    3: "/create/step/species",
    4: "/create/step/name",
    5: "/create/step/layout",
    6: "/create/step/preview",
  };

  const stepTitles = {
    1: "Choose Taxa",
    2: "Select Region",
    3: "Select Species",
    4: "Name & Branding",
    5: "Layout Editor",
    6: "Preview & Export",
  };

  const getCurrentStep = () => {
    const currentPath = location.pathname;
    return (
      Object.keys(stepRoutes).find(
        (step) => stepRoutes[step] === currentPath
      ) || 1
    );
  };

  const currentStepNumber = parseInt(getCurrentStep());
  const progressPercentage = (currentStepNumber / creatorData.totalSteps) * 100;

  const handleNext = () => {
    if (currentStepNumber < creatorData.totalSteps) {
      const nextStepNumber = currentStepNumber + 1;
      navigate(stepRoutes[nextStepNumber]);
      nextStep();
    }
  };

  const handleBack = () => {
    if (currentStepNumber > 1) {
      const prevStepNumber = currentStepNumber - 1;
      navigate(stepRoutes[prevStepNumber]);
      prevStep();
    }
  };

  const canProceed = () => {
    switch (currentStepNumber) {
      case 1:
        return creatorData.taxa && creatorData.taxa.length > 0;
      case 2:
        return (
          (creatorData.region.state && creatorData.region.district) ||
          creatorData.region.mapPin
        );
      case 3:
        return (
          creatorData.selectedSpecies && creatorData.selectedSpecies.length > 0
        );
      case 4:
        return creatorData.guideName.length >= 3;
      case 5:
        return creatorData.layout.pages.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Secondary Top Bar with Progress */}
      <div className="sticky top-16 z-40 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="h-2 bg-[var(--surface-elev)]">
          <div
            className="h-full bg-[var(--primary)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-labelledby="progress-label"
          />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <span
                id="progress-label"
                className="text-sm text-[var(--text-dim)]"
              >
                Step {currentStepNumber} of {creatorData.totalSteps}:
              </span>
              <span className="ml-2 text-[var(--text)] font-medium">
                {stepTitles[currentStepNumber]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-[var(--surface)] border-t border-[var(--border)] p-4">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStepNumber === 1}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={
              !canProceed() || currentStepNumber === creatorData.totalSteps
            }
            className="flex-1"
          >
            {currentStepNumber === creatorData.totalSteps ? "Complete" : "Next"}
          </Button>
        </div>
      </div>

      {/* Desktop Action Buttons */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-40">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStepNumber === 1}
          >
            Back
          </Button>

          <Button
            variant="primary"
            onClick={handleNext}
            disabled={
              !canProceed() || currentStepNumber === creatorData.totalSteps
            }
          >
            {currentStepNumber === creatorData.totalSteps ? "Complete" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatorShell;
