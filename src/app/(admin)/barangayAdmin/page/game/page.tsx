"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {Input} from "@/components/ui/input";

interface BasketballTeamStats {
  fieldGoals: {
    made: number;
    attempted: number;
    percentage: number;
  };
  threePointFieldGoals: {
    made: number;
    attempted: number;
    percentage: number;
  };
  freeThrows: {
    made: number;
    attempted: number;
    percentage: number;
  };
  assists: number;
  turnovers: number;
  rebounds: {
    offensive: number;
    defensive: number;
    total: number;
  };
  steals: number;
  blocks: number;
  efficiency: {
    fieldGoalPercentage: number;
    threePointPercentage: number;
    freeThrowPercentage: number;
  };
  pointsInThePaint: number;
  fastBreakPoints: number;
  personalFouls: number;
  secondChancePoints: number;
  benchPoints: number;
  timeOfPossession: string;
  largestLead: number;
}

export default function BasketballStatsParser() {
  const [stats, setStats] = useState<{teamA: BasketballTeamStats | null, teamB: BasketballTeamStats | null}>({
    teamA: null,
    teamB: null
  })

  const parseCSV = (content: string): {teamA: BasketballTeamStats, teamB: BasketballTeamStats} => {
    const rows = content.split('\n').map(row => row.split(',').map(cell => cell.trim()))

    const getValue = (rowIndex: number, colIndex: number): number => {
      const value = rows[rowIndex][colIndex]
      return value === '' ? 0 : parseFloat(value)
    }

    const teamA: BasketballTeamStats = {
      fieldGoals: {
        made: getValue(2, 1),
        attempted: getValue(3, 1),
        percentage: getValue(4, 1)
      },
      threePointFieldGoals: {
        made: getValue(6, 1),
        attempted: getValue(7, 1),
        percentage: getValue(8, 1)
      },
      freeThrows: {
        made: getValue(10, 1),
        attempted: getValue(11, 1),
        percentage: getValue(12, 1)
      },
      assists: getValue(13, 1),
      turnovers: getValue(14, 1),
      rebounds: {
        offensive: getValue(16, 1),
        defensive: getValue(17, 1),
        total: getValue(18, 1)
      },
      steals: getValue(19, 1),
      blocks: getValue(20, 1),
      efficiency: {
        fieldGoalPercentage: getValue(22, 1),
        threePointPercentage: getValue(23, 1),
        freeThrowPercentage: getValue(24, 1)
      },
      pointsInThePaint: getValue(25, 1),
      fastBreakPoints: getValue(26, 1),
      personalFouls: getValue(27, 1),
      secondChancePoints: getValue(28, 1),
      benchPoints: getValue(29, 1),
      timeOfPossession: rows[30][1].replace(/"/g, ''),
      largestLead: getValue(31, 1)
    }

    const teamB: BasketballTeamStats = {
      fieldGoals: {
        made: getValue(2, 3),
        attempted: getValue(3, 3),
        percentage: getValue(4, 3)
      },
      threePointFieldGoals: {
        made: getValue(6, 3),
        attempted: getValue(7, 3),
        percentage: getValue(8, 3)
      },
      freeThrows: {
        made: getValue(10, 3),
        attempted: getValue(11, 3),
        percentage: getValue(12, 3)
      },
      assists: getValue(13, 3),
      turnovers: getValue(14, 3),
      rebounds: {
        offensive: getValue(16, 3),
        defensive: getValue(17, 3),
        total: getValue(18, 3)
      },
      steals: getValue(19, 3),
      blocks: getValue(20, 3),
      efficiency: {
        fieldGoalPercentage: getValue(22, 3),
        threePointPercentage: getValue(23, 3),
        freeThrowPercentage: getValue(24, 3)
      },
      pointsInThePaint: getValue(25, 3),
      fastBreakPoints: getValue(26, 3),
      personalFouls: getValue(27, 3),
      secondChancePoints: getValue(28, 3),
      benchPoints: getValue(29, 3),
      timeOfPossession: rows[30][3].replace(/"/g, ''),
      largestLead: getValue(31, 3)
    }

    return { teamA, teamB }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        if (content) {
          const parsedStats = parseCSV(content)
          setStats(parsedStats)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Live Game</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                />
              </div>

              {stats.teamA && stats.teamB && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold mb-2">Team A Stats</h3>
                      <pre className="p-4 rounded overflow-auto border">
                    {JSON.stringify(stats.teamA, null, 2)}
                  </pre>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Team B Stats</h3>
                      <pre className="p-4 rounded overflow-auto border">
                    {JSON.stringify(stats.teamB, null, 2)}
                  </pre>
                    </div>
                  </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

