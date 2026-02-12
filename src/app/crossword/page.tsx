'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { useMemo, useRef, useState, ChangeEvent, KeyboardEvent } from 'react';

type Direction = 'across' | 'down';

type Entry = {
  direction: Direction;
  row: number;
  col: number;
  answer: string;
  clue: string;
};

const GRID_SIZE = 7;
const GRID_TEMPLATE = [
  '.....#.',
  '##.#.#.',
  '.....#.',
  '##.#.#.',
  '...#.#.',
  '##.####',
  '#######',
];

const entries: Entry[] = [
  {
    direction: 'across',
    row: 0,
    col: 0,
    answer: 'TIGER',
    clue: 'A big orange cat with black stripes.',
  },
  {
    direction: 'across',
    row: 2,
    col: 0,
    answer: 'MANGO',
    clue: 'A sweet, yellow summer fruit.',
  },
  {
    direction: 'across',
    row: 4,
    col: 0,
    answer: 'MOO',
    clue: 'The sound a cow makes.',
  },
  {
    direction: 'down',
    row: 0,
    col: 6,
    answer: 'LOTUS',
    clue: "India's national flower that grows in water.",
  },
  {
    direction: 'down',
    row: 0,
    col: 4,
    answer: 'NIGHT',
    clue: "The opposite of 'day'.",
  },
  {
    direction: 'down',
    row: 0,
    col: 2,
    answer: 'KITTEN',
    clue: 'A baby cat.',
  },
];

const toIndex = (row: number, col: number) => row * GRID_SIZE + col;

export default function CrosswordPage() {
  const [grid, setGrid] = useState<string[]>(Array(GRID_SIZE * GRID_SIZE).fill(''));
  const [showAnswers, setShowAnswers] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const isOpenCell = (row: number, col: number) => GRID_TEMPLATE[row][col] === '.';

  const openIndexes = useMemo(() => {
    const indexes: number[] = [];
    for (let row = 0; row < GRID_SIZE; row += 1) {
      for (let col = 0; col < GRID_SIZE; col += 1) {
        if (isOpenCell(row, col)) {
          indexes.push(toIndex(row, col));
        }
      }
    }
    return indexes;
  }, []);

  const clueNumberMap = useMemo(() => {
    const map: Record<string, number> = {};
    let number = 1;

    for (let row = 0; row < GRID_SIZE; row += 1) {
      for (let col = 0; col < GRID_SIZE; col += 1) {
        if (!isOpenCell(row, col)) {
          continue;
        }

        const startsAcross =
          (col === 0 || !isOpenCell(row, col - 1)) && col + 1 < GRID_SIZE && isOpenCell(row, col + 1);
        const startsDown =
          (row === 0 || !isOpenCell(row - 1, col)) && row + 1 < GRID_SIZE && isOpenCell(row + 1, col);

        if (startsAcross || startsDown) {
          map[`${row}-${col}`] = number;
          number += 1;
        }
      }
    }

    return map;
  }, []);

  const cluesByDirection = useMemo(() => {
    const across = entries
      .filter((entry) => entry.direction === 'across')
      .map((entry) => ({ ...entry, number: clueNumberMap[`${entry.row}-${entry.col}`] }))
      .sort((a, b) => a.number - b.number);

    const down = entries
      .filter((entry) => entry.direction === 'down')
      .map((entry) => ({ ...entry, number: clueNumberMap[`${entry.row}-${entry.col}`] }))
      .sort((a, b) => a.number - b.number);

    return { across, down };
  }, [clueNumberMap]);

  const focusNeighbor = (index: number, step: -1 | 1) => {
    const currentPos = openIndexes.indexOf(index);
    if (currentPos < 0) {
      return;
    }

    const nextPos = currentPos + step;
    if (nextPos >= 0 && nextPos < openIndexes.length) {
      inputsRef.current[openIndexes[nextPos]]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newGrid = [...grid];
    newGrid[index] = value.toUpperCase();
    setGrid(newGrid);

    if (value) {
      focusNeighbor(index, 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && grid[index] === '') {
      focusNeighbor(index, -1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Heritage Crossword</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Test your knowledge with these fun puzzles!
        </p>
      </div>
      <Card className="w-full max-w-4xl mx-auto parchment">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-4 font-headline text-3xl">
            <PenSquare className="h-8 w-8 text-primary" />
            <span>Fun Facts Puzzle</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-7 gap-1 bg-muted/50 p-2 rounded-md aspect-square">
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                  const row = Math.floor(i / GRID_SIZE);
                  const col = i % GRID_SIZE;
                  const isOpen = isOpenCell(row, col);
                  const clueNumber = clueNumberMap[`${row}-${col}`];

                  if (!isOpen) {
                    return <div key={i} className="w-full h-full bg-foreground/80 rounded-sm" />;
                  }

                  return (
                    <div key={i} className="relative w-full h-full">
                      {clueNumber && (
                        <span className="pointer-events-none absolute left-1 top-0.5 text-[10px] font-semibold text-foreground/70 z-10">
                          {clueNumber}
                        </span>
                      )}
                      <input
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={grid[i]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(i, e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, i)}
                        className="w-full h-full bg-background border border-border text-center text-xl font-bold uppercase caret-primary"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="font-headline text-xl mb-4">Clues</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold">Across</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {cluesByDirection.across.map((entry) => (
                      <li key={`${entry.direction}-${entry.row}-${entry.col}`}>
                        {entry.number}. {entry.clue} ({entry.answer.length})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Down</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {cluesByDirection.down.map((entry) => (
                      <li key={`${entry.direction}-${entry.row}-${entry.col}`}>
                        {entry.number}. {entry.clue} ({entry.answer.length})
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-muted-foreground mt-8 text-sm">Clue numbers are now shown inside the starting squares.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        <Button
          variant={showAnswers ? 'secondary' : 'default'}
          size="sm"
          onClick={() => setShowAnswers((prev) => !prev)}
        >
          {showAnswers ? 'Hide Answers' : 'Reveal Answers'}
        </Button>

        {showAnswers && (
          <Card className="w-[280px] max-w-[85vw] shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Answer Key</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div>
                <h4 className="font-semibold">Across</h4>
                <ul className="mt-1 space-y-1">
                  {cluesByDirection.across.map((entry) => (
                    <li key={`ans-${entry.direction}-${entry.row}-${entry.col}`}>
                      {entry.number}. {entry.answer}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Down</h4>
                <ul className="mt-1 space-y-1">
                  {cluesByDirection.down.map((entry) => (
                    <li key={`ans-${entry.direction}-${entry.row}-${entry.col}`}>
                      {entry.number}. {entry.answer}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

