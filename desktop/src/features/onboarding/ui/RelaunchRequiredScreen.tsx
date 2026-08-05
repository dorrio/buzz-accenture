import { RecoveryScreen } from "./RecoveryScreen";

export function RelaunchRequiredScreen() {
  return (
    <RecoveryScreen
      testId="relaunch-required"
      title="Restart Accenture Connect to finish recovery"
      body="Your identity was updated. Accenture Connect needs to restart so syncing and agents run under it."
    />
  );
}
