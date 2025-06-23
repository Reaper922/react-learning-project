import {createFileRoute} from "@tanstack/react-router";
import TrpgLayout from "../trpg_components/trpg_layout";
import {GameProvider} from "../trpg_components/GameContext";

export const Route = createFileRoute("/trpgindex")({
  component: TRPG,
});

function TRPG() {
  return (
    <>
      <GameProvider>
        <TrpgLayout />
      </GameProvider>
    </>
  );
}
