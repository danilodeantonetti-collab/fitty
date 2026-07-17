// MTMT Blueprint 2.0 — Trainingsprogramm-Daten
// Automatisch aus den Original-PDFs extrahiert. Nicht von Hand bearbeiten.
// 12 Monate, 318 Übungen (302 mit Video).

export interface MtmtWeekTarget {
    sets: string | null;
    reps: string | null;
}

export interface MtmtExercise {
    id: string; // Position im Plan, z. B. "a1", "b2", "c"
    name: string;
    weeks: MtmtWeekTarget[]; // Index 0-3 = Woche 1-4
    cues?: string;
    videoUrl?: string;
}

export interface MtmtSection {
    title: string;
    weekNotes?: (string | null)[]; // z. B. RiR-Vorgabe pro Woche
    groupSets?: (string | null)[]; // Runden/Sätze für Superset/Zirkel pro Woche
    exercises: MtmtExercise[];
}

export interface MtmtDay {
    day: number;
    sections: MtmtSection[];
}

export interface MtmtMonth {
    month: number;
    phase: string;
    days: MtmtDay[];
}

export interface MtmtInfoVideo {
    source: string; // Intro | Kompetenz | Kapazität | Hypertrophie
    label: string;
    url: string;
}

export const MTMT_WEEKS = 4;

export const MTMT_MONTHS: MtmtMonth[] = [
    {
        "month": 1,
        "phase": "Kompetenzphase 1.0",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Supine Breathing",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/8lKh9GNqmVE"
                            },
                            {
                                "id": "a2",
                                "name": "Iso. Foam Roller Bridge - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/oMAOyug38ho"
                            },
                            {
                                "id": "a3",
                                "name": "Iso. Dead Bug mit Wallreference",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "8 Atemzüge"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "8 Atemzüge"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "8 Atemzüge"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "8 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/NZqMN1vaeh0"
                            },
                            {
                                "id": "a4",
                                "name": "Scapula Push Up Bear Position",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xTAyKD0nq6o"
                            },
                            {
                                "id": "a5",
                                "name": "Hip Airplanes",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/rG0m6Ki_ZYo"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "FFE Split Squat mit DB/KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "@ Tempo 4 - 1 - 0",
                                "videoUrl": "https://youtu.be/rEcjKzWkAaI"
                            },
                            {
                                "id": "b2",
                                "name": "Single Arm Row mit DB - auf Bank",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "@ Tempo 2 - 2 - 0",
                                "videoUrl": "https://youtu.be/IU9V0Ae8aw4"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Intervall",
                        "exercises": [
                            {
                                "id": "c",
                                "name": "MTMT Favorite: Air Bike",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    }
                                ],
                                "cues": "Alternative: Ski Ergo / Sprints / Versa Climber / Battle Rope / Bike",
                                "videoUrl": "https://youtu.be/Z0pVd5RH8fo"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Steady State",
                        "exercises": [
                            {
                                "id": "d",
                                "name": "Ruder Ergo",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    }
                                ],
                                "cues": "Nur Nasenatmung!",
                                "videoUrl": "https://youtu.be/MUXx6kULLU8"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Bear Breathing",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Ewi9fJYHZ9Q"
                            },
                            {
                                "id": "a2",
                                "name": "Halos - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/M5WlF2Ok_Co"
                            },
                            {
                                "id": "a3",
                                "name": "Bear Plank mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/hd00_vruqPc"
                            },
                            {
                                "id": "a4",
                                "name": "Iso. FFE Split Squat mit Reach + Heel Float",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 bis 50 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/wQDiqRxeaXE"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Zirkel",
                        "groupSets": [
                            "4",
                            "4",
                            "5",
                            "5"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Squats auf der Wedge - DB Goblet",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/nul_Vdwok0A"
                            },
                            {
                                "id": "b2",
                                "name": "Push Up",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Leichter: Push Up erhöht / Schwerer: Ultimate Push Up",
                                "videoUrl": "https://youtu.be/E9hwHOKdM44"
                            },
                            {
                                "id": "b3",
                                "name": "Bend-Over Row mit DB/KB - Reziprok",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iVql__9vwns"
                            },
                            {
                                "id": "b4",
                                "name": "Reverse Lunge mit DB/KB - alternierend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/FwLgVLaX7tY"
                            },
                            {
                                "id": "b5",
                                "name": "Marches mit KB - Racked",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/1kS5A2o2CY0"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Finisher",
                        "exercises": [
                            {
                                "id": "c",
                                "name": "MTMT Favorite: Air Bike",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 2 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 2,5 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 3 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 3,5 Min."
                                    }
                                ],
                                "cues": "Alternativ: Rower / Ski Ergo / Treadmil",
                                "videoUrl": "https://youtu.be/Z0pVd5RH8fo"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Supine Breathing",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/8lKh9GNqmVE"
                            },
                            {
                                "id": "a2",
                                "name": "Iso. Foam Roller Bridge - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/oMAOyug38ho"
                            },
                            {
                                "id": "a3",
                                "name": "90/90 Side Plank",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "6 Atemzüge / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/EjebiPwfoFc"
                            },
                            {
                                "id": "a4",
                                "name": "Scapula Push Up Bear Position",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xTAyKD0nq6o"
                            },
                            {
                                "id": "a5",
                                "name": "90/90 Hip Extensions mit Reach",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xot9F78WNQE"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "RDL mit Trap Bar (Alternativ: mit Langhantel)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "@ Tempo 4 - 1 - 0",
                                "videoUrl": "https://youtu.be/DmH_vwKn9ZU"
                            },
                            {
                                "id": "b2",
                                "name": "Ultimate Push Up",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    }
                                ],
                                "cues": "@ Tempo 4 - 1 - 0",
                                "videoUrl": "https://youtu.be/Dv23yxFbKBM"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Intervall",
                        "exercises": [
                            {
                                "id": "c",
                                "name": "MTMT Favorite: Air Bike",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    }
                                ],
                                "cues": "Alternative: Ski Ergo / Sprints / Versa Climber / Battle Rope / Bike",
                                "videoUrl": "https://youtu.be/Z0pVd5RH8fo"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Steady State",
                        "exercises": [
                            {
                                "id": "d",
                                "name": "Laufen (Alternative: Bike / Rower)",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    }
                                ],
                                "cues": "Nur Nasenatmung!"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 2,
        "phase": "Kapazitätsphase 1.0",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Atmen & Reachen",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/oTfg5OeQDDk"
                            },
                            {
                                "id": "a2",
                                "name": "Iso. Foam Roller Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 bis 45 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IIudRXfgq0c"
                            },
                            {
                                "id": "a3",
                                "name": "Shrimp",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/wWnEED1nPpU"
                            },
                            {
                                "id": "a4",
                                "name": "Foam Roller Wall Slides",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/RdUbqH8bii0"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Squats mit SafetySquatBar auf der Wedge",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "@ Tempo 4-1-0 / Alternative: Zercher Squats auf der Wedge",
                                "videoUrl": "https://youtu.be/yIPNRdPH3zY"
                            },
                            {
                                "id": "b2",
                                "name": "Klimmzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "cues": "@ Tempo 2-2-0 / Alternative: Pulldown",
                                "videoUrl": "https://youtu.be/7wdxngQ6NBk"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität",
                        "groupSets": [
                            "4",
                            "4",
                            "5",
                            "5"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Lateral Step-Over Dynamisch",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/hbgwPVglTq4"
                            },
                            {
                                "id": "c2",
                                "name": "Ring Rows",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Alternativ: Bend Over Row Bilateral",
                                "videoUrl": "https://youtu.be/ROjjaYDZLq8"
                            },
                            {
                                "id": "c3",
                                "name": "RDL mit DB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Rs1TdqY2bwQ"
                            },
                            {
                                "id": "c4",
                                "name": "Floor Press - Reziprok",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/kobPkmT3JSw"
                            },
                            {
                                "id": "c5",
                                "name": "Plank mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Alternativ: 8-Point Plank mit Wall Reference",
                                "videoUrl": "https://youtu.be/_25cxpGl-zo"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Bear Breathing",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Ewi9fJYHZ9Q"
                            },
                            {
                                "id": "a2",
                                "name": "90/90 Hamstring Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 bis 45 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/AUnbACU2b1c"
                            },
                            {
                                "id": "a3",
                                "name": "Sideplank mit Reach",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "30 bis 40 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/hFlHY-D6bi4"
                            },
                            {
                                "id": "a4",
                                "name": "Foam Roller Wall Slides",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/RdUbqH8bii0"
                            },
                            {
                                "id": "a5",
                                "name": "Hip Shifts mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Ur69RbsJMQI"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Split Squat mit Safety Bar",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "Alternativ: mit Barbell oder DBs bilateral",
                                "videoUrl": "https://youtu.be/gWffyqb8FNc"
                            },
                            {
                                "id": "b2",
                                "name": "OHP mit DB/KB Bilateral - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/ozm_31Tq-1U"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Intervall",
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "MTMT Favorite: Rower",
                                "weeks": [
                                    {
                                        "sets": "8",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": "10",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": "10",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ],
                                "cues": "Alternativ: Air Bike / Ski Ergo / Battle Rope"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Steady State",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Rad fahren",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    }
                                ],
                                "cues": "Alternativ: Laufen / Rower / Ski Ergo / Inline Skaten"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Atmen & Reachen",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/oTfg5OeQDDk"
                            },
                            {
                                "id": "a2",
                                "name": "Iso. Foam Roller Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 bis 45 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IIudRXfgq0c"
                            },
                            {
                                "id": "a3",
                                "name": "Plank Langarm mit Shouldertap + Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9fZ2-1U3jUg"
                            },
                            {
                                "id": "a4",
                                "name": "Cross Over Reach - stehend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IpI3Hslknfk"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "RDL mit Trap Bar - Staggered Stance",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "4 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 bis 6 / Seite"
                                    }
                                ],
                                "cues": "@Tempo 2-2-0 / Alternative: Barbell oder DB Bilateral",
                                "videoUrl": "https://youtu.be/R-DUWAJGH-0"
                            },
                            {
                                "id": "b2",
                                "name": "Benchpress mit DB - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "@Tempo 4-1-0",
                                "videoUrl": "https://youtu.be/N-oUwsSMj-g"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität",
                        "groupSets": [
                            "4",
                            "4",
                            "5",
                            "5"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Z-Press",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/r24xYnBoBKs"
                            },
                            {
                                "id": "c2",
                                "name": "Hamstring Curl auf GymBall - bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Alternativ: Slingtrainer / Slideboard / ValSlides / Handtuch",
                                "videoUrl": "https://youtu.be/_RKLNubtkxM"
                            },
                            {
                                "id": "c3",
                                "name": "Pulldown Reziprok - Low Seated",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ],
                                "cues": "Alternativ: Bend Over Row Reziprok",
                                "videoUrl": "https://youtu.be/BcHU8Uepsj0"
                            },
                            {
                                "id": "c4",
                                "name": "Squats mit KB - Goblet",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/RGgz4Ksz_dw"
                            },
                            {
                                "id": "c5",
                                "name": "Reach & Rotate",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/3bhRWm6DIMg"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 3,
        "phase": "Hypertrophiephase 1.1",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Hip Extensions mit Reach",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xot9F78WNQE"
                            },
                            {
                                "id": "a2",
                                "name": "Plank Langarm mit Shouldertap + Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9fZ2-1U3jUg"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "RDL mit Trap Bar (alternativ mit Langhantel)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/DmH_vwKn9ZU"
                            },
                            {
                                "id": "b2",
                                "name": "Benchpress mit DB - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/N-oUwsSMj-g"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Single Leg RDL mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/93I2-C5_WCY"
                            },
                            {
                                "id": "c2",
                                "name": "Chest supported Row mit DB/KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/nfKOsmIIPAk"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "weekNotes": [
                            "RiR 1",
                            "RiR 1",
                            "RiR 0",
                            "RiR 0"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Hip Extension",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/tQ0MNViL2Uw"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Butterfly DB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/OSrb0CgYzFA"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Wallstrides",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/89IhH1d7BDw"
                            },
                            {
                                "id": "a2",
                                "name": "Sideplank mit Reach",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/hFlHY-D6bi4"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "30° Incline Benchpress mit DB - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/5o9czDnYAHw"
                            },
                            {
                                "id": "b2",
                                "name": "Split Squat mit DB/KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/kQi4g5H7bXQ"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Single Arm Row mit DB/KB - an der Wand",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/We4M434Euwk"
                            },
                            {
                                "id": "c2",
                                "name": "Lateral Squat mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Zb718urZD0A"
                            }
                        ]
                    },
                    {
                        "title": "Superset III",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Pushdown Kabelzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/RVItljV96L4"
                            },
                            {
                                "id": "d2",
                                "name": "Curl DB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/p7u3KjptQPg"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Rower / AirBike / SkiErgo / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "5",
                                        "reps": "20 Sek. ON / 40 Sek. OFF"
                                    },
                                    {
                                        "sets": "5",
                                        "reps": "20 Sek. ON / 40 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 40 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 40 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Dead Bug mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/y-HKY_0orHg"
                            },
                            {
                                "id": "a2",
                                "name": "Hip Airplanes",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/rG0m6Ki_ZYo"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Step Up mit DB/KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/JO0X5kA570g"
                            },
                            {
                                "id": "b2",
                                "name": "60° OHP mit DB Alternierend - Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/7JbCQLYjs7k"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Staggered Stance RDL mit DB/KB - Contralateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Kaz0hquc9Jo"
                            },
                            {
                                "id": "c2",
                                "name": "Pulldown Unilateral - Low Seated",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/-N8IcTVpX4A"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Push Up",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/E9hwHOKdM44"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Seitheben am Kabelzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Exzentrischer Bias! (siehe Video)",
                                "videoUrl": "https://youtu.be/znNhPEP3otI"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 4,
        "phase": "Hypertrophiephase 1.2",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Scapula Push Up mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/0FlVrhKuj2c"
                            },
                            {
                                "id": "a2",
                                "name": "Marches mit KB - Goblet",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iCF4_mW--mQ"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Single Leg RDL mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/93I2-C5_WCY"
                            },
                            {
                                "id": "b2",
                                "name": "Chest supported Row mit DB/KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/nfKOsmIIPAk"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "RDL mit Trap Bar (alternativ mit Langhantel)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/DmH_vwKn9ZU"
                            },
                            {
                                "id": "c2",
                                "name": "Benchpress mit DB - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/N-oUwsSMj-g"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Cable Flys",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Gewicht steigern (zu Monat 1 / Tag 1)",
                                "videoUrl": "https://youtu.be/XoP-G_hclho"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Airbike / Skiergo / Sprint / Rower / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Bear Plank mit 5-Point Tap",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/k3i4U9k92mQ"
                            },
                            {
                                "id": "a2",
                                "name": "Hip Shifts mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/U4-X4ik7RdE"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Single Arm Row mit DB/KB - an der Wand",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/We4M434Euwk"
                            },
                            {
                                "id": "b2",
                                "name": "Lateral Squat mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "cues": "Alternative: Lateral Squat mit Landmine",
                                "videoUrl": "https://youtu.be/Zb718urZD0A"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "30° Incline Benchpress mit DB - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/5o9czDnYAHw"
                            },
                            {
                                "id": "c2",
                                "name": "Split Squat mit DB/KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/kQi4g5H7bXQ"
                            }
                        ]
                    },
                    {
                        "title": "Superset III - Hypertrophie Fokusvolumen Straightset",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Staggered Stance Swings KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/S9LkywluzIU"
                            },
                            {
                                "id": "d2",
                                "name": "Pulldown",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/8PNbAeLl68w"
                            }
                        ]
                    },
                    {
                        "title": "Superset IV",
                        "groupSets": [
                            "3 RiR 1 (Range: 10 bis 15)",
                            "3 RiR 1 (Range: 10 bis 15)",
                            "3 RiR 1 (Range: 10 bis 15)",
                            "3 RiR 1 (Range: 10 bis 15)"
                        ],
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Kabel Kickbacks Einarmig",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/j1DzoJVYjiY"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Bear Plank mit 5-Point Tap",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/k3i4U9k92mQ"
                            },
                            {
                                "id": "a2",
                                "name": "Cross Over Reach - stehend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IpI3Hslknfk"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Staggered Stance RDL mit DB/KB - Contralateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Kaz0hquc9Jo"
                            },
                            {
                                "id": "b2",
                                "name": "Pulldown Unilateral - Low Seated",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/-N8IcTVpX4A"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Step Up mit DB/KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/JO0X5kA570g"
                            },
                            {
                                "id": "c2",
                                "name": "60° OHP mit DB Alternierend - Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/7JbCQLYjs7k"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Seitheben am Kabelzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Mid Range! (siehe Video)",
                                "videoUrl": "https://youtu.be/znNhPEP3otI"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Airbike / Skiergo / Sprint / Rower / o.ä.",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 3 Min."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 3,5 Min."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 3,5 Min."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 4 Min."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 5,
        "phase": "Hypertrophiephase 1.3",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Hamstring Bridge - Marching",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/37NMRr8rD9w"
                            },
                            {
                                "id": "a2",
                                "name": "Mountain Climber \"Bear\" mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/OrBYr29aJsY"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Hatfield Squats",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "Alternativ: Frontsquat / Hack Squat / Pendulum Squat",
                                "videoUrl": "https://youtu.be/wkXGBRf88sU"
                            },
                            {
                                "id": "b2",
                                "name": "Benchpress mit DB Alternierend - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/--TuEjVWRSI"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "RFE Split Squat mit DB/KB - Contralateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/egi_2z1LEkQ"
                            },
                            {
                                "id": "c2",
                                "name": "Klimmzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR2 / 15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR2 / 15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR2 / 15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR2 / 15 bis 20"
                                    }
                                ],
                                "cues": "Alternativ: Pulldown",
                                "videoUrl": "https://youtu.be/7wdxngQ6NBk"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "weekNotes": [
                            "RiR 1",
                            "RiR 1",
                            "RiR 0",
                            "RiR 0"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "OHP mit DB/KB Unilateral - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IUKbo-n3EaI"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Cable Row - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/wR1xbyd8VI8"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Down / Under Lunges",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/1zSiMu1275o"
                            },
                            {
                                "id": "a2",
                                "name": "Sideplank mit Reach",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/hFlHY-D6bi4"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "45° Incline Benchpress mit DB - Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xOJUaBEsmK8"
                            },
                            {
                                "id": "b2",
                                "name": "RDL mit Trap Bar - Staggered Stance",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "Alternativ: DBs",
                                "videoUrl": "https://youtu.be/R-DUWAJGH-0"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Chest supported Pulldown - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/R4o0J6ZgVX0"
                            },
                            {
                                "id": "c2",
                                "name": "Lateral Lunge",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iF7aqecFJeE"
                            }
                        ]
                    },
                    {
                        "title": "Superset III",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Pull-Over to Trizeps Extension",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/xlR14-qeS5Q"
                            },
                            {
                                "id": "d2",
                                "name": "Incline Curls mit DB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/HStR8Xd3DE8"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Rower / AirBike / SkiErgo / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "5",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": "5",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Iso. Dead Bug mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/NZqMN1vaeh0"
                            },
                            {
                                "id": "a2",
                                "name": "90/90 Hamstring Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/AUnbACU2b1c"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "OHP mit DB/KB Bilateral - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/ozm_31Tq-1U"
                            },
                            {
                                "id": "b2",
                                "name": "Single Leg RDL mit Festhalten",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/llD6ibB0kzo"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Walking Lunge mit DB/ KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9cDNaUJkwBg"
                            },
                            {
                                "id": "c2",
                                "name": "Cable Row Unilateral Reziprok - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/ye_U8U6yK0c"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Squats auf der Wedge - Goblet",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/nul_Vdwok0A"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Face Pulls an Ringen",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/PKAb4QgfGIk"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 6,
        "phase": "Hypertrophiephase 1.4",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Iso. Foam Roller Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IIudRXfgq0c"
                            },
                            {
                                "id": "a2",
                                "name": "Dead Bug mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/y-HKY_0orHg"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "RFE Split Squat mit DB/KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9qf6vyBcUzg"
                            },
                            {
                                "id": "b2",
                                "name": "Klimmzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RIR 1 / 8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RIR 1 / 8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RIR 1 / 8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RIR 1 / 8 bis 10"
                                    }
                                ],
                                "cues": "Alternative: Pulldown",
                                "videoUrl": "https://youtu.be/7wdxngQ6NBk"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Hatfield Squats",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "cues": "Alternative: Hack Squat / Pendulum Squat a.d. Maschine",
                                "videoUrl": "https://youtu.be/wkXGBRf88sU"
                            },
                            {
                                "id": "c2",
                                "name": "Benchpress mit DB Alternierend - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/--TuEjVWRSI"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Ring Rows",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Winkel von Woche zu Woche verändern (schwerer machen)",
                                "videoUrl": "https://youtu.be/ROjjaYDZLq8"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Airbike / Skiergo / Sprint / Rower / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "10 Sek. ON / 20 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Plank mit Uhrzeiger Taps",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "2 Runden / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/0umcoLLYGBo"
                            },
                            {
                                "id": "a2",
                                "name": "Hip Shifts mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/U4-X4ik7RdE"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Chest supported Pulldown - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/R4o0J6ZgVX0"
                            },
                            {
                                "id": "b2",
                                "name": "Lateral Lunge",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iF7aqecFJeE"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "45° Incline Benchpress mit DB - Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xOJUaBEsmK8"
                            },
                            {
                                "id": "c2",
                                "name": "RDL mit Trap Bar - Staggered Stance",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/R-DUWAJGH-0"
                            }
                        ]
                    },
                    {
                        "title": "Superset III - Hypertrophie Fokusvolumen Straightset",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Cross Over Step Up mit DB/KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/68IXaVAW36E"
                            },
                            {
                                "id": "d2",
                                "name": "Bend-Over Row mit DB/KB - Alternierend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iVql__9vwns"
                            }
                        ]
                    },
                    {
                        "title": "Superset IV",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Trizeps Superman Extensions",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/9lVBGMGqmxg"
                            },
                            {
                                "id": "e2",
                                "name": "Curls mit DB Alternierend - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/FNJE_AJOqxY"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Iso. Foam Roller Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max Out!"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IIudRXfgq0c"
                            },
                            {
                                "id": "a2",
                                "name": "Halos - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/M5WlF2Ok_Co"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Walking Lunge mit DB/ KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9cDNaUJkwBg"
                            },
                            {
                                "id": "b2",
                                "name": "Cable Row Unilateral - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/7y1XQSyfPKM"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "OHP mit DB/KB Bilateral - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/ozm_31Tq-1U"
                            },
                            {
                                "id": "c2",
                                "name": "Single Leg RDL mit Festhalten",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/llD6ibB0kzo"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Butterfly Reverse Kabelzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Gewichte wöchentlich steigern!",
                                "videoUrl": "https://youtu.be/CsXztpNAq2o"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Swings Kettlebell",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "3,5 Min. akkumulieren"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 Min. akkumulieren"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4,5 Min. akkumulieren"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Min. akkumulieren"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/-SOo3Zq0Nv0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 7,
        "phase": "Kompetenzphase 2.0",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Hip Lift",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Z7IK9DDjVO4"
                            },
                            {
                                "id": "a2",
                                "name": "Dyn. Foam Roller Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/YDP4OB7LMAI"
                            },
                            {
                                "id": "a3",
                                "name": "Mountain Climber \"Bear\" mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    }
                                ],
                                "cues": "Volle Ausatmung / Seite",
                                "videoUrl": "https://youtu.be/OrBYr29aJsY"
                            },
                            {
                                "id": "a4",
                                "name": "Hip Airplanes",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "Frei stehend!",
                                "videoUrl": "https://youtu.be/rG0m6Ki_ZYo"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "RFE Split Squat mit DB/KB - Contralateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "@ Tempo 4 - 1 - 0",
                                "videoUrl": "https://youtu.be/egi_2z1LEkQ"
                            },
                            {
                                "id": "b2",
                                "name": "Chest supported Cable Row - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "@ Tempo 3 - 1 - 0",
                                "videoUrl": "https://youtu.be/T1tPMAupNMw"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Intervall",
                        "exercises": [
                            {
                                "id": "c",
                                "name": "MTMT Favorite: Air Bike",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    }
                                ],
                                "cues": "Alternative: Ski Ergo / Sprints / Versa Climber / Battle Rope / Bike",
                                "videoUrl": "https://youtu.be/Z0pVd5RH8fo"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Steady State",
                        "exercises": [
                            {
                                "id": "d",
                                "name": "Ruder Ergo",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    }
                                ],
                                "cues": "Nur Nasenatmung!",
                                "videoUrl": "https://youtu.be/MUXx6kULLU8"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Crab on Elbows",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/-TITf3ihk1Y"
                            },
                            {
                                "id": "a2",
                                "name": "Bear Plank mit 5-Point Tap",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/k3i4U9k92mQ"
                            },
                            {
                                "id": "a3",
                                "name": "Halos - Tall Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xNtvA03BQqs"
                            },
                            {
                                "id": "a4",
                                "name": "Iso. Push Up",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 bis 50 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/p-xpuHV7iuM"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Zirkel",
                        "groupSets": [
                            "4",
                            "4",
                            "5",
                            "5"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Walking Lunge mit DB/ KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9cDNaUJkwBg"
                            },
                            {
                                "id": "b2",
                                "name": "Push Up \"Ultimate\"",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Leichter: Push Up erhöht",
                                "videoUrl": "https://youtu.be/Dv23yxFbKBM"
                            },
                            {
                                "id": "b3",
                                "name": "Cable Row Unilateral Reziprok - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ],
                                "cues": "1. Seite",
                                "videoUrl": "https://youtu.be/ye_U8U6yK0c"
                            },
                            {
                                "id": "b4",
                                "name": "Cable Row Unilateral Reziprok - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "2. Seite",
                                "videoUrl": "https://youtu.be/ye_U8U6yK0c"
                            },
                            {
                                "id": "b5",
                                "name": "Swings Kettlebell",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/-SOo3Zq0Nv0"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Finisher",
                        "exercises": [
                            {
                                "id": "c",
                                "name": "MTMT Favorite: Air Bike",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 3 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 3,5 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 3,5 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "Max. CAL in 4 Min."
                                    }
                                ],
                                "cues": "Alternativ: Rower / Ski Ergo / Treadmil",
                                "videoUrl": "https://youtu.be/Z0pVd5RH8fo"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Hip Lift",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Z7IK9DDjVO4"
                            },
                            {
                                "id": "a2",
                                "name": "Dyn. Foam Roller Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/YDP4OB7LMAI"
                            },
                            {
                                "id": "a3",
                                "name": "Mountain Climber \"Bear\" mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "5 bis 6 Atemzüge / Seite"
                                    }
                                ],
                                "cues": "Volle Ausatmung / Seite",
                                "videoUrl": "https://youtu.be/OrBYr29aJsY"
                            },
                            {
                                "id": "a4",
                                "name": "Hip Airplanes",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "Frei stehend!",
                                "videoUrl": "https://youtu.be/rG0m6Ki_ZYo"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "RDL mit Trap Bar (Alternativ: mit BB/DB)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "@ Tempo 4 - 1 - 0",
                                "videoUrl": "https://youtu.be/DmH_vwKn9ZU"
                            },
                            {
                                "id": "b2",
                                "name": "Push Up \"Rings\" (Füße erhöht = schwerer)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 2"
                                    }
                                ],
                                "cues": "@ Tempo 4 - 1 - 0",
                                "videoUrl": "https://youtu.be/C3HRva8HgDA"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Intervall",
                        "exercises": [
                            {
                                "id": "c",
                                "name": "MTMT Favorite: Air Bike",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    }
                                ],
                                "cues": "Alternative: Ski Ergo / Sprints / Versa Climber / Battle Rope / Bike",
                                "videoUrl": "https://youtu.be/Z0pVd5RH8fo"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Steady State",
                        "exercises": [
                            {
                                "id": "d",
                                "name": "Laufen (Alternative: Bike / Rower)",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min."
                                    }
                                ],
                                "cues": "Nur Nasenatmung!"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 8,
        "phase": "Kapazitätsphase 2.0",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Cross Over - Reach",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/na614b4M5nU"
                            },
                            {
                                "id": "a2",
                                "name": "Walljumps",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 bis 45 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/81RPpJ8N7zQ"
                            },
                            {
                                "id": "a3",
                                "name": "Bear Crawls",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/3cuGSPKSaOs"
                            },
                            {
                                "id": "a4",
                                "name": "Armbars mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/YDK3HBxTUjI"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Frontsquat auf der Wege - BB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "@ Tempo 4-1-0 / Alternative: Zercher Squats auf der Wedge",
                                "videoUrl": "https://youtu.be/l1jHU6iJ-HI"
                            },
                            {
                                "id": "b2",
                                "name": "Klimmzug (Griff wechseln!)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "@ Tempo 5-1-0 / Alternative: Pulldown",
                                "videoUrl": "https://youtu.be/7wdxngQ6NBk"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität",
                        "groupSets": [
                            "4",
                            "4",
                            "5",
                            "5"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Jump Lunge mit Medizinball - Alternierend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iI91fUne02A"
                            },
                            {
                                "id": "c2",
                                "name": "Bend-Over Row mit DB/KB - Reziprok",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iVql__9vwns"
                            },
                            {
                                "id": "c3",
                                "name": "Hip Thrust - unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ],
                                "cues": "Linkes Bein",
                                "videoUrl": "https://youtu.be/hjvKM-YL9Ok"
                            },
                            {
                                "id": "c4",
                                "name": "Hip Thrust - unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Rechtes Bein",
                                "videoUrl": "https://youtu.be/hjvKM-YL9Ok"
                            },
                            {
                                "id": "c5",
                                "name": "OHP mit DB/KB Reziprok - Low Seated",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/NZVJU9N90hc"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "High Crab Hold",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 Atemzüge"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/oHb8M1eirEc"
                            },
                            {
                                "id": "a2",
                                "name": "Iso. Hamstring Bridge - Anklepump",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/L-MUdJA-BiY"
                            },
                            {
                                "id": "a3",
                                "name": "Klassische Rumpfbeuge seitlich",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/kmE5cUqQ8B0"
                            },
                            {
                                "id": "a4",
                                "name": "Lateral Squat mit Körpergewicht",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/cdH_N3oPxIo"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "AGGRO Step Ups",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "cues": "Alternativ: mit Barbell oder DBs bilateral",
                                "videoUrl": "https://youtu.be/ApuqGWJf_jc"
                            },
                            {
                                "id": "b2",
                                "name": "Überzüge mit DB - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "cues": "@ Tempo 4-1-0",
                                "videoUrl": "https://youtu.be/xnLhmDnN7IY"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Intervall",
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "MTMT Favorite: Rower",
                                "weeks": [
                                    {
                                        "sets": "8",
                                        "reps": "30 Sek. ON / 15 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "30 Sek. ON / 15 Sek. OFF"
                                    },
                                    {
                                        "sets": "10",
                                        "reps": "30 Sek. ON / 15 Sek. OFF"
                                    },
                                    {
                                        "sets": "10",
                                        "reps": "30 Sek. ON / 15 Sek. OFF"
                                    }
                                ],
                                "cues": "Alternativ: Air Bike / Ski Ergo / Battle Rope"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität - Steady State",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Rad fahren",
                                "weeks": [
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    },
                                    {
                                        "sets": "1",
                                        "reps": "15 Min. Nasenatmung!"
                                    }
                                ],
                                "cues": "Alternativ: Laufen / Rower / Ski Ergo / Inline Skaten"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Cross Over - Reach",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/na614b4M5nU"
                            },
                            {
                                "id": "a2",
                                "name": "Walljumps",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 bis 45 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/81RPpJ8N7zQ"
                            },
                            {
                                "id": "a3",
                                "name": "Bear Crawls",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek."
                                    }
                                ],
                                "videoUrl": "https://youtu.be/3cuGSPKSaOs"
                            },
                            {
                                "id": "a4",
                                "name": "Armbars mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/YDK3HBxTUjI"
                            }
                        ]
                    },
                    {
                        "title": "Kompetenz",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Single Leg RDL mit Landmine",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 bis 6 / Seite"
                                    }
                                ],
                                "cues": "@Tempo 4-0-0 / Alternative: KB oder DB",
                                "videoUrl": "https://youtu.be/372oGGT7JGM"
                            },
                            {
                                "id": "b2",
                                "name": "Incline Benchpress mit DB - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "cues": "@Tempo 3-1-0 / Rückenlehne auf ca. 30°",
                                "videoUrl": "https://youtu.be/DPKvU59BTKE"
                            }
                        ]
                    },
                    {
                        "title": "Kapazität",
                        "groupSets": [
                            "4",
                            "4",
                            "5",
                            "5"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Floor Press - Reziprok",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/kobPkmT3JSw"
                            },
                            {
                                "id": "c2",
                                "name": "Step Ups into Reverse Lunge",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Rechtes Bein! / Wahlweise mit Weste oder DBs/KBs",
                                "videoUrl": "https://youtu.be/AiSW_ZTwaEI"
                            },
                            {
                                "id": "c3",
                                "name": "Cable Row Reziprok - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 Sek. ON / 30 Sek. OFF"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/WgZsNlMfY_s"
                            },
                            {
                                "id": "c4",
                                "name": "Step Ups into Reverse Lunge",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "cues": "Linkes Bein! / Wahlweise mit Weste oder DBs/KBs",
                                "videoUrl": "https://youtu.be/AiSW_ZTwaEI"
                            },
                            {
                                "id": "c5",
                                "name": "Plank Bear Side to Side",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    },
                                    {
                                        "sets": null,
                                        "reps": null
                                    }
                                ],
                                "videoUrl": "https://youtu.be/TYw_pOc3Qg0"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 9,
        "phase": "Hypertrophiephase 2.1",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Hip Extensions mit Reach",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xot9F78WNQE"
                            },
                            {
                                "id": "a2",
                                "name": "Plank mit Uhrzeiger Taps",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/0umcoLLYGBo"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "RDL mit Trap Bar (alternativ mit Langhantel)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/DmH_vwKn9ZU"
                            },
                            {
                                "id": "b2",
                                "name": "Benchpress mit DB - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "4/4/4 Cluster"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4/4/4 Cluster"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4/4/4 Cluster"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4/4/4 Cluster"
                                    }
                                ],
                                "cues": "Cluster= 4Reps dann 10-15 Sek. Pause, dann wieder 4 Reps. 3 Mal.",
                                "videoUrl": "https://youtu.be/N-oUwsSMj-g"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Single Leg RDL mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/93I2-C5_WCY"
                            },
                            {
                                "id": "c2",
                                "name": "Cable Row Breit - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/179zNW3RABI"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "weekNotes": [
                            "RiR 1",
                            "RiR 1",
                            "RiR 0",
                            "RiR 0"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Staggered Stance KB Swings",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/S9LkywluzIU"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Floor Press - Reziprok",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/kobPkmT3JSw"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Scapula Push Up Bear Position",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/xTAyKD0nq6o"
                            },
                            {
                                "id": "a2",
                                "name": "Sideplank \"Copenhagen\" - Langer Hebel",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    }
                                ],
                                "cues": "Bei Knie-Problemen: Kurzer Hebel",
                                "videoUrl": "https://youtu.be/bpzXFClUO8o"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "30° Incline Benchpress mit DB - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "cues": "Gewicht steigern im Vergleich zum 1. HJ",
                                "videoUrl": "https://youtu.be/5o9czDnYAHw"
                            },
                            {
                                "id": "b2",
                                "name": "Walking Lunge mit DB/ KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 24 Schritte"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 24 Schritte"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 24 Schritte"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 24 Schritte"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9cDNaUJkwBg"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Cable Row Unilateral Breit - Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/sb42ozEAW0M"
                            },
                            {
                                "id": "c2",
                                "name": "RFE Split Squat mit DB/KB - Contralateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/egi_2z1LEkQ"
                            }
                        ]
                    },
                    {
                        "title": "Superset III",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Deadpool Cable Extensions",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/jCTXHsgLlaY"
                            },
                            {
                                "id": "d2",
                                "name": "Incline Curls mit DB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/HStR8Xd3DE8"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Rower / AirBike / SkiErgo / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "5",
                                        "reps": "40 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "5",
                                        "reps": "40 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "40 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "40 Sek. ON / 20 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Foam Roller Wall Slides",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/RdUbqH8bii0"
                            },
                            {
                                "id": "a2",
                                "name": "Cross Connect Marching",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9COS1VztUhE"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Split Squat mit Landmine - Zercher",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/t-8Ldc62RSU"
                            },
                            {
                                "id": "b2",
                                "name": "Landmine Press - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/S1ocB0j7wnk"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Single Leg RDL mit Festhalten",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/llD6ibB0kzo"
                            },
                            {
                                "id": "c2",
                                "name": "Pulldown Unilateral - Schneidersitz",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/4ZLbU4GFpuk"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Push Up \"Rings\"",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "RiR 1"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/C3HRva8HgDA"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Seitheben mit Chest Support",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/G13SJl8i8P4"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 10,
        "phase": "Hypertrophiephase 2.2",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Scapula Push Up mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/0FlVrhKuj2c"
                            },
                            {
                                "id": "a2",
                                "name": "Hamstring Bridge - Marching",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/fjY9nb3Zgv8"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Single Leg RDL mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/93I2-C5_WCY"
                            },
                            {
                                "id": "b2",
                                "name": "Cable Row Breit - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/179zNW3RABI"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "RDL mit Trap Bar (alternativ mit Langhantel)",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/DmH_vwKn9ZU"
                            },
                            {
                                "id": "c2",
                                "name": "Benchpress mit DB - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/N-oUwsSMj-g"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Cable Row - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/wR1xbyd8VI8"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Airbike / Skiergo / Sprint / Rower / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Bear Plank mit 5-Point Tap",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/k3i4U9k92mQ"
                            },
                            {
                                "id": "a2",
                                "name": "Knee Slides - Rückenlage",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/RB9C1wXtjGc"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Cable Row Unilateral Breit - Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/sb42ozEAW0M"
                            },
                            {
                                "id": "b2",
                                "name": "RFE Split Squat mit DB/KB - Contralateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/egi_2z1LEkQ"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "30° Incline Benchpress mit DB - Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/5o9czDnYAHw"
                            },
                            {
                                "id": "c2",
                                "name": "Walking Lunge mit DB/ KB - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "24 bis 30 Schritte"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "24 bis 30 Schritte"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "24 bis 30 Schritte"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "24 bis 30 Schritte"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/9cDNaUJkwBg"
                            }
                        ]
                    },
                    {
                        "title": "Superset III - Hypertrophie Fokusvolumen Straightset",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Staggered Stance Swings KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/S9LkywluzIU"
                            },
                            {
                                "id": "d2",
                                "name": "Pulldown",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/8PNbAeLl68w"
                            }
                        ]
                    },
                    {
                        "title": "Superset IV",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Trizeps Superman Extensions",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/9lVBGMGqmxg"
                            },
                            {
                                "id": "e2",
                                "name": "Squat Curls am Kabelzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/lQJ2D4BKT00"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "90/90 Side Plank",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/EjebiPwfoFc"
                            },
                            {
                                "id": "a2",
                                "name": "Cross Over Reach - stehend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IpI3Hslknfk"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Single Leg RDL mit Festhalten",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/llD6ibB0kzo"
                            },
                            {
                                "id": "b2",
                                "name": "Pulldown Unilateral - Schneidersitz",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/4ZLbU4GFpuk"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Split Squat mit Landmine - Zercher",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/t-8Ldc62RSU"
                            },
                            {
                                "id": "c2",
                                "name": "Landmine Press - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/S1ocB0j7wnk"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Seitheben am Kabelzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Mid Range! (siehe Video)",
                                "videoUrl": "https://youtu.be/znNhPEP3otI"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Airbike / Skiergo / Sprint / Rower / o.ä.",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 3,5 Min."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 4 Min."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 4 Min."
                                    },
                                    {
                                        "sets": null,
                                        "reps": "Max CAL in 4,5 Min."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 11,
        "phase": "Hypertrophiephase 2.3",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Dyn. Foam Roller Bridge - Unilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/YDP4OB7LMAI"
                            },
                            {
                                "id": "a2",
                                "name": "Iso. Mountain Climber mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "20 bis 30 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/d-Q5fi50Q6o"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Frontsquat auf der Wedge - Double Kettlebell",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/D7PsJk8N9ac"
                            },
                            {
                                "id": "b2",
                                "name": "Ultimate Push Up",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "cues": "Wenn möglich: Füße erhöhen oder Gewichtsweste",
                                "videoUrl": "https://youtu.be/Dv23yxFbKBM"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Cross Over Step Up mit DB/KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/68IXaVAW36E"
                            },
                            {
                                "id": "c2",
                                "name": "Chest supported Pulldown - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/R4o0J6ZgVX0"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "weekNotes": [
                            "RiR 1",
                            "RiR 1",
                            "RiR 0",
                            "RiR 0"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "OHP mit DB/KB Unilateral - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IUKbo-n3EaI"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Cable Row alternierend - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "60 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "70 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "80 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/WgZsNlMfY_s"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Cross Over Reach - stehend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IpI3Hslknfk"
                            },
                            {
                                "id": "a2",
                                "name": "Sideplank mit dynamischer Abduktion",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "30 bis 40 Sek. / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/6E5ouTtvIg4"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "30° Incline Benchpress mit DB Reziprok - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/GiozdcbA--s"
                            },
                            {
                                "id": "b2",
                                "name": "RDL mit Trap Bar - Staggered Stance",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "cues": "Alternativ: DBs",
                                "videoUrl": "https://youtu.be/R-DUWAJGH-0"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Pulldown Reziprok - Low Seated",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/BcHU8Uepsj0"
                            },
                            {
                                "id": "c2",
                                "name": "Skater Squat mit Festhalten",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/TI5tYkrCu8o"
                            }
                        ]
                    },
                    {
                        "title": "Superset III",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Inverted Skull Crusher",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/8AuQRtoluGs"
                            },
                            {
                                "id": "d2",
                                "name": "Curls mit DB Alternierend - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/FNJE_AJOqxY"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Rower / AirBike / SkiErgo / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "5",
                                        "reps": "30 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "5",
                                        "reps": "30 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "30 Sek. ON / 20 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "30 Sek. ON / 20 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Shrimp",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/wWnEED1nPpU"
                            },
                            {
                                "id": "a2",
                                "name": "90/90 Transitions",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "5 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 bis 6 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "5 bis 6 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/HjdMXsOpFys"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "OHP mit DB/KB - Z-Press",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/r24xYnBoBKs"
                            },
                            {
                                "id": "b2",
                                "name": "Squats auf der Wedge - Zercher",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/_pCcvVKEgvY"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Single Leg RDL mit Landmine",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/372oGGT7JGM"
                            },
                            {
                                "id": "c2",
                                "name": "Single Arm Row mit Landmine",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Ofh3ePWpleU"
                            }
                        ]
                    },
                    {
                        "title": "Hypertrophie - Straightset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Jump Lunge mit Medizinball - Alternierend",
                                "weeks": [
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    },
                                    {
                                        "sets": "3",
                                        "reps": "15 bis 20"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iI91fUne02A"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Face Pulls an Ringen",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Flacherer Winkel im Vergleich zum 1.HJ",
                                "videoUrl": "https://youtu.be/PKAb4QgfGIk"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "month": 12,
        "phase": "Hypertrophiephase 2.4",
        "days": [
            {
                "day": 1,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Iso. Hamstring Bridge - Anklepump",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "15 bis 20 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/L-MUdJA-BiY"
                            },
                            {
                                "id": "a2",
                                "name": "Dead Bug mit Wall Reference",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/y-HKY_0orHg"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Cross Over Step Up mit DB/KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/68IXaVAW36E"
                            },
                            {
                                "id": "b2",
                                "name": "Chest supported Pulldown - Bilateral",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/R4o0J6ZgVX0"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "Frontsquat auf der Wedge - Double Kettlebell",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/D7PsJk8N9ac"
                            },
                            {
                                "id": "c2",
                                "name": "Ultimate Push Up",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "cues": "Wenn möglich: Füße erhöhen oder Gewichtsweste",
                                "videoUrl": "https://youtu.be/Dv23yxFbKBM"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Cable Row - Sitzend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/wR1xbyd8VI8"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Airbike / Skiergo / Sprint / Rower / o.ä.",
                                "weeks": [
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "6",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    },
                                    {
                                        "sets": "8",
                                        "reps": "20 Sek. ON / 10 Sek. OFF"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "day": 2,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Plank mit Uhrzeiger Taps",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "2 Runden / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Runden"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/0umcoLLYGBo"
                            },
                            {
                                "id": "a2",
                                "name": "Hip Shifts mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/U4-X4ik7RdE"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Pulldown Reziprok - Low Seated",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/BcHU8Uepsj0"
                            },
                            {
                                "id": "b2",
                                "name": "Skater Squat mit KB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/cQNEKYKgnkE"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "30° Incline Benchpress mit DB Reziprok - Hooklying",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/GiozdcbA--s"
                            },
                            {
                                "id": "c2",
                                "name": "RDL mit Trap Bar - Staggered Stance",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/R-DUWAJGH-0"
                            }
                        ]
                    },
                    {
                        "title": "Superset III - Hypertrophie Fokusvolumen Straightset",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Step Overs",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/90klrSzR5KY"
                            },
                            {
                                "id": "d2",
                                "name": "Bend-Over Row mit DB/KB - Alternierend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/iVql__9vwns"
                            }
                        ]
                    },
                    {
                        "title": "Superset IV",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Pull-Over to Trizeps Extension",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/xlR14-qeS5Q"
                            },
                            {
                                "id": "e2",
                                "name": "Incline Curls mit DB",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "RiR 1 (Range: 10 bis 15)"
                                    }
                                ],
                                "cues": "Letzter Satz All-Out!",
                                "videoUrl": "https://youtu.be/HStR8Xd3DE8"
                            }
                        ]
                    }
                ]
            },
            {
                "day": 3,
                "sections": [
                    {
                        "title": "Vorbereitung",
                        "groupSets": [
                            "3",
                            "3",
                            "3",
                            "3"
                        ],
                        "exercises": [
                            {
                                "id": "a1",
                                "name": "Cross Over Reach - stehend",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "6 bis 8 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/IpI3Hslknfk"
                            },
                            {
                                "id": "a2",
                                "name": "Halos - Half Kneeling",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/M5WlF2Ok_Co"
                            }
                        ]
                    },
                    {
                        "title": "Superset I - Hypertrophie Fokusvolumen",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "b1",
                                "name": "Single Leg RDL mit Landmine",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/372oGGT7JGM"
                            },
                            {
                                "id": "b2",
                                "name": "Single Arm Row mit Landmine",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "8 bis 10 / Seite"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/Ofh3ePWpleU"
                            }
                        ]
                    },
                    {
                        "title": "Superset II - Hypertrophie Maintenance",
                        "weekNotes": [
                            "RiR 2",
                            "RiR 2",
                            "RiR 1",
                            "RiR 1"
                        ],
                        "groupSets": [
                            "4",
                            "4",
                            "4",
                            "4"
                        ],
                        "exercises": [
                            {
                                "id": "c1",
                                "name": "OHP mit DB/KB - Z-Press",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "12 bis 15"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/r24xYnBoBKs"
                            },
                            {
                                "id": "c2",
                                "name": "Squats auf der Wedge - Zercher",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "10 bis 12"
                                    }
                                ],
                                "videoUrl": "https://youtu.be/_pCcvVKEgvY"
                            }
                        ]
                    },
                    {
                        "title": "Giantset",
                        "exercises": [
                            {
                                "id": "d1",
                                "name": "Butterfly Reverse Kabelzug",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "40 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "45 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "50 Reps"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "55 Reps"
                                    }
                                ],
                                "cues": "Gewichte wöchentlich steigern!",
                                "videoUrl": "https://youtu.be/CsXztpNAq2o"
                            }
                        ]
                    },
                    {
                        "title": "Cardio",
                        "exercises": [
                            {
                                "id": "e1",
                                "name": "Jump Lunge",
                                "weeks": [
                                    {
                                        "sets": null,
                                        "reps": "2,5 Min. akkumulieren"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3 Min. akkumulieren"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "3,5 Min. akkumulieren"
                                    },
                                    {
                                        "sets": null,
                                        "reps": "4 Min. akkumulieren"
                                    }
                                ],
                                "cues": "(Leichter Ball)",
                                "videoUrl": "https://youtu.be/iI91fUne02A"
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export const MTMT_INFO_VIDEOS: MtmtInfoVideo[] = [
    {
        "source": "Intro",
        "label": "META SKILL Videos",
        "url": "https://youtube.com/playlist?list=PLoq2i8EmnA5qBjxhL_WlZLGCQEhIHxtYQ"
    },
    {
        "source": "Kompetenz",
        "label": "META SKILLS",
        "url": "https://youtube.com/playlist?list=PLoq2i8EmnA5qBjxhL_WlZLGCQEhIHxtYQ"
    },
    {
        "source": "Kompetenz",
        "label": "Kompetenzphase - MTMT Blueprint",
        "url": "https://youtu.be/h6jcRrOwqxY"
    },
    {
        "source": "Kompetenz",
        "label": "Tempoarbeit",
        "url": "https://www.youtube.com/watch?v=4acdVXoPBVM"
    },
    {
        "source": "Kompetenz",
        "label": "30/30-Zirkeltraining",
        "url": "https://youtu.be/OAKe-LSXZz0"
    },
    {
        "source": "Kompetenz",
        "label": "RiR",
        "url": "https://youtu.be/k7srXtA7kx0"
    },
    {
        "source": "Kompetenz",
        "label": "Progression - MTMT Blueprint",
        "url": "https://youtu.be/BUWtn30e5AA"
    },
    {
        "source": "Kompetenz",
        "label": "Pausenzeiten - MTMT Blueprint",
        "url": "https://youtu.be/_EgkO3ancwA"
    },
    {
        "source": "Kompetenz",
        "label": "Tempoarbeit - MTMT Blueprint",
        "url": "https://youtu.be/4acdVXoPBVM"
    },
    {
        "source": "Kapazität",
        "label": "Kapazitätsphase - MTMT Blueprint",
        "url": "https://youtu.be/Io42to15ZWw"
    },
    {
        "source": "Kapazität",
        "label": "META SKILLS",
        "url": "https://youtube.com/playlist?list=PLoq2i8EmnA5qBjxhL_WlZLGCQEhIHxtYQ"
    },
    {
        "source": "Kapazität",
        "label": "Tempoarbeit",
        "url": "https://www.youtube.com/watch?v=4acdVXoPBVM"
    },
    {
        "source": "Kapazität",
        "label": "30/30-Zirkeltraining",
        "url": "https://youtu.be/OAKe-LSXZz0"
    },
    {
        "source": "Kapazität",
        "label": "Reps In Reserve aka RIR - MTMT Blueprint",
        "url": "https://youtu.be/k7srXtA7kx0"
    },
    {
        "source": "Kapazität",
        "label": "Pausenzeiten - MTMT Blueprint",
        "url": "https://youtu.be/_EgkO3ancwA"
    },
    {
        "source": "Kapazität",
        "label": "Progression - MTMT Blueprint",
        "url": "https://youtu.be/BUWtn30e5AA"
    },
    {
        "source": "Kapazität",
        "label": "Tempoarbeit - MTMT Blueprint",
        "url": "https://youtu.be/4acdVXoPBVM"
    },
    {
        "source": "Hypertrophie",
        "label": "Hypertrophiephase - MTMT Blueprint",
        "url": "https://youtu.be/9dgL6-B7vKQ"
    },
    {
        "source": "Hypertrophie",
        "label": "Giant Sets",
        "url": "https://youtu.be/E-wqSf2MW_E"
    },
    {
        "source": "Hypertrophie",
        "label": "Progression",
        "url": "https://youtu.be/BUWtn30e5AA"
    },
    {
        "source": "Hypertrophie",
        "label": "RiR -Angaben",
        "url": "https://youtu.be/k7srXtA7kx0"
    },
    {
        "source": "Hypertrophie",
        "label": "Pausenzeiten - MTMT Blueprint",
        "url": "https://youtu.be/_EgkO3ancwA"
    },
    {
        "source": "Hypertrophie",
        "label": "MTMT Meta Skills",
        "url": "https://youtube.com/playlist?list=PLoq2i8EmnA5qBjxhL_WlZLGCQEhIHxtYQ"
    }
];

export function getMtmtMonth(month: number): MtmtMonth | undefined {
    return MTMT_MONTHS.find((m) => m.month === month);
}

export function getMtmtDay(month: number, day: number): MtmtDay | undefined {
    return getMtmtMonth(month)?.days.find((d) => d.day === day);
}

// Stabiler Name für das Logging in der sets-Tabelle (exercise_name)
export function mtmtExerciseLogName(ex: MtmtExercise): string {
    return ex.name;
}
