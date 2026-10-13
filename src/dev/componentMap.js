export const COMPONENT_MAP = {
  name: "App",
  file: "src/App.jsx",
  role: "Root. Renders the provider, the dashboard, and (in dev) the hierarchy inspector.",
  children: [
    {
      name: "ProductivityProvider",
      file: "src/store/ProductivityContext.jsx",
      role: "Context + localStorage persistence. Exposes quest/habit/goal actions, XP engine.",
      children: [
        {
          name: "Dashboard",
          file: "src/App.jsx",
          role: "Page shell. Holds active-tab state and the radial background.",
          children: [
            {
              name: "Header",
              file: "src/components/Header.jsx",
              role: "Shows level badge, XP bar and streak counters.",
              uses: ["StarIcon", "FlameIcon", "ZapIcon"],
            },
            {
              name: "Nav (TABS)",
              file: "src/components/Nav.jsx",
              role: "Tab metadata + simple Nav button group.",
              uses: ["SwordIcon", "FlameIcon", "TargetIcon"],
            },
            {
              name: "DailyQuests",
              file: "src/components/DailyQuests.jsx",
              role: "Today's quest board: add, complete, delete, XP by difficulty.",
              children: [
                {
                  name: "SectionCard",
                  file: "src/components/SectionCard.jsx",
                  role: "Reusable framed panel (icon + title + count + action).",
                  uses: ["SwordIcon", "PlusIcon", "CheckIcon", "TrashIcon"],
                },
              ],
            },
            {
              name: "Habits",
              file: "src/components/Habits.jsx",
              role: "Habit tracker with streaks and daily completion.",
              children: [
                {
                  name: "SectionCard",
                  file: "src/components/SectionCard.jsx",
                  role: "Shared panel wrapper.",
                  uses: ["FlameIcon", "PlusIcon", "CheckIcon", "TrashIcon"],
                },
              ],
            },
            {
              name: "BigGoals",
              file: "src/components/BigGoals.jsx",
              role: "Long-term goals broken into checkable subtasks; progress is derived from them.",
              children: [
                {
                  name: "SectionCard",
                  file: "src/components/SectionCard.jsx",
                  role: "Shared panel wrapper.",
                  uses: ["TargetIcon", "TrashIcon", "ChevronDownIcon", "FlameIcon", "ZapIcon"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "DevTreeOverlay",
      file: "src/dev/ComponentTree.jsx",
      role: "DEV-only inspector. Toggle with Alt+T.",
      uses: ["ComponentTreeNode"],
    },
  ],
  shared: {
    name: "Shared modules",
    file: "src/lib + src/components/icons.jsx",
    role: "Used across the tree.",
    children: [
      { name: "constants.js", file: "src/lib/constants.js", role: "Quest/priority themes, categories, default state." },
      { name: "questLogic.js", file: "src/lib/questLogic.js", role: "uid, date keys, streak + XP/level math." },
      { name: "icons.jsx", file: "src/components/icons.jsx", role: "Heroicons wrappers + custom Sword/Target glyphs." },
    ],
  },
};
