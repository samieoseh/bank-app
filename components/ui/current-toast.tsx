import { Toast, useToastState } from "@tamagui/toast";
import { YStack } from "tamagui";

const CurrentToast = () => {
  const currentToast = useToastState();
  console.log({ currentToast });

  if (!currentToast || currentToast.isHandledNatively) return null;

  // Set styles based on toast type
  const backgroundColor = currentToast.type === "error" ? "#FF6666" : "#45A049"; // Red for error, Green for success
  const textColor = "white";

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={30}
      x={-10}
      opacity={1}
      scale={1}
      animation="100ms"
      viewportName={currentToast.viewportName}
      backgroundColor={backgroundColor}
    >
      <YStack>
        <Toast.Title style={{ color: textColor }}>
          {currentToast.title}
        </Toast.Title>
        {!!currentToast.message && (
          <Toast.Description style={{ color: textColor }}>
            {currentToast.message}
          </Toast.Description>
        )}
      </YStack>
    </Toast>
  );
};

export default CurrentToast;
