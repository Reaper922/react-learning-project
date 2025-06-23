import type {GameState} from "../trpg_components/GameContext";
import {imageMap} from "./imageMap";

export type GameActions = {
  setLocation: (loc: string) => void;
  buyWeapon: () => void;
  buyXP: () => void;
  shootArrow: () => void;
  attackMonster: () => void;
  withdraw: () => void;
};

export type LocationEntry = {
  name: string;
  text: string;
  imageKey?: keyof typeof imageMap;
  getButtons: (
    actions: GameActions,
    state: GameState
  ) => {
    label: string;
    action: () => void;
  }[];
};

export const locationMap: Record<string, LocationEntry> = {
  start: {
    name: "Start",
    text: "Willkommen bei Dragon Hunter. Ganz in der Nähe des verschlafenen Dörfchens Nogard hindert ein Drache die Bewohner daran, die Straße in den Westen, die wichtigste Handelsroute, zu betreten. Der König sandte eine Handvoll Soldaten, doch bis auf zwei wurden alle gefressen. Nun liegt es an dir, die Bewohner zu befreien.",
    imageKey: "start",
    getButtons: (actions) => [
      {label: "Wald", action: () => actions.setLocation("woods")},
      {label: "Dorf", action: () => actions.setLocation("villageentrance")},
      {label: "Impressum", action: () => actions.setLocation("impressum")},
    ],
  },
  impressum: {
    name: "Impressum",
    text: "Code: Marco Loch\nTexte: Maxi Hennemann",
    imageKey: "start",
    getButtons: (actions) => [
      {label: "Zurück", action: () => actions.setLocation("start")},
      {label: "Dig Deeper", action: () => actions.setLocation("easterEgg")},
    ],
  },
  woods: {
    name: "Wald",
    text: "Du stehst auf dem Weg und schaust in den Wald vor dir. Der Wald ist dicht bewachsenen und bietet gute Deckung, um in Ruhe zu jagen. Die Spuren von Wölfen und Wildschweinen könntest du bereits vereinzelt sehen. Der Weg, der sich vor dir tiefer in Wald windet, scheint oft genutzt zu werden. Kein Wunder, schließlich führt er zur Handelsstraße.",
    imageKey: "woods",
    getButtons: (actions) => [
      {
        label: "Zur Jagd",
        action: () => actions.setLocation("hunting"),
      },
      {
        label: "Weg folgen",
        action: () => actions.setLocation("path1"),
      },
      {
        label: "Zur Weggabelung",
        action: () => actions.setLocation("start"),
      },
    ],
  },
  villageentrance: {
    name: "Dorfeingang",
    text: "Neben dem Dorfeingang stehen links und rechts zwei Soldaten. Ob jedoch diese zwei halbstarken Möchtegern in der Lage sind, ein Dorf vor einem Drachen zu beschützen, wagst du zu bezweifeln. Vor einem Haus kannst du einen Kräutergarten und eine ältere Frau sehen, sie scheint die Dorfheilerin zu sein. Folgst du der Straße, gelangst du zum Marktplatz oder zur Weggabelung.",
    imageKey: "villageentrance",
    getButtons: (actions) => [
      {
        label: "Zum Markt",
        action: () => actions.setLocation("market"),
      },
      {
        label: "Zur Heilerin",
        action: () => actions.setLocation("healer"),
      },
      {
        label: "Zur Weggabelung",
        action: () => actions.setLocation("start"),
      },
    ],
  },
  market: {
    name: "Markt",
    text: "Du stehst auf dem Marktplatz. Du kannst an einem Haus ein quietschendes Schild mit der Aufschrift 'Schmied' sehen, aus dem großen Schornstein steigt dichter Rauch auf. Vor einem anderen Haus kannst du ein Trockengestell voller Felle sehen, die Tür steht offen und du kannst eine Frau sehen, welche gerade einen Köcher mit Pfeilen befüllt.",
    imageKey: "townsquare2",
    getButtons: (actions) => [
      {
        label: "Zum Schmied",
        action: () => actions.setLocation("smith"),
      },
      {
        label: "Zur Jägerin",
        action: () => actions.setLocation("huntress"),
      },
      {
        label: "Zum Dorfeingang",
        action: () => actions.setLocation("villageentrance"),
      },
    ],
  },
  path1: {
    name: "Pfad",
    text: "Als du dem Weg folgst, führt er dich direkt an einer Höhle vorbei. Der Eingang der Höhle ist überwiegend zugewachsen und wäre dir wohl nicht aufgefallen, wenn just in diesem Moment ein Hase hindurch gehüpft wäre. Während du die Ranken zur Seite schiebst, kannst du einen Weg erkennen. Doch willst du hinein gehen oder lieber den Weg weiter Richtung Handelsstraße folgen?",
    imageKey: "path1",
    getButtons: (actions) => [
      {
        label: "Zur Höhle",
        action: () => actions.setLocation("cave"),
      },
      {
        label: "Weg folgen",
        action: () => actions.setLocation("path2"),
      },
      {
        label: "Zur Weggabelung",
        action: () => actions.setLocation("start"),
      },
    ],
  },
  path2: {
    name: "Pfad",
    text: "Du folgst eine Weile dem Weg, dieser wird von Hasen gekreuzt und Vogelgezwitscher begleitet dich. Du gehst noch ein ganzes Stück bis dir bewusst wird, dass es unheimlich Still ist. In der Ferne kannst du ein tiefes brummen hören, dass in dir nachhallt. Vorsichtig gehst du weiter und gelangst an das Ende des Waldes. Ein altes, eingestürztes Häuschen steht direkt an dessen Ecke und bietet dir die Möglichkeit eine Entscheidung zu treffen. Stellst du dich dem Drachen, oder gehst du einen anderen Weg?",
    imageKey: "path2",
    getButtons: (actions) => [
      {
        label: "Zum Drachen",
        action: () => actions.setLocation("dragon"),
      },
      {
        label: "Zum Dorf",
        action: () => actions.setLocation("villageentrance"),
      },
      {
        label: "Zurück zum Weg",
        action: () => actions.setLocation("path1"),
      },
    ],
  },
  hunting: {
    name: "Zur Jagd",
    text: "Du schleichst dich in den Wald und begibst dich auf Spurensuche. Ab und an hörst du das Knacken von Ästen hinter dir und umso tiefer du dich in den Wald wagst, umso mehr wabern vereinzelte Nebelschwaden über den Boden. Vor dir kannst du die Spuren eines Wildschweines und eines Wolfes sehen. Der Wolf ist tiefer in den Wald gegangen und das Wildschwein scheint nicht weit entfernt zu sein.",
    imageKey: "woods",
    getButtons: (actions) => [
      {
        label: "Wölfe jagen",
        action: () => actions.setLocation("wolf"),
      },
      {
        label: "Wildschweine jagen",
        action: () => actions.setLocation("boar"),
      },
      {
        label: "Zum Waldeingang",
        action: () => actions.setLocation("woods"),
      },
    ],
  },
  smith: {
    name: "Schmied",
    text: "Du betrittst die Schmiede und die Hitze des Feuers schlägt dir erbarmungslos ins Gesicht. Der Schmied steht am Amboss und schlägt rhythmisch auf das Metall vor sich. Schweiß rinnt über seine Stirn, als er die Klinge erneut in das Feuer hält, bis sie rot glüht. Anschließend legt er die Klinge in die Glut und wendet sich dir zu. Du kannst nun bei ihm eine bessere Waffe kaufen oder die Übungspuppen hinter seinem Haus nutzen, um deine Erfahrung zu steigern.",
    imageKey: "smith",
    getButtons: (actions) => [
      {
        label: "Waffe kaufen",
        action: () => actions.buyWeapon(),
      },
      {
        label: "Trainieren",
        action: () => actions.buyXP(),
      },
      {
        label: "Zurück zum Marktplatz",
        action: () => actions.setLocation("market"),
      },
    ],
  },
  cave: {
    name: "Höhle",
    text: "Du betrittst die Höhle und nach einigen Metern siehst du zwei Wege. Einer der Wege führt in einen Gang, der von Moos und Flechten übersät ist. Diffuses Licht, welches aus den Tiefen des Ganges dringt, schimmert auf den vielen Pfützen, die den Weg säumen. Der andere Weg scheint trocken zu sein, jedoch ist es dort so dunkel, dass man das Ende nur erahnen kann.",
    imageKey: "cave",
    getButtons: (actions) => [
      {
        label: "Zum Froschkönig",
        action: () => actions.setLocation("frog"),
      },
      {
        label: "Zum Bestienkönig",
        action: () => actions.setLocation("beast"),
      },
      {
        label: "Zum Stadtplatz",
        action: () => actions.setLocation("market"),
      },
    ],
  },
  wolf: {
    name: "Wolf",
    text: "Du bist der Spur des Wolfes tiefer in den Wald gefolgt, als du plötzlich hinter dir ein leises, aber durchdringendes Knurren vernehmen kannst. Langsam drehst du dich um und du kannst in ca 100 Meter Entfernung einen Wolf erblicken. Es stellt sich die Frage, bist du Jäger oder Gejagter?",
    imageKey: "wolf",
    getButtons: (actions, state) => {
      // Fernkampf möglich?
      if (state.hasBow && state.arrows > 0 && !state.lastShot) {
        return [
          {
            label: "Pfeil schießen",
            action: actions.shootArrow,
          },
          {
            label: "Nahkampf",
            action: actions.attackMonster,
          },
          {
            label: "Zurückziehen",
            action: actions.withdraw,
          },
        ];
      }

      // Nach Fehlschuss
      if (state.lastShot) {
        return [
          {
            label: "Nahkampf",
            action: actions.attackMonster,
          },
          {
            label: "Zurückziehen",
            action: actions.withdraw,
          },
          {
            label: "Ausweichen", // z. B. aus deinem alten Spiel, oder du kannst was anderes nehmen
            action: () => actions.setLocation("start"), // oder deine Flucht-Logik
          },
        ];
      }

      // Standard: Nahkampf + Ausweichen
      return [
        {
          label: "Angreifen",
          action: actions.attackMonster,
        },
        {
          label: "Ausweichen",
          action: actions.withdraw, // Oder eine eigene Ausweichen-Logik falls vorhanden
        },
        {
          label: "Zurückziehen",
          action: actions.withdraw,
        },
      ];
    },
  },
  xxx: {
    name: "xxx",
    text: "xxx",
    imageKey: "xxx",
    getButtons: (actions) => [
      {
        label: "xxx",
        action: () => actions.setLocation("xxx"),
      },
      {
        label: "xxx",
        action: () => actions.setLocation("xxx"),
      },
      {
        label: "xxx",
        action: () => actions.setLocation("xxx"),
      },
    ],
  },
};
