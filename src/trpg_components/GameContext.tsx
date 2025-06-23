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
    level: number;
  };
  combatMode: CombatMode;
  weapon: string;
  hasBow: boolean;
  hasPotion: boolean;
  buttons: GameButton[];
  lastShot: boolean;
}
interface GameContextType {
  state: GameState;
  setState: React.Dispatch<React.SetStateAction<GameState>>;
  updateText: (text: string) => void;
  setLocation: (location: string) => void;
  attackMonster: () => void;
  defeatMonster: () => void;
  attackEnd: () => void;
  damageMonster: (amount: number) => void;
  takeDamage: (amount: number) => void;
  buyWeapon: () => void;
  buyXP: () => void;
  sellWeapon: () => void;
  startFight: (monsterKey: keyof typeof monsters) => void;
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
  lastShot: false,
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

  const isMonsterHit = useCallback((xp: number) => Math.random() < calculateHitChance(xp), [calculateHitChance]);

  const attackMonster = useCallback(() => {
    setState((prev) => {
      if (!prev.monster) return prev;

      const weaponIndex = weapons.findIndex((w) => w.name === prev.weapon);
      const weaponPower = weapons[weaponIndex]?.power ?? 5;

      const damageToPlayer = getMonsterAttackValue(prev.monster.level, prev.xp);
      const damageToMonster = isMonsterHit(prev.xp) ? weaponPower + Math.floor(Math.random() * prev.xp) + 1 : 0;

      return {
        ...prev,
        health: prev.health - damageToPlayer,
        monster: {
          ...prev.monster,
          health: prev.monster.health - damageToMonster,
        },
        gameText:
          damageToMonster > 0
            ? `Der ${prev.monster.name} greift an und richtet ${damageToPlayer} Schaden an.\nDu hast ${damageToMonster} Schaden verursacht.`
            : `Der ${prev.monster.name} greift an und richtet ${damageToPlayer} Schaden an.\nDu hast verfehlt.`,
      };
    });
  }, [getMonsterAttackValue, isMonsterHit]);

  const defeatMonster = useCallback(() => {
    setState((prev) => {
      if (!prev.monster) return prev;

      let furUpdate = {};
      if (prev.monster.name === "Wolf") furUpdate = {wolfFur: prev.wolfFur + 1};
      if (prev.monster.name === "Wildschweineber") furUpdate = {pigFur: prev.pigFur + 1};
      return {
        ...prev,
        gold: prev.gold + Math.floor(prev.monster.level * 6.7),
        xp: prev.xp + prev.monster.level,
        gameText: `Du hast den ${prev.monster.name} besiegt und ${prev.monster.level} XP sowie Gold erhalten!`,
        monster: undefined,
        ...furUpdate,
      };
    });
  }, []);

  const attackEnd = useCallback(() => {
    setState((prev) => {
      if (!prev.monster) return prev;

      if (prev.health <= 0 && !prev.hasPotion) {
        return {
          ...prev,
          gameText: "Du hast den Kampf verloren.",
          location: "gameOver",
        };
      } else if (prev.health <= 0 && prev.hasPotion) {
        return {
          ...prev,
          health: 1,
          hasPotion: false,
          gameText: "Du hast deinen Lebenstrank verwendet und bist wiederbelebt worden!",
        };
      } else if (prev.monster?.health <= 0) {
        // Gewinnfall
        return prev;
      }
      return prev;
    });
  }, []);

  const shootArrow = useCallback(() => {
    setState((prev) => {
      if (!prev.monster || !prev.hasBow || prev.arrows <= 0 || prev.lastShot) {
        return prev;
      }
      const newArrows = prev.arrows - 1;

      // Trefferchance wie gehabt:
      const hit = Math.random() < 0.5 + prev.xp * 0.05;
      if (hit) {
        return {
          ...prev,
          arrows: newArrows,
          gameText: `Du hast den ${prev.monster.name} durch deinen Pfeil sofort besiegt!`,
          monster: undefined,
          lastShot: false,
          xp: prev.xp + prev.monster.level,
          gold: prev.gold + Math.floor(prev.monster.level * 6.7),
        };
      } else {
        const damage = getMonsterAttackValue(prev.monster.level, prev.xp);
        return {
          ...prev,
          arrows: newArrows,
          health: prev.health - damage,
          lastShot: true,
          gameText:
            `Du hast den ${prev.monster.name} verfehlt und ${damage} Schaden erlitten!\n` +
            "Du hast bereits geschossen! Möchtest du in den Nahkampf gehen oder zurückziehen?",
        };
      }
    });
  }, [getMonsterAttackValue]);

  const withdraw = useCallback(() => {
    setState((prev) => ({
      ...prev,
      location: "start", // <-- Hier deinen passenden Ort einsetzen
      lastShot: false,
      monster: undefined,
      gameText: "Du hast dich zurückgezogen und bist dem Kampf entkommen.",
    }));
  }, []);

  const damageMonster = useCallback((amount: number) => console.log(`Platzhalter: Monster erhält ${amount} Schaden.`), []);
  const takeDamage = useCallback((amount: number) => console.log(`Platzhalter: Spieler erhält ${amount} Schaden.`), []);

  const setLocation = useCallback((location: string) => {
    setState((prev) => ({...prev, location}));
  }, []);

  const startFight = useCallback((monsterKey: keyof typeof monsters) => {
    setState((prev) => ({
      ...prev,
      monster: {...monsters[monsterKey]},
      gameText: `Ein ${monsters[monsterKey].name} erscheint!`,
    }));
  }, []);

  const actions = useMemo(
    (): GameActions => ({
      setLocation,
      buyWeapon,
      buyXP,
      shootArrow,
      attackMonster,
      withdraw,
    }),
    [setLocation, buyWeapon, buyXP, shootArrow, attackMonster, withdraw]
  );

  // DEBUG-AUSGABE
  console.log("[GameContext] `actions`-Objekt wurde erstellt oder aktualisiert:", actions);

  useEffect(() => {
    const currentLocationData = locationMap[state.location];
    if (!currentLocationData) {
      console.error(`Keine LocationData für "${state.location}" gefunden!`);
      return;
    }

    const newButtons = currentLocationData.getButtons(actions, state);
    const newText = currentLocationData.text;

    setState((prev) => ({
      ...prev,
      gameText: newText,
      buttons: newButtons,
    }));

    console.log(`[GameContext] useEffect -> Location: "${state.location}"`);
  }, [state.location, actions]);

  const contextValue = useMemo(
    () => ({
      state,
      setState,
      updateText,
      setLocation,
      attackMonster,
      defeatMonster,
      attackEnd,
      damageMonster,
      takeDamage,
      buyWeapon,
      buyXP,
      sellWeapon,
      startFight,
      shootArrow,
      withdraw,
    }),
    [
      state,
      updateText,
      setLocation,
      attackMonster,
      defeatMonster,
      attackEnd,
      damageMonster,
      takeDamage,
      buyWeapon,
      buyXP,
      sellWeapon,
      startFight,
      shootArrow,
      withdraw,
    ]
  );

  return <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
