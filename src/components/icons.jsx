/* 8x8 pixel glyphs drawn as SVG rects (design.md §4). */

const ART = {
  sword: [
    "...##...",
    "...##...",
    "...##...",
    "...##...",
    "########",
    "...##...",
    "...##...",
    "..####..",
  ],
  flame: [
    "....#...",
    "...##...",
    "..###.#.",
    ".####.##",
    ".#######",
    ".######.",
    "..####..",
    "...##...",
  ],
  check: [
    "........",
    ".......#",
    "......##",
    "#....##.",
    "##..##..",
    ".####...",
    "..##....",
    "........",
  ],
  plus: [
    "...##...",
    "...##...",
    "...##...",
    "########",
    "########",
    "...##...",
    "...##...",
    "...##...",
  ],
  trash: [
    "..####..",
    ".######.",
    "########",
    "#.#..#.#",
    "#.#..#.#",
    "#.#..#.#",
    "#.#..#.#",
    ".######.",
  ],
  target: [
    "########",
    "#......#",
    "#..##..#",
    "#.####.#",
    "#.####.#",
    "#..##..#",
    "#......#",
    "########",
  ],
  star: [
    "...#....",
    "...#....",
    "#######.",
    ".#####..",
    "..###...",
    ".##.##..",
    ".#...#..",
    "........",
  ],
  zap: [
    "....###.",
    "...###..",
    "..###...",
    ".#####..",
    "...###..",
    "..###...",
    ".###....",
    "##......",
  ],
  chevron: [
    "#......#",
    "##....##",
    ".##..##.",
    "..####..",
    "...##...",
    "........",
    "........",
    "........",
  ],
};

const Pixel = ({ art, className = "h-5 w-5", ...props }) => (
  <svg
    viewBox="0 0 8 8"
    className={className}
    shapeRendering="crispEdges"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    {art.map((row, y) =>
      [...row].map((cell, x) =>
        cell !== "." ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null
      )
    )}
  </svg>
);

export const SwordIcon = (props) => <Pixel art={ART.sword} {...props} />;
export const FlameIcon = (props) => <Pixel art={ART.flame} {...props} />;
export const CheckIcon = (props) => <Pixel art={ART.check} {...props} />;
export const PlusIcon = (props) => <Pixel art={ART.plus} {...props} />;
export const TrashIcon = (props) => <Pixel art={ART.trash} {...props} />;
export const TargetIcon = (props) => <Pixel art={ART.target} {...props} />;
export const StarIcon = (props) => <Pixel art={ART.star} {...props} />;
export const ZapIcon = (props) => <Pixel art={ART.zap} {...props} />;
export const ChevronDownIcon = (props) => <Pixel art={ART.chevron} {...props} />;
export const ChevronUpIcon = (props) => (
  <Pixel art={ART.chevron} {...props} className={`${props.className || "h-5 w-5"} rotate-180`} />
);
