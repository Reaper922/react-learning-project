import React, {createContext, useContext, useState, useCallback, useEffect, useMemo} from "react";
import type {ReactNode} from "react";
import {locationMap, type GameActions} from "../trpg_assets/locationMap";
import {weapons, monsters} from "../trpg_assets/gameData";

// --- TYPEN & INTERFACES  ---
type CombatMode = "melee" | "ranged" | null;
export type GameButton = {label: string; action: () => void};
export interface GameState {
  xp: number;
  health: number;
  arrows: number;
  gold: number;
  wolfFur: number;
  pigFur: number;
  location: string;
  gameText: string;
  monster?: {
    name: string;
    health: number;
  };
  combatMode: CombatMode;
  weapon: string;
  hasBow: boolean;
  hasPotion: boolean;
  buttons: GameButton[];
}
interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  updateText: (text: string) => void;
  setLocation: (location: string) => void;
  damageMonster: (amount: number) => void;
  takeDamage: (amount: number) => void;
  buyWeapon: () => void;
  buyXP: () => void;
  sellWeapon: () => void;
}

// --- INITIALER STATE  ---
const initialState: GameState = {
  xp: 0,
  health: 100,
  arrows: 0,
  gold: 50,
  wolfFur: 0,
  pigFur: 0,
  location: "start",
  gameText: locationMap.start.text,
  monster: undefined,
  combatMode: null,
  weapon: "Stock",
  hasBow: false,
  hasPotion: true,
  buttons: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({children}: {children: ReactNode}) => {
  const [state, setState] = useState<GameState>(initialState);

  const updateText = useCallback((text: string) => {
    setState((prev) => ({...prev, gameText: text}));
  }, []);

  const buyWeapon = useCallback(() => {
    setState((prev) => {
      const weaponList = ["Stock", "Dolch", "Schwert"];
      const currentIndex = weaponList.indexOf(prev.weapon);
      if (currentIndex === weaponList.length - 1) return {...prev, gameText: "Du besitzt bereits die stärkste Waffe!"};
      if (prev.gold < 30) return {...prev, gameText: "Du hast nicht genug Gold um dir eine Waffe zu kaufen."};
      const newWeapon = weaponList[currentIndex + 1];
      return {...prev, gold: prev.gold - 30, weapon: newWeapon, gameText: `Du besitzt nun: ${newWeapon}.`};
    });
  }, []);

  const buyXP = useCallback(() => {
    setState((prev) => {
      if (prev.gold < 100) return {...prev, gameText: "Du hast nicht genug Gold um zu trainieren."};
      return {
        ...prev,
        gold: prev.gold - 100,
        xp: prev.xp + 1,
        gameText: "Dein Training war erfolgreich.\nDu erhältst 1 XP.\nDie Übungspuppen hinter dem Haus sehen ziemlich mitgenommen aus...",
      };
    });
  }, []);

  const sellWeapon = useCallback(() => {
    setState((prev) => {
      const weaponList = ["Stock", "Dolch", "Schwert"];
      const currentIndex = weaponList.indexOf(prev.weapon);
      if (currentIndex === 0) return {...prev, gameText: "Deine letzte Waffe solltest du nicht verkaufen!"};
      const newWeapon = weaponList[currentIndex - 1];
      return {...prev, gold: prev.gold + 15, weapon: newWeapon, gameText: `Du hast deine ${prev.weapon} verkauft und besitzt nun ${newWeapon}.`};
    });
  }, []);

  const calculateHitChance = useCallback((xp: number) => {
    return 0.5 + xp * 0.05;
  }, []);

  const getMonsterAttackValue = useCallback((level: number, xp: number) => {
    const hit = level * 5 - Math.floor(Math.random() * xp);
    return hit > 0 ? hit : 0;
  }, []);

  const isMonsterHit = useCallback((health: number) => {
    return Math.random() > 0.2 || health < 20;
  }, []);

  const damageMonster = useCallback((amount: number) => console.log(`Platzhalter: Monster erhält ${amount} Schaden.`), []);
  const takeDamage = useCallback((amount: number) => console.log(`Platzhalter: Spieler erhält ${amount} Schaden.`), []);

  const setLocation = useCallback((location: string) => {
    setState((prev) => ({...prev, location}));
  }, []);

  const actions = useMemo(
    (): GameActions => ({
      setLocation,
      buyWeapon,
      buyXP,
      // sellWeapon,
    }),
    [setLocation, buyWeapon, buyXP] //sellWeapon später hinzufügen
  );

  // DEBUG-AUSGABE
  console.log("[GameContext] `actions`-Objekt wurde erstellt oder aktualisiert:", actions);

  useEffect(() => {
    console.log(`[GameContext] useEffect läuft für Location: "${state.location}"`);
    const currentLocationData = locationMap[state.location];
    if (!currentLocationData) {
      console.error(`Keine LocationData für "${state.location}" gefunden!`);
      return;
    }

    // DEBUG-AUSGABE
    console.log("[GameContext] Rufe getButtons mit actions:", actions);
    const newButtons = currentLocationData.getButtons(actions);
    const newText = currentLocationData.text;

    setState((prev) => ({
      ...prev,
      gameText: newText,
      buttons: newButtons,
    }));
  }, [state.location, actions]);

  const contextValue = useMemo(
    () => ({
      state,
      setState,
      updateText,
      setLocation,
      buyWeapon,
      damageMonster,
      takeDamage,
      buyXP,
      sellWeapon,
    }),
    [state, updateText, setLocation, buyWeapon, damageMonster, takeDamage, buyXP, sellWeapon]
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
